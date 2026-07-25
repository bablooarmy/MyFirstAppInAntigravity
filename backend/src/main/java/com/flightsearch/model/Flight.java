package com.flightsearch.model;

import java.util.List;

public class Flight {
    private String id;
    private String flightNumber;
    private String airlineCode;
    private String airlineName;
    private String airlineLogo;
    private Airport origin;
    private Airport destination;
    private String departureTime;
    private String arrivalTime;
    private String totalDuration;
    private int stops; // 0 for Direct, 1, 2
    private String stopDetails; // e.g. "1h 45m layover in DXB"
    private double price;
    private String cabinClass; // Economy, Premium Economy, Business, First
    private int seatsAvailable;
    private String baggagePolicy;
    private List<Leg> legs;
    private String badge; // "Best Value", "Fastest", "Cheapest"

    public Flight() {}

    public Flight(String id, String flightNumber, String airlineCode, String airlineName, String airlineLogo,
                  Airport origin, Airport destination, String departureTime, String arrivalTime,
                  String totalDuration, int stops, String stopDetails, double price, String cabinClass,
                  int seatsAvailable, String baggagePolicy, List<Leg> legs, String badge) {
        this.id = id;
        this.flightNumber = flightNumber;
        this.airlineCode = airlineCode;
        this.airlineName = airlineName;
        this.airlineLogo = airlineLogo;
        this.origin = origin;
        this.destination = destination;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.totalDuration = totalDuration;
        this.stops = stops;
        this.stopDetails = stopDetails;
        this.price = price;
        this.cabinClass = cabinClass;
        this.seatsAvailable = seatsAvailable;
        this.baggagePolicy = baggagePolicy;
        this.legs = legs;
        this.badge = badge;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getFlightNumber() { return flightNumber; }
    public void setFlightNumber(String flightNumber) { this.flightNumber = flightNumber; }

    public String getAirlineCode() { return airlineCode; }
    public void setAirlineCode(String airlineCode) { this.airlineCode = airlineCode; }

    public String getAirlineName() { return airlineName; }
    public void setAirlineName(String airlineName) { this.airlineName = airlineName; }

    public String getAirlineLogo() { return airlineLogo; }
    public void setAirlineLogo(String airlineLogo) { this.airlineLogo = airlineLogo; }

    public Airport getOrigin() { return origin; }
    public void setOrigin(Airport origin) { this.origin = origin; }

    public Airport getDestination() { return destination; }
    public void setDestination(Airport destination) { this.destination = destination; }

    public String getDepartureTime() { return departureTime; }
    public void setDepartureTime(String departureTime) { this.departureTime = departureTime; }

    public String getArrivalTime() { return arrivalTime; }
    public void setArrivalTime(String arrivalTime) { this.arrivalTime = arrivalTime; }

    public String getTotalDuration() { return totalDuration; }
    public void setTotalDuration(String totalDuration) { this.totalDuration = totalDuration; }

    public int getStops() { return stops; }
    public void setStops(int stops) { this.stops = stops; }

    public String getStopDetails() { return stopDetails; }
    public void setStopDetails(String stopDetails) { this.stopDetails = stopDetails; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getCabinClass() { return cabinClass; }
    public void setCabinClass(String cabinClass) { this.cabinClass = cabinClass; }

    public int getSeatsAvailable() { return seatsAvailable; }
    public void setSeatsAvailable(int seatsAvailable) { this.seatsAvailable = seatsAvailable; }

    public String getBaggagePolicy() { return baggagePolicy; }
    public void setBaggagePolicy(String baggagePolicy) { this.baggagePolicy = baggagePolicy; }

    public List<Leg> getLegs() { return legs; }
    public void setLegs(List<Leg> legs) { this.legs = legs; }

    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }
}
