package com.flightsearch.service;

import com.flightsearch.model.Airport;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AirportService {
    private final List<Airport> airports = new ArrayList<>();

    @PostConstruct
    public void init() {
        airports.add(new Airport("JFK", "John F. Kennedy International Airport", "New York", "United States", "EST"));
        airports.add(new Airport("LHR", "Heathrow Airport", "London", "United Kingdom", "GMT"));
        airports.add(new Airport("BOM", "Chhatrapati Shivaji Maharaj Intl", "Mumbai", "India", "IST"));
        airports.add(new Airport("DEL", "Indira Gandhi International Airport", "New Delhi", "India", "IST"));
        airports.add(new Airport("DXB", "Dubai International Airport", "Dubai", "United Arab Emirates", "GST"));
        airports.add(new Airport("SIN", "Singapore Changi Airport", "Singapore", "Singapore", "SGT"));
        airports.add(new Airport("CDG", "Charles de Gaulle Airport", "Paris", "France", "CET"));
        airports.add(new Airport("HND", "Tokyo Haneda Airport", "Tokyo", "Japan", "JST"));
        airports.add(new Airport("SYD", "Sydney Kingsford Smith Airport", "Sydney", "Australia", "AEST"));
        airports.add(new Airport("SFO", "San Francisco International Airport", "San Francisco", "United States", "PST"));
        airports.add(new Airport("ORD", "O'Hare International Airport", "Chicago", "United States", "CST"));
        airports.add(new Airport("FRA", "Frankfurt Airport", "Frankfurt", "Germany", "CET"));
        airports.add(new Airport("AMS", "Amsterdam Airport Schiphol", "Amsterdam", "Netherlands", "CET"));
        airports.add(new Airport("BLR", "Kempegowda International Airport", "Bengaluru", "India", "IST"));
        airports.add(new Airport("LAX", "Los Angeles International Airport", "Los Angeles", "United States", "PST"));
        airports.add(new Airport("ICN", "Incheon International Airport", "Seoul", "South Korea", "KST"));
    }

    public List<Airport> getAllAirports() {
        return airports;
    }

    public List<Airport> searchAirports(String query) {
        if (query == null || query.trim().isEmpty()) {
            return airports.subList(0, Math.min(8, airports.size()));
        }
        String q = query.toLowerCase().trim();
        return airports.stream()
                .filter(a -> a.getCode().toLowerCase().contains(q) ||
                             a.getCity().toLowerCase().contains(q) ||
                             a.getName().toLowerCase().contains(q) ||
                             a.getCountry().toLowerCase().contains(q))
                .collect(Collectors.toList());
    }

    public Optional<Airport> getAirportByCode(String code) {
        if (code == null) return Optional.empty();
        return airports.stream()
                .filter(a -> a.getCode().equalsIgnoreCase(code.trim()))
                .findFirst();
    }
}
