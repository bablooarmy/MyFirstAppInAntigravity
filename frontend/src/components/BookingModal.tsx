'use client';

import React, { useState } from 'react';
import { Flight, Passenger, BookingRequest, BookingResponse } from '../types/flight';
import { createBooking } from '../services/api';
import { CheckCircle2, User, CreditCard, Ticket, AlertCircle, Plane, Armchair } from 'lucide-react';

interface BookingModalProps {
  flight: Flight | null;
  passengersCount: number;
  onClose: () => void;
  onBookingSuccess: (response: BookingResponse) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  flight,
  passengersCount,
  onClose,
  onBookingSuccess,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);

  // Form State for Passenger 1
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [passport, setPassport] = useState('');
  const [selectedSeat, setSelectedSeat] = useState('14A');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  if (!flight) return null;

  const seats = [
    { num: '12A', occ: false }, { num: '12B', occ: true }, { num: '12C', occ: false },
    { num: '12D', occ: false }, { num: '12E', occ: false }, { num: '12F', occ: true },
    { num: '14A', occ: false }, { num: '14B', occ: false }, { num: '14C', occ: false },
    { num: '14D', occ: true }, { num: '14E', occ: false }, { num: '14F', occ: false },
    { num: '15A', occ: false }, { num: '15B', occ: false }, { num: '15C', occ: true },
    { num: '15D', occ: false }, { num: '15E', occ: false }, { num: '15F', occ: false },
  ];

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const passengerList: Passenger[] = [
      {
        firstName: firstName || 'John',
        lastName: lastName || 'Doe',
        email: email || 'john.doe@example.com',
        phone: phone || '+1 555-0199',
        passportNumber: passport || 'A98765432',
        seatNumber: selectedSeat,
      }
    ];

    const requestData: BookingRequest = {
      outboundFlightId: flight.id,
      passengers: passengerList,
      cabinClass: flight.cabinClass,
      paymentMethod,
      totalPrice: flight.price * passengersCount,
    };

    const response = await createBooking(requestData);
    setLoading(false);

    if (response) {
      onBookingSuccess(response);
    } else {
      alert('Failed to process booking with Spring Boot backend. Please try again.');
    }
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(6px)' }}
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
          {/* Header */}
          <div className="modal-header bg-primary bg-gradient text-white p-4">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-white bg-opacity-25 p-2 rounded-circle">
                <Ticket size={24} className="text-white" />
              </div>
              <div>
                <h5 className="modal-title fw-bold m-0 text-white">Passenger Checkout & Seat Selection</h5>
                <span className="small text-white-50">Flight {flight.flightNumber} ({flight.origin.code} → {flight.destination.code})</span>
              </div>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          {/* Body */}
          <div className="modal-body p-4 bg-light">
            <form onSubmit={handleSubmitBooking}>
              <div className="row g-4">
                {/* Left Column: Form & Seats */}
                <div className="col-lg-8">
                  {/* Step Tabs */}
                  <div className="d-flex gap-2 mb-4">
                    <button
                      type="button"
                      className={`btn btn-sm rounded-pill px-4 fw-bold ${step === 1 ? 'btn-primary' : 'btn-outline-secondary'}`}
                      onClick={() => setStep(1)}
                    >
                      1. Passenger & Seat
                    </button>
                    <button
                      type="button"
                      className={`btn btn-sm rounded-pill px-4 fw-bold ${step === 2 ? 'btn-primary' : 'btn-outline-secondary'}`}
                      onClick={() => setStep(2)}
                      disabled={!firstName || !lastName || !email}
                    >
                      2. Payment & Confirmation
                    </button>
                  </div>

                  {step === 1 ? (
                    <div>
                      {/* Passenger Form */}
                      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
                        <h6 className="fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                          <User size={18} className="text-primary" /> Primary Passenger Details
                        </h6>

                        <div className="row g-3">
                          <div className="col-md-6">
                            <label className="form-label small fw-bold text-muted">FIRST NAME *</label>
                            <input
                              type="text"
                              className="form-control fw-semibold"
                              placeholder="e.g. Alex"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              required
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label small fw-bold text-muted">LAST NAME *</label>
                            <input
                              type="text"
                              className="form-control fw-semibold"
                              placeholder="e.g. Morgan"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              required
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label small fw-bold text-muted">EMAIL ADDRESS *</label>
                            <input
                              type="email"
                              className="form-control fw-semibold"
                              placeholder="alex.morgan@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label small fw-bold text-muted">PHONE NUMBER</label>
                            <input
                              type="tel"
                              className="form-control fw-semibold"
                              placeholder="+1 (555) 019-2834"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>

                          <div className="col-md-12">
                            <label className="form-label small fw-bold text-muted">PASSPORT NUMBER / GOVT ID</label>
                            <input
                              type="text"
                              className="form-control fw-semibold"
                              placeholder="A98765432"
                              value={passport}
                              onChange={(e) => setPassport(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Interactive Seat Picker */}
                      <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                        <h6 className="fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                          <Armchair size={18} className="text-primary" /> Select Preferred Seat (Row 12 - 15)
                        </h6>

                        <div className="text-center mb-3">
                          <span className="small text-muted me-3">Selected Seat: <strong className="text-primary">{selectedSeat}</strong></span>
                          <span className="badge bg-primary me-2">Selected</span>
                          <span className="badge bg-light text-dark border me-2">Available</span>
                          <span className="badge bg-secondary">Occupied</span>
                        </div>

                        <div className="seat-grid">
                          {seats.map((s, index) => {
                            const isSelected = selectedSeat === s.num;
                            const isAisle = index % 6 === 2; // Add spacing after C
                            return (
                              <React.Fragment key={s.num}>
                                <button
                                  type="button"
                                  disabled={s.occ}
                                  className={`seat-btn ${s.occ ? 'occupied' : ''} ${isSelected ? 'selected' : ''}`}
                                  onClick={() => setSelectedSeat(s.num)}
                                >
                                  {s.num}
                                </button>
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Step 2: Payment options */
                    <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                      <h6 className="fw-bold text-dark d-flex align-items-center gap-2 mb-4">
                        <CreditCard size={18} className="text-primary" /> Payment Method Simulation
                      </h6>

                      <div className="d-flex flex-column gap-3 mb-4">
                        <div
                          className={`p-3 border rounded-3 d-flex align-items-center gap-3 cursor-pointer ${paymentMethod === 'Credit Card' ? 'border-primary bg-primary bg-opacity-10' : ''}`}
                          onClick={() => setPaymentMethod('Credit Card')}
                        >
                          <input type="radio" name="payment" checked={paymentMethod === 'Credit Card'} readOnly />
                          <CreditCard size={20} className="text-primary" />
                          <div>
                            <div className="fw-bold">Credit / Debit Card</div>
                            <div className="small text-muted">Visa, Mastercard, American Express</div>
                          </div>
                        </div>

                        <div
                          className={`p-3 border rounded-3 d-flex align-items-center gap-3 cursor-pointer ${paymentMethod === 'PayPal' ? 'border-primary bg-primary bg-opacity-10' : ''}`}
                          onClick={() => setPaymentMethod('PayPal')}
                        >
                          <input type="radio" name="payment" checked={paymentMethod === 'PayPal'} readOnly />
                          <div className="fw-bold text-info">PayPal Instant Checkout</div>
                        </div>
                      </div>

                      <div className="alert alert-info small rounded-3 d-flex align-items-center gap-2 m-0">
                        <AlertCircle size={18} />
                        <span>Demo Sandbox mode enabled. No actual charge will occur. PNR e-ticket generated instantly via Spring Boot API.</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Price Summary Sidebar */}
                <div className="col-lg-4">
                  <div className="card border-0 shadow-sm rounded-4 p-4 bg-white sticky-top" style={{ top: '20px' }}>
                    <h6 className="fw-bold text-dark border-bottom pb-3 mb-3">FARE BREAKDOWN</h6>

                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted small">Flight ({flight.airlineCode} {flight.flightNumber})</span>
                      <span className="fw-semibold">${flight.price}</span>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted small">Passengers</span>
                      <span className="fw-semibold">x {passengersCount}</span>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted small">Taxes & Airport Fees</span>
                      <span className="fw-semibold text-success">Included</span>
                    </div>

                    <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
                      <span className="text-muted small">Seat Selection ({selectedSeat})</span>
                      <span className="fw-semibold text-success">Free</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <span className="fw-bold fs-5 text-dark">Total Price</span>
                      <span className="fs-3 fw-extrabold text-primary">${flight.price * passengersCount}</span>
                    </div>

                    {step === 1 ? (
                      <button
                        type="button"
                        className="btn btn-primary btn-lg w-100 rounded-pill fw-bold shadow-sm"
                        disabled={!firstName || !lastName || !email}
                        onClick={() => setStep(2)}
                      >
                        Continue to Payment
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-success btn-lg w-100 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                        disabled={loading}
                      >
                        {loading ? (
                          <span className="spinner-border spinner-border-sm"></span>
                        ) : (
                          <>
                            <CheckCircle2 size={20} />
                            <span>Confirm & Issue E-Ticket</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
