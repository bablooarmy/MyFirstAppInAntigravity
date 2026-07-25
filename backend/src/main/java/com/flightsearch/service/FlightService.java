package com.flightsearch.service;

import com.flightsearch.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class FlightService {

    @Autowired
    private AirportService airportService;

    private static final Map<String, String> AIRLINE_NAMES = Map.of(
            "EK", "Emirates",
            "BA", "British Airways",
            "SQ", "Singapore Airlines",
            "QR", "Qatar Airways",
            "AI", "Air India",
            "DL", "Delta Air Lines",
            "LH", "Lufthansa",
            "UA", "United Airlines",
            "AF", "Air France",
            "QF", "Qantas"
    );

    public FlightSearchResponse searchFlights(FlightSearchRequest req) {
        String originCode = (req.getOrigin() != null && !req.getOrigin().isEmpty()) ? req.getOrigin().toUpperCase() : "JFK";
        String destCode = (req.getDestination() != null && !req.getDestination().isEmpty()) ? req.getDestination().toUpperCase() : "LHR";

        Airport origin = airportService.getAirportByCode(originCode)
                .orElse(new Airport(originCode, originCode + " Intl", originCode, "Unknown", "UTC"));
        Airport dest = airportService.getAirportByCode(destCode)
                .orElse(new Airport(destCode, destCode + " Intl", destCode, "Unknown", "UTC"));

        List<Flight> outboundFlights = generateFlightsForRoute(origin, dest, req.getDepartureDate(), req.getCabinClass(), req.getPassengers());

        // Apply filtering
        List<Flight> filtered = outboundFlights.stream()
                .filter(f -> req.getMaxPrice() == null || f.getPrice() <= req.getMaxPrice())
                .filter(f -> req.getMaxStops() == null || f.getStops() <= req.getMaxStops())
                .filter(f -> req.getAirlineFilter() == null || req.getAirlineFilter().isEmpty()
                        || f.getAirlineName().equalsIgnoreCase(req.getAirlineFilter())
                        || f.getAirlineCode().equalsIgnoreCase(req.getAirlineFilter()))
                .collect(Collectors.toList());

        // Apply sorting
        if ("cheapest".equalsIgnoreCase(req.getSortBy())) {
            filtered.sort(Comparator.comparingDouble(Flight::getPrice));
        } else if ("fastest".equalsIgnoreCase(req.getSortBy())) {
            filtered.sort(Comparator.comparing(Flight::getTotalDuration));
        } else if ("departure".equalsIgnoreCase(req.getSortBy())) {
            filtered.sort(Comparator.comparing(Flight::getDepartureTime));
        }

        // Return flights if round trip
        List<Flight> returnFlights = null;
        if ("round-trip".equalsIgnoreCase(req.getTripType())) {
            returnFlights = generateFlightsForRoute(dest, origin, req.getReturnDate(), req.getCabinClass(), req.getPassengers());
            if ("cheapest".equalsIgnoreCase(req.getSortBy())) {
                returnFlights.sort(Comparator.comparingDouble(Flight::getPrice));
            }
        }

        double minPrice = outboundFlights.stream().mapToDouble(Flight::getPrice).min().orElse(0.0);
        double maxPrice = outboundFlights.stream().mapToDouble(Flight::getPrice).max().orElse(1000.0);
        List<String> airlines = outboundFlights.stream().map(Flight::getAirlineName).distinct().collect(Collectors.toList());

        return new FlightSearchResponse(filtered, returnFlights, filtered.size(), minPrice, maxPrice, airlines);
    }

    public Optional<Flight> getFlightById(String id) {
        // Parse ID to reconstruct or retrieve
        String[] parts = id.split("_");
        if (parts.length >= 3) {
            String originCode = parts[0];
            String destCode = parts[1];
            Airport origin = airportService.getAirportByCode(originCode).orElse(new Airport(originCode, originCode, originCode, "Country", "UTC"));
            Airport dest = airportService.getAirportByCode(destCode).orElse(new Airport(destCode, destCode, destCode, "Country", "UTC"));
            List<Flight> flights = generateFlightsForRoute(origin, dest, "2026-08-01", "Economy", 1);
            return flights.stream().filter(f -> f.getId().equals(id)).findFirst();
        }
        return Optional.empty();
    }

    private List<Flight> generateFlightsForRoute(Airport origin, Airport dest, String dateStr, String cabinClass, int passengers) {
        List<Flight> flights = new ArrayList<>();
        double classMultiplier = getCabinMultiplier(cabinClass);

        String[][] airlineData = {
                {"EK", "Emirates", "A380-800", "DXB"},
                {"BA", "British Airways", "B787-9", "LHR"},
                {"SQ", "Singapore Airlines", "A350-900", "SIN"},
                {"QR", "Qatar Airways", "B777-300ER", "DOH"},
                {"AI", "Air India", "B787-8", "DEL"},
                {"DL", "Delta Air Lines", "A330-900neo", "ATL"},
                {"LH", "Lufthansa", "A350-900", "FRA"},
                {"UA", "United Airlines", "B777-200ER", "ORD"}
        };

        String[] times = {"06:15", "09:30", "11:45", "14:20", "17:50", "20:10", "22:40", "23:55"};
        String[] durations = {"6h 45m", "7h 10m", "8h 30m", "11h 15m", "13h 40m", "14h 50m", "9h 20m", "10h 05m"};
        double[] basePrices = {450.0, 520.0, 480.0, 610.0, 390.0, 560.0, 490.0, 580.0};
        int[] stopsList = {0, 0, 1, 1, 0, 1, 0, 1};

        for (int i = 0; i < airlineData.length; i++) {
            String airlineCode = airlineData[i][0];
            String airlineName = airlineData[i][1];
            String aircraft = airlineData[i][2];
            String hub = airlineData[i][3];

            String flightNum = airlineCode + " " + (100 + (i * 12) + (origin.getCode().hashCode() % 50 & 0x7fffffff) % 800);
            String flightId = origin.getCode() + "_" + dest.getCode() + "_" + airlineCode + "_" + i;

            String depTime = times[i % times.length];
            String duration = durations[i % durations.length];
            int stops = stopsList[i % stopsList.length];

            // If origin or dest matches hub, make it direct
            if (origin.getCode().equals(hub) || dest.getCode().equals(hub)) {
                stops = 0;
            }

            String stopDetails = (stops == 0) ? "Non-stop" : "1 stop in " + hub + " (1h 35m layover)";

            double price = Math.round((basePrices[i % basePrices.length] * classMultiplier * (passengers > 0 ? passengers : 1)) * 100.0) / 100.0;
            String badge = (i == 0) ? "Best Value" : (i == 4 ? "Cheapest" : (i == 1 ? "Fastest" : null));

            // Generate legs
            List<Leg> legs = new ArrayList<>();
            if (stops == 0) {
                legs.add(new Leg(flightNum, airlineCode, airlineName, aircraft, origin, dest, depTime, calculateArrTime(depTime, duration), duration, cabinClass));
            } else {
                Airport hubAirport = airportService.getAirportByCode(hub).orElse(new Airport(hub, hub + " Intl", hub, "Hub Country", "UTC"));
                legs.add(new Leg(flightNum + "A", airlineCode, airlineName, aircraft, origin, hubAirport, depTime, calculateArrTime(depTime, "4h 30m"), "4h 30m", cabinClass));
                legs.add(new Leg(flightNum + "B", airlineCode, airlineName, aircraft, hubAirport, dest, calculateArrTime(depTime, "6h 05m"), calculateArrTime(depTime, duration), "5h 20m", cabinClass));
            }

            Flight flight = new Flight(
                    flightId,
                    flightNum,
                    airlineCode,
                    airlineName,
                    "/assets/airlines/" + airlineCode.toLowerCase() + ".png",
                    origin,
                    dest,
                    depTime,
                    calculateArrTime(depTime, duration),
                    duration,
                    stops,
                    stopDetails,
                    price,
                    cabinClass != null ? cabinClass : "Economy",
                    12 - (i % 7),
                    "Included: 1 Cabin bag (7kg), 1 Checked bag (23kg)",
                    legs,
                    badge
            );

            flights.add(flight);
        }

        return flights;
    }

    private double getCabinMultiplier(String cabinClass) {
        if (cabinClass == null) return 1.0;
        switch (cabinClass.toLowerCase()) {
            case "premium economy": return 1.5;
            case "business": return 2.8;
            case "first": return 4.5;
            default: return 1.0;
        }
    }

    private String calculateArrTime(String depTime, String durationStr) {
        try {
            String[] depParts = depTime.split(":");
            int depH = Integer.parseInt(depParts[0]);
            int depM = Integer.parseInt(depParts[1]);

            int durH = 0, durM = 0;
            if (durationStr.contains("h")) {
                String[] parts = durationStr.split("h");
                durH = Integer.parseInt(parts[0].trim());
                if (parts.length > 1 && parts[1].contains("m")) {
                    durM = Integer.parseInt(parts[1].replace("m", "").trim());
                }
            }

            int totalM = depM + durM;
            int carryH = totalM / 60;
            int arrM = totalM % 60;
            int arrH = (depH + durH + carryH) % 24;

            return String.format("%02d:%02d", arrH, arrM);
        } catch (Exception e) {
            return "18:45";
        }
    }
}
