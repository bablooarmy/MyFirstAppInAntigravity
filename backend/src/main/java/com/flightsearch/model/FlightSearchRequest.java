package com.flightsearch.model;

public class FlightSearchRequest {
    private String origin;
    private String destination;
    private String departureDate;
    private String returnDate;
    private String tripType; // "one-way", "round-trip"
    private int passengers = 1;
    private String cabinClass = "Economy";
    private Double maxPrice;
    private Integer maxStops; // null for all, 0 for direct only
    private String airlineFilter;
    private String sortBy = "cheapest"; // "cheapest", "fastest", "departure"

    public FlightSearchRequest() {}

    public String getOrigin() { return origin; }
    public void setOrigin(String origin) { this.origin = origin; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public String getDepartureDate() { return departureDate; }
    public void setDepartureDate(String departureDate) { this.departureDate = departureDate; }

    public String getReturnDate() { return returnDate; }
    public void setReturnDate(String returnDate) { this.returnDate = returnDate; }

    public String getTripType() { return tripType; }
    public void setTripType(String tripType) { this.tripType = tripType; }

    public int getPassengers() { return passengers; }
    public void setPassengers(int passengers) { this.passengers = passengers; }

    public String getCabinClass() { return cabinClass; }
    public void setCabinClass(String cabinClass) { this.cabinClass = cabinClass; }

    public Double getMaxPrice() { return maxPrice; }
    public void setMaxPrice(Double maxPrice) { this.maxPrice = maxPrice; }

    public Integer getMaxStops() { return maxStops; }
    public void setMaxStops(Integer maxStops) { this.maxStops = maxStops; }

    public String getAirlineFilter() { return airlineFilter; }
    public void setAirlineFilter(String airlineFilter) { this.airlineFilter = airlineFilter; }

    public String getSortBy() { return sortBy; }
    public void setSortBy(String sortBy) { this.sortBy = sortBy; }
}
