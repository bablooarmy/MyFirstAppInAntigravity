'use client';

import React from 'react';
import { Flight } from '../types/flight';
import { Plane, Clock, Wifi, Utensils, Zap, Shield, Luggage, X } from 'lucide-react';

interface FlightDetailsModalProps {
  flight: Flight | null;
  onClose: () => void;
  onSelect: (flight: Flight) => void;
}

export const FlightDetailsModal: React.FC<FlightDetailsModalProps> = ({ flight, onClose, onSelect }) => {
  if (!flight) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)' }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
          {/* Header */}
          <div className="modal-header bg-dark text-white p-4">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-primary text-white fw-bold px-3 py-2 rounded-3 fs-5">
                {flight.airlineCode}
              </div>
              <div>
                <h5 className="modal-title fw-bold m-0 text-white">
                  {flight.airlineName} - {flight.flightNumber}
                </h5>
                <span className="small text-info">
                  {flight.origin.code} ({flight.origin.city}) → {flight.destination.code} ({flight.destination.city})
                </span>
              </div>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body p-4 bg-light">
            <h6 className="fw-bold text-muted small mb-3">FLIGHT ITINERARY & SEGMENTS</h6>

            {flight.legs && flight.legs.map((leg, idx) => (
              <div key={idx} className="card border-0 shadow-sm rounded-3 p-3 mb-3 bg-white">
                <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                  <span className="fw-bold text-primary">Segment {idx + 1}: {leg.flightNumber}</span>
                  <span className="badge bg-light text-dark border fw-semibold">{leg.aircraft}</span>
                </div>

                <div className="row align-items-center text-center text-md-start">
                  <div className="col-md-5">
                    <div className="fw-bold fs-4">{leg.departureTime}</div>
                    <div className="fw-bold text-dark">{leg.origin.code} - {leg.origin.name}</div>
                    <div className="small text-muted">{leg.origin.city}, {leg.origin.country}</div>
                  </div>

                  <div className="col-md-2 my-2 my-md-0 text-center">
                    <div className="small text-muted mb-1">{leg.duration}</div>
                    <Plane size={18} className="text-primary" />
                  </div>

                  <div className="col-md-5 text-md-end">
                    <div className="fw-bold fs-4">{leg.arrivalTime}</div>
                    <div className="fw-bold text-dark">{leg.destination.code} - {leg.destination.name}</div>
                    <div className="small text-muted">{leg.destination.city}, {leg.destination.country}</div>
                  </div>
                </div>

                {idx < flight.legs.length - 1 && (
                  <div className="alert alert-warning my-3 py-2 px-3 small d-flex align-items-center gap-2 rounded-3">
                    <Clock size={16} />
                    <span>Layover in {leg.destination.city} ({leg.destination.code}) - 1h 35m</span>
                  </div>
                )}
              </div>
            ))}

            {/* Inflight Amenities */}
            <div className="card border-0 shadow-sm rounded-3 p-3 bg-white mt-3">
              <h6 className="fw-bold text-muted small mb-3">IN-FLIGHT AMENITIES & POLICIES</h6>
              <div className="row g-3">
                <div className="col-6 col-md-3 d-flex align-items-center gap-2">
                  <Wifi size={18} className="text-primary" />
                  <span className="small fw-semibold">High-Speed Wi-Fi</span>
                </div>
                <div className="col-6 col-md-3 d-flex align-items-center gap-2">
                  <Utensils size={18} className="text-primary" />
                  <span className="small fw-semibold">Complimentary Meal</span>
                </div>
                <div className="col-6 col-md-3 d-flex align-items-center gap-2">
                  <Zap size={18} className="text-primary" />
                  <span className="small fw-semibold">In-seat USB Power</span>
                </div>
                <div className="col-6 col-md-3 d-flex align-items-center gap-2">
                  <Luggage size={18} className="text-primary" />
                  <span className="small fw-semibold">23kg Checked Bag</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer bg-white border-top p-3 d-flex justify-content-between align-items-center">
            <div>
              <span className="text-muted small">Total Fare: </span>
              <span className="fs-3 fw-extrabold text-primary ms-1">${flight.price}</span>
            </div>
            <div className="d-flex gap-2">
              <button type="button" className="btn btn-outline-secondary rounded-pill px-4" onClick={onClose}>
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary rounded-pill px-4 fw-bold shadow-sm"
                onClick={() => {
                  onClose();
                  onSelect(flight);
                }}
              >
                Proceed to Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
