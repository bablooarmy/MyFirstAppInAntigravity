'use client';

import React from 'react';
import { Flight } from '../types/flight';
import { Plane, Info, CheckCircle2, Luggage, Clock } from 'lucide-react';

interface FlightCardProps {
  flight: Flight;
  onSelect: (flight: Flight) => void;
  onViewDetails: (flight: Flight) => void;
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight, onSelect, onViewDetails }) => {
  const getBadgeClass = (badge?: string) => {
    if (!badge) return '';
    if (badge === 'Best Value') return 'badge-best';
    if (badge === 'Cheapest') return 'badge-cheapest';
    if (badge === 'Fastest') return 'badge-fastest';
    return 'bg-secondary text-white';
  };

  return (
    <div className="flight-card p-4">
      {/* Top Bar: Badge & Airline info */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded-3 bg-light border p-2 d-flex align-items-center justify-content-center fw-bold text-primary"
            style={{ width: '48px', height: '48px', fontSize: '1rem' }}
          >
            {flight.airlineCode}
          </div>
          <div>
            <div className="fw-bold text-dark fs-6">{flight.airlineName}</div>
            <div className="small text-muted d-flex align-items-center gap-2">
              <span>{flight.flightNumber}</span>
              <span>•</span>
              <span className="badge bg-light text-secondary border fw-normal">{flight.cabinClass}</span>
            </div>
          </div>
        </div>

        {flight.badge && (
          <span className={`badge-custom ${getBadgeClass(flight.badge)}`}>
            {flight.badge}
          </span>
        )}
      </div>

      {/* Flight Timeline & Schedule */}
      <div className="row align-items-center my-3 text-center text-md-start">
        {/* Departure */}
        <div className="col-md-3 mb-2 mb-md-0">
          <div className="fs-3 fw-extrabold text-dark">{flight.departureTime}</div>
          <div className="fw-bold text-primary fs-5">{flight.origin.code}</div>
          <div className="small text-muted text-truncate">{flight.origin.city}</div>
        </div>

        {/* Timeline Indicator */}
        <div className="col-md-6 mb-3 mb-md-0">
          <div className="text-center small fw-semibold text-muted mb-1 d-flex align-items-center justify-content-center gap-1">
            <Clock size={13} /> {flight.totalDuration}
          </div>
          <div className="flight-timeline my-2">
            <div className="timeline-line"></div>
            <div className="timeline-plane">
              <Plane size={20} className="text-primary" />
            </div>
          </div>
          <div className="text-center small fw-semibold">
            {flight.stops === 0 ? (
              <span className="text-success fw-bold">Non-stop (Direct)</span>
            ) : (
              <span className="text-warning fw-bold">{flight.stopDetails}</span>
            )}
          </div>
        </div>

        {/* Arrival */}
        <div className="col-md-3 text-md-end">
          <div className="fs-3 fw-extrabold text-dark">{flight.arrivalTime}</div>
          <div className="fw-bold text-primary fs-5">{flight.destination.code}</div>
          <div className="small text-muted text-truncate">{flight.destination.city}</div>
        </div>
      </div>

      {/* Bottom Footer: Baggage & Action Buttons */}
      <div className="pt-3 border-top d-flex flex-wrap align-items-center justify-content-between gap-3">
        <div className="small text-muted d-flex align-items-center gap-2">
          <Luggage size={16} className="text-secondary" />
          <span>{flight.baggagePolicy}</span>
        </div>

        <div className="d-flex align-items-center gap-3 ms-auto">
          <button
            type="button"
            className="btn btn-link text-decoration-none text-secondary p-0 small fw-semibold d-flex align-items-center gap-1"
            onClick={() => onViewDetails(flight)}
          >
            <Info size={15} /> Details
          </button>

          <div className="text-end me-2">
            <div className="fs-4 fw-extrabold text-primary">${flight.price}</div>
            <div className="small text-muted" style={{ fontSize: '0.75rem' }}>incl. taxes</div>
          </div>

          <button
            type="button"
            className="btn btn-primary rounded-pill px-4 fw-bold shadow-sm"
            onClick={() => onSelect(flight)}
          >
            Select Flight
          </button>
        </div>
      </div>
    </div>
  );
};
