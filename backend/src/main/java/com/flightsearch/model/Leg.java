package com.flightsearch.model;

public class Leg {
    private String flightNumber;
    private String airlineCode;
    private String airlineName;
    private String aircraft;
    private Airport origin;
    private Airport destination;
    private String departureTime; // ISO format or HH:mm
    private String arrivalTime;
    private String duration;
    private String cabinClass;

    public Leg() {}

    public Leg(String flightNumber, String airlineCode, String airlineName, String aircraft,
               Airport origin, Airport destination, String departureTime, String arrivalTime,
               String duration, String cabinClass) {
        this.flightNumber = flightNumber;
        this.airlineCode = airlineCode;
        this.airlineName = airlineName;
        this.aircraft = aircraft;
        this.origin = origin;
        this.destination = destination;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.duration = duration;
        this.cabinClass = cabinClass;
    }

    public String getFlightNumber() { return flightNumber; }
    public void setFlightNumber(String flightNumber) { this.flightNumber = flightNumber; }

    public String getAirlineCode() { return airlineCode; }
    public void setAirlineCode(String airlineCode) { this.airlineCode = airlineCode; }

    public String getAirlineName() { return airlineName; }
    public void setAirlineName(String airlineName) { this.airlineName = airlineName; }

    public String getAircraft() { return aircraft; }
    public void setAircraft(String aircraft) { this.aircraft = aircraft; }

    public Airport getOrigin() { return origin; }
    public void setOrigin(Airport origin) { this.origin = origin; }

    public Airport getDestination() { return destination; }
    public void setDestination(Airport destination) { this.destination = destination; }

    public String getDepartureTime() { return departureTime; }
    public void setDepartureTime(String departureTime) { this.departureTime = departureTime; }

    public String getArrivalTime() { return arrivalTime; }
    public void setArrivalTime(String arrivalTime) { this.arrivalTime = arrivalTime; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getCabinClass() { return cabinClass; }
    public void setCabinClass(String cabinClass) { this.cabinClass = cabinClass; }
}
