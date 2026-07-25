package com.flightsearch.model;

import java.util.List;

public class BookingResponse {
    private String pnrCode;
    private String bookingStatus;
    private String bookingDate;
    private Flight outboundFlight;
    private Flight returnFlight;
    private List<Passenger> passengers;
    private double totalPrice;
    private String message;

    public BookingResponse() {}

    public BookingResponse(String pnrCode, String bookingStatus, String bookingDate,
                           Flight outboundFlight, Flight returnFlight, List<Passenger> passengers,
                           double totalPrice, String message) {
        this.pnrCode = pnrCode;
        this.bookingStatus = bookingStatus;
        this.bookingDate = bookingDate;
        this.outboundFlight = outboundFlight;
        this.returnFlight = returnFlight;
        this.passengers = passengers;
        this.totalPrice = totalPrice;
        this.message = message;
    }

    public String getPnrCode() { return pnrCode; }
    public void setPnrCode(String pnrCode) { this.pnrCode = pnrCode; }

    public String getBookingStatus() { return bookingStatus; }
    public void setBookingStatus(String bookingStatus) { this.bookingStatus = bookingStatus; }

    public String getBookingDate() { return bookingDate; }
    public void setBookingDate(String bookingDate) { this.bookingDate = bookingDate; }

    public Flight getOutboundFlight() { return outboundFlight; }
    public void setOutboundFlight(Flight outboundFlight) { this.outboundFlight = outboundFlight; }

    public Flight getReturnFlight() { return returnFlight; }
    public void setReturnFlight(Flight returnFlight) { this.returnFlight = returnFlight; }

    public List<Passenger> getPassengers() { return passengers; }
    public void setPassengers(List<Passenger> passengers) { this.passengers = passengers; }

    public double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
