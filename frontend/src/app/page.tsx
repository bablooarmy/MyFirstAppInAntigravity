'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { SearchBox } from '../components/SearchBox';
import { FilterSidebar } from '../components/FilterSidebar';
import { FlightCard } from '../components/FlightCard';
import { FlightDetailsModal } from '../components/FlightDetailsModal';
import { BookingModal } from '../components/BookingModal';
import { PnrLookupModal } from '../components/PnrLookupModal';
import { TicketConfirmation } from '../components/TicketConfirmation';
import { Flight, FlightSearchCriteria, FlightSearchResponse, BookingResponse } from '../types/flight';
import { searchFlights } from '../services/api';
import { Plane, AlertCircle, Sparkles, SlidersHorizontal, ShieldCheck } from 'lucide-react';

export default function Home() {
  const today = new Date().toISOString().split('T')[0];

  const [criteria, setCriteria] = useState<FlightSearchCriteria>({
    origin: 'JFK',
    destination: 'LHR',
    departureDate: today,
    tripType: 'one-way',
    passengers: 1,
    cabinClass: 'Economy',
  });

  const [searchResponse, setSearchResponse] = useState<FlightSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // Filters State
  const [selectedPrice, setSelectedPrice] = useState<number>(3000);
  const [selectedStops, setSelectedStops] = useState<number | null>(null);
  const [selectedAirline, setSelectedAirline] = useState<string>('');
  const [sortBy, setSortBy] = useState<'cheapest' | 'fastest' | 'departure'>('cheapest');

  // Modals & Active Views
  const [activeDetailsFlight, setActiveDetailsFlight] = useState<Flight | null>(null);
  const [activeBookingFlight, setActiveBookingFlight] = useState<Flight | null>(null);
  const [showPnrModal, setShowPnrModal] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingResponse | null>(null);

  // Initial Search on mount
  useEffect(() => {
    handleSearch(criteria);
  }, []);

  const handleSearch = async (newCriteria: FlightSearchCriteria) => {
    setCriteria(newCriteria);
    setLoading(true);

    const fullCriteria: FlightSearchCriteria = {
      ...newCriteria,
      maxPrice: selectedPrice < 3000 ? selectedPrice : undefined,
      maxStops: selectedStops !== null ? selectedStops : undefined,
      airlineFilter: selectedAirline || undefined,
      sortBy,
    };

    const res = await searchFlights(fullCriteria);
    setSearchResponse(res);
    if (res && res.maxPrice) {
      if (selectedPrice === 3000) {
        setSelectedPrice(res.maxPrice);
      }
    }
    setLoading(false);
  };

  // Re-run search when filters/sort change
  useEffect(() => {
    if (searchResponse) {
      handleSearch(criteria);
    }
  }, [selectedStops, selectedAirline, sortBy]);

  const handleResetFilters = () => {
    setSelectedStops(null);
    setSelectedAirline('');
    setSortBy('cheapest');
    if (searchResponse) {
      setSelectedPrice(searchResponse.maxPrice);
    }
    handleSearch(criteria);
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Header onOpenPnrModal={() => setShowPnrModal(true)} />

      {/* View Switch: Confirmed Ticket vs Main App */}
      {confirmedBooking ? (
        <TicketConfirmation
          booking={confirmedBooking}
          onClose={() => setConfirmedBooking(null)}
        />
      ) : (
        <main className="flex-grow-1 pb-5">
          {/* Hero Header Banner */}
          <section className="hero-section text-white text-center">
            <div className="container position-relative z-2">
              <span className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-25 px-3 py-2 rounded-pill mb-3 fw-bold">
                <Sparkles size={14} className="me-1" /> Next.js TypeScript + Java Spring Boot REST API
              </span>
              <h1 className="display-4 fw-extrabold mb-2 text-white">Find & Book Worldwide Flights</h1>
              <p className="lead text-white-50 max-w-2xl mx-auto mb-4" style={{ maxWidth: '600px' }}>
                Compare live prices across major global airlines with real-time schedule filtering.
              </p>
            </div>
          </section>

          {/* Search Card Container */}
          <div className="container search-card-container mb-5">
            <SearchBox onSearch={handleSearch} initialCriteria={criteria} />
          </div>

          {/* Main Results Section */}
          <div className="container">
            <div className="row g-4">
              {/* Left Column: Filter Sidebar */}
              <div className="col-lg-3">
                <FilterSidebar
                  minPrice={searchResponse?.minPrice || 100}
                  maxPrice={searchResponse?.maxPrice || 3000}
                  selectedPrice={selectedPrice}
                  onPriceChange={(val) => setSelectedPrice(val)}
                  selectedStops={selectedStops}
                  onStopsChange={setSelectedStops}
                  availableAirlines={searchResponse?.availableAirlines || []}
                  selectedAirline={selectedAirline}
                  onAirlineChange={setSelectedAirline}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  onResetFilters={handleResetFilters}
                />
              </div>

              {/* Right Column: Flight List */}
              <div className="col-lg-9">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div>
                    <h4 className="fw-bold text-dark m-0">
                      {criteria.origin} → {criteria.destination}
                    </h4>
                    <span className="small text-muted fw-semibold">
                      {searchResponse ? searchResponse.totalResults : 0} Available Flights • {criteria.cabinClass} Class
                    </span>
                  </div>

                  <div className="badge bg-white text-dark border px-3 py-2 rounded-pill shadow-sm d-flex align-items-center gap-2">
                    <ShieldCheck size={16} className="text-success" />
                    <span>Real-time Spring Boot Prices</span>
                  </div>
                </div>

                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status"></div>
                    <p className="mt-3 fw-bold text-muted">Searching flights with Spring Boot backend...</p>
                  </div>
                ) : searchResponse && searchResponse.flights.length > 0 ? (
                  searchResponse.flights.map((flight) => (
                    <FlightCard
                      key={flight.id}
                      flight={flight}
                      onSelect={(f) => setActiveBookingFlight(f)}
                      onViewDetails={(f) => setActiveDetailsFlight(f)}
                    />
                  ))
                ) : (
                  <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
                    <AlertCircle size={48} className="text-muted mx-auto mb-3" />
                    <h5 className="fw-bold text-dark">No flights matched your filters</h5>
                    <p className="text-muted small">Try increasing your price slider or choosing all stops.</p>
                    <button
                      className="btn btn-outline-primary rounded-pill px-4 mx-auto"
                      onClick={handleResetFilters}
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Modals */}
      <FlightDetailsModal
        flight={activeDetailsFlight}
        onClose={() => setActiveDetailsFlight(null)}
        onSelect={(f) => {
          setActiveDetailsFlight(null);
          setActiveBookingFlight(f);
        }}
      />

      <BookingModal
        flight={activeBookingFlight}
        passengersCount={criteria.passengers}
        onClose={() => setActiveBookingFlight(null)}
        onBookingSuccess={(res) => {
          setActiveBookingFlight(null);
          setConfirmedBooking(res);
        }}
      />

      {showPnrModal && (
        <PnrLookupModal
          onClose={() => setShowPnrModal(false)}
          onSearchResult={(res) => {
            setShowPnrModal(false);
            setConfirmedBooking(res);
          }}
        />
      )}

      {/* Footer */}
      <footer className="bg-dark text-white-50 py-4 mt-auto border-top border-secondary border-opacity-25">
        <div className="container text-center">
          <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
            <Plane size={20} className="text-primary" />
            <span className="fw-bold text-white fs-5">SkyWings Flight Engine</span>
          </div>
          <p className="small mb-0">Built with React Next.js (TypeScript) & Java 17 Spring Boot REST Backend</p>
        </div>
      </footer>
    </div>
  );
}
