package com.flightsearch.controller;

import com.flightsearch.model.Airport;
import com.flightsearch.service.AirportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/airports")
public class AirportController {

    @Autowired
    private AirportService airportService;

    @GetMapping
    public ResponseEntity<List<Airport>> getAllAirports() {
        return ResponseEntity.ok(airportService.getAllAirports());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Airport>> searchAirports(@RequestParam(value = "query", required = false) String query) {
        return ResponseEntity.ok(airportService.searchAirports(query));
    }

    @GetMapping("/{code}")
    public ResponseEntity<Airport> getAirportByCode(@PathVariable String code) {
        return airportService.getAirportByCode(code)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
