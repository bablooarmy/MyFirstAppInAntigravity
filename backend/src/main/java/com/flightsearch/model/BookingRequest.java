package com.flightsearch.model;

import java.util.List;

public class BookingRequest {
    private String outboundFlightId;
    private String returnFlightId;
    private List<Passenger> passengers;
    private String cabinClass;
    private String paymentMethod;
    private double totalPrice;

    public BookingRequest() {}

    public String getOutboundFlightId() { return outboundFlightId; }
    public void setOutboundFlightId(String outboundFlightId) { this.outboundFlightId = outboundFlightId; }

    public String getReturnFlightId() { return returnFlightId; }
    public void setReturnFlightId(String returnFlightId) { this.returnFlightId = returnFlightId; }

    public List<Passenger> getPassengers() { return passengers; }
    public void setPassengers(List<Passenger> passengers) { this.passengers = passengers; }

    public String getCabinClass() { return cabinClass; }
    public void setCabinClass(String cabinClass) { this.cabinClass = cabinClass; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }
}
