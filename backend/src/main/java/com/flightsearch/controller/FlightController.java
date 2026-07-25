package com.flightsearch.controller;

import com.flightsearch.model.Flight;
import com.flightsearch.model.FlightSearchRequest;
import com.flightsearch.model.FlightSearchResponse;
import com.flightsearch.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/flights")
public class FlightController {

    @Autowired
    private FlightService flightService;

    @PostMapping("/search")
    public ResponseEntity<FlightSearchResponse> searchFlightsPost(@RequestBody FlightSearchRequest request) {
        return ResponseEntity.ok(flightService.searchFlights(request));
    }

    @GetMapping("/search")
    public ResponseEntity<FlightSearchResponse> searchFlightsGet(
            @RequestParam(required = false, defaultValue = "JFK") String origin,
            @RequestParam(required = false, defaultValue = "LHR") String destination,
            @RequestParam(required = false) String departureDate,
            @RequestParam(required = false) String returnDate,
            @RequestParam(required = false, defaultValue = "one-way") String tripType,
            @RequestParam(required = false, defaultValue = "1") int passengers,
            @RequestParam(required = false, defaultValue = "Economy") String cabinClass,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Integer maxStops,
            @RequestParam(required = false) String airlineFilter,
            @RequestParam(required = false, defaultValue = "cheapest") String sortBy
    ) {
        FlightSearchRequest req = new FlightSearchRequest();
        req.setOrigin(origin);
        req.setDestination(destination);
        req.setDepartureDate(departureDate);
        req.setReturnDate(returnDate);
        req.setTripType(tripType);
        req.setPassengers(passengers);
        req.setCabinClass(cabinClass);
        req.setMaxPrice(maxPrice);
        req.setMaxStops(maxStops);
        req.setAirlineFilter(airlineFilter);
        req.setSortBy(sortBy);

        return ResponseEntity.ok(flightService.searchFlights(req));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Flight> getFlightById(@PathVariable String id) {
        return flightService.getFlightById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
