package com.flightsearch.service;

import com.flightsearch.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class BookingService {

    @Autowired
    private FlightService flightService;

    private final Map<String, BookingResponse> bookingStore = new HashMap<>();

    public BookingResponse createBooking(BookingRequest request) {
        String pnr = generatePnr();
        String bookingDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));

        Flight outbound = flightService.getFlightById(request.getOutboundFlightId()).orElse(null);
        Flight returnFlight = (request.getReturnFlightId() != null)
                ? flightService.getFlightById(request.getReturnFlightId()).orElse(null)
                : null;

        BookingResponse response = new BookingResponse(
                pnr,
                "CONFIRMED",
                bookingDate,
                outbound,
                returnFlight,
                request.getPassengers(),
                request.getTotalPrice(),
                "Flight booking completed successfully. E-Ticket issued."
        );

        bookingStore.put(pnr, response);
        return response;
    }

    public Optional<BookingResponse> getBookingByPnr(String pnr) {
        return Optional.ofNullable(bookingStore.get(pnr.toUpperCase()));
    }

    private String generatePnr() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder sb = new StringBuilder();
        Random rnd = new Random();
        for (int i = 0; i < 6; i++) {
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        }
        return sb.toString();
    }
}
