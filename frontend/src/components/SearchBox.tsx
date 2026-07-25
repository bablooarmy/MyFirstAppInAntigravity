'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Airport, FlightSearchCriteria } from '../types/flight';
import { searchAirports } from '../services/api';
import { MapPin, Calendar, Users, ArrowLeftRight, Search, PlaneTakeoff, PlaneLanding } from 'lucide-react';

interface SearchBoxProps {
  onSearch: (criteria: FlightSearchCriteria) => void;
  initialCriteria?: Partial<FlightSearchCriteria>;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, initialCriteria }) => {
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>(initialCriteria?.tripType || 'one-way');
  
  // Origin State
  const [originQuery, setOriginQuery] = useState('JFK - New York');
  const [selectedOrigin, setSelectedOrigin] = useState<Airport | null>({
    code: 'JFK',
    name: 'John F. Kennedy International Airport',
    city: 'New York',
    country: 'United States',
    timezone: 'EST'
  });
  const [originSuggestions, setOriginSuggestions] = useState<Airport[]>([]);
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);

  // Destination State
  const [destQuery, setDestQuery] = useState('LHR - London');
  const [selectedDest, setSelectedDest] = useState<Airport | null>({
    code: 'LHR',
    name: 'Heathrow Airport',
    city: 'London',
    country: 'United Kingdom',
    timezone: 'GMT'
  });
  const [destSuggestions, setDestSuggestions] = useState<Airport[]>([]);
  const [showDestDropdown, setShowDestDropdown] = useState(false);

  // Dates & Options
  const today = new Date().toISOString().split('T')[0];
  const [departureDate, setDepartureDate] = useState(initialCriteria?.departureDate || today);
  const [returnDate, setReturnDate] = useState(initialCriteria?.returnDate || '');
  const [passengers, setPassengers] = useState(initialCriteria?.passengers || 1);
  const [cabinClass, setCabinClass] = useState(initialCriteria?.cabinClass || 'Economy');
  const [showPassengersPopover, setShowPassengersPopover] = useState(false);

  const originRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);

  // Fetch Origin Autocomplete
  useEffect(() => {
    if (showOriginDropdown) {
      searchAirports(originQuery).then(setOriginSuggestions);
    }
  }, [originQuery, showOriginDropdown]);

  // Fetch Dest Autocomplete
  useEffect(() => {
    if (showDestDropdown) {
      searchAirports(destQuery).then(setDestSuggestions);
    }
  }, [destQuery, showDestDropdown]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (originRef.current && !originRef.current.contains(event.target as Node)) {
        setShowOriginDropdown(false);
      }
      if (destRef.current && !destRef.current.contains(event.target as Node)) {
        setShowDestDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSwap = () => {
    const tempQuery = originQuery;
    const tempSelected = selectedOrigin;

    setOriginQuery(destQuery);
    setSelectedOrigin(selectedDest);

    setDestQuery(tempQuery);
    setSelectedDest(tempSelected);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrigin || !selectedDest) return;

    onSearch({
      origin: selectedOrigin.code,
      destination: selectedDest.code,
      departureDate,
      returnDate: tripType === 'round-trip' ? returnDate : undefined,
      tripType,
      passengers,
      cabinClass
    });
  };

  return (
    <div className="search-card">
      <form onSubmit={handleSubmit}>
        {/* Header Tabs & Controls */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div className="d-flex gap-2">
            <button
              type="button"
              className={`trip-type-btn ${tripType === 'one-way' ? 'active' : ''}`}
              onClick={() => setTripType('one-way')}
            >
              One Way
            </button>
            <button
              type="button"
              className={`trip-type-btn ${tripType === 'round-trip' ? 'active' : ''}`}
              onClick={() => setTripType('round-trip')}
            >
              Round Trip
            </button>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-sm btn-light rounded-pill border px-3 py-1 fw-semibold text-secondary d-flex align-items-center gap-2"
              onClick={() => setShowPassengersPopover(!showPassengersPopover)}
            >
              <Users size={15} />
              <span>{passengers} Traveler{passengers > 1 ? 's' : ''}, {cabinClass}</span>
            </button>
          </div>
        </div>

        {/* Passengers Popover */}
        {showPassengersPopover && (
          <div className="card shadow-lg p-3 mb-3 border-0 rounded-4 bg-light" style={{ maxWidth: '340px' }}>
            <div className="mb-3">
              <label className="form-label fw-bold small text-muted">PASSENGERS</label>
              <div className="d-flex align-items-center justify-content-between bg-white p-2 rounded-3 border">
                <span className="fw-semibold">Adults (12+ yrs)</span>
                <div className="d-flex align-items-center gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm rounded-circle px-2"
                    disabled={passengers <= 1}
                    onClick={() => setPassengers(p => Math.max(1, p - 1))}
                  >
                    -
                  </button>
                  <span className="fw-bold px-2">{passengers}</span>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm rounded-circle px-2"
                    disabled={passengers >= 9}
                    onClick={() => setPassengers(p => Math.min(9, p + 1))}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="form-label fw-bold small text-muted">CABIN CLASS</label>
              <select
                className="form-select form-select-sm rounded-3 fw-semibold"
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value)}
              >
                <option value="Economy">Economy</option>
                <option value="Premium Economy">Premium Economy</option>
                <option value="Business">Business</option>
                <option value="First">First Class</option>
              </select>
            </div>
          </div>
        )}

        {/* Search Inputs Row */}
        <div className="row g-3 align-items-end">
          {/* Origin */}
          <div className="col-lg-4 position-relative" ref={originRef}>
            <label className="form-label small fw-bold text-muted d-flex align-items-center gap-1">
              <PlaneTakeoff size={14} className="text-primary" /> FROM (ORIGIN)
            </label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <MapPin size={18} className="text-primary" />
              </span>
              <input
                type="text"
                className="form-control form-control-lg border-start-0 bg-light fw-bold"
                value={originQuery}
                placeholder="City or Airport (e.g. JFK)"
                onChange={(e) => {
                  setOriginQuery(e.target.value);
                  setShowOriginDropdown(true);
                }}
                onFocus={() => setShowOriginDropdown(true)}
                required
              />
            </div>

            {showOriginDropdown && originSuggestions.length > 0 && (
              <div className="autocomplete-dropdown">
                {originSuggestions.map((airport) => (
                  <div
                    key={airport.code}
                    className="autocomplete-item"
                    onClick={() => {
                      setSelectedOrigin(airport);
                      setOriginQuery(`${airport.code} - ${airport.city}`);
                      setShowOriginDropdown(false);
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold text-primary">{airport.code}</span>
                      <span className="small text-muted">{airport.country}</span>
                    </div>
                    <div className="small fw-semibold text-dark">{airport.city} ({airport.name})</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Swap Button Column */}
          <div className="col-lg-1 text-center d-none d-lg-block position-relative" style={{ zIndex: 5 }}>
            <button
              type="button"
              className="btn-swap mx-auto mb-1"
              onClick={handleSwap}
              title="Swap From and To"
            >
              <ArrowLeftRight size={18} />
            </button>
          </div>

          {/* Destination */}
          <div className="col-lg-4 position-relative" ref={destRef}>
            <label className="form-label small fw-bold text-muted d-flex align-items-center gap-1">
              <PlaneLanding size={14} className="text-primary" /> TO (DESTINATION)
            </label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <MapPin size={18} className="text-primary" />
              </span>
              <input
                type="text"
                className="form-control form-control-lg border-start-0 bg-light fw-bold"
                value={destQuery}
                placeholder="City or Airport (e.g. LHR)"
                onChange={(e) => {
                  setDestQuery(e.target.value);
                  setShowDestDropdown(true);
                }}
                onFocus={() => setShowDestDropdown(true)}
                required
              />
            </div>

            {showDestDropdown && destSuggestions.length > 0 && (
              <div className="autocomplete-dropdown">
                {destSuggestions.map((airport) => (
                  <div
                    key={airport.code}
                    className="autocomplete-item"
                    onClick={() => {
                      setSelectedDest(airport);
                      setDestQuery(`${airport.code} - ${airport.city}`);
                      setShowDestDropdown(false);
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold text-primary">{airport.code}</span>
                      <span className="small text-muted">{airport.country}</span>
                    </div>
                    <div className="small fw-semibold text-dark">{airport.city} ({airport.name})</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Date Picker(s) & Submit */}
          <div className="col-lg-3">
            <div className="row g-2">
              <div className={tripType === 'round-trip' ? 'col-6' : 'col-12'}>
                <label className="form-label small fw-bold text-muted d-flex align-items-center gap-1">
                  <Calendar size={14} className="text-primary" /> DEPART
                </label>
                <input
                  type="date"
                  className="form-control form-control-lg bg-light fw-semibold"
                  value={departureDate}
                  min={today}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  required
                />
              </div>

              {tripType === 'round-trip' && (
                <div className="col-6">
                  <label className="form-label small fw-bold text-muted d-flex align-items-center gap-1">
                    <Calendar size={14} className="text-primary" /> RETURN
                  </label>
                  <input
                    type="date"
                    className="form-control form-control-lg bg-light fw-semibold"
                    value={returnDate}
                    min={departureDate || today}
                    onChange={(e) => setReturnDate(e.target.value)}
                    required={tripType === 'round-trip'}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button Row */}
        <div className="mt-4 text-end">
          <button
            type="submit"
            className="btn btn-primary btn-lg rounded-pill px-5 fw-bold shadow d-inline-flex align-items-center gap-2"
          >
            <Search size={20} />
            <span>Search Flights</span>
          </button>
        </div>
      </form>
    </div>
  );
};
