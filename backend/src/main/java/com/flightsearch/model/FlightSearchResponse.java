package com.flightsearch.model;

import java.util.List;

public class FlightSearchResponse {
    private List<Flight> flights;
    private List<Flight> returnFlights; // If round-trip
    private int totalResults;
    private double minPrice;
    private double maxPrice;
    private List<String> availableAirlines;

    public FlightSearchResponse() {}

    public FlightSearchResponse(List<Flight> flights, List<Flight> returnFlights, int totalResults,
                                double minPrice, double maxPrice, List<String> availableAirlines) {
        this.flights = flights;
        this.returnFlights = returnFlights;
        this.totalResults = totalResults;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.availableAirlines = availableAirlines;
    }

    public List<Flight> getFlights() { return flights; }
    public void setFlights(List<Flight> flights) { this.flights = flights; }

    public List<Flight> getReturnFlights() { return returnFlights; }
    public void setReturnFlights(List<Flight> returnFlights) { this.returnFlights = returnFlights; }

    public int getTotalResults() { return totalResults; }
    public void setTotalResults(int totalResults) { this.totalResults = totalResults; }

    public double getMinPrice() { return minPrice; }
    public void setMinPrice(double minPrice) { this.minPrice = minPrice; }

    public double getMaxPrice() { return maxPrice; }
    public void setMaxPrice(double maxPrice) { this.maxPrice = maxPrice; }

    public List<String> getAvailableAirlines() { return availableAirlines; }
    public void setAvailableAirlines(List<String> availableAirlines) { this.availableAirlines = availableAirlines; }
}
