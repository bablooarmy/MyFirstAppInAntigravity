'use client';

import React, { useState } from 'react';
import { BookingResponse } from '../types/flight';
import { getBookingByPnr } from '../services/api';
import { Search, Ticket, X, AlertCircle } from 'lucide-react';

interface PnrLookupModalProps {
  onClose: () => void;
  onSearchResult: (booking: BookingResponse) => void;
}

export const PnrLookupModal: React.FC<PnrLookupModalProps> = ({ onClose, onSearchResult }) => {
  const [pnr, setPnr] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pnr.trim()) return;

    setLoading(true);
    setError(null);

    const booking = await getBookingByPnr(pnr.trim());
    setLoading(false);

    if (booking) {
      onSearchResult(booking);
    } else {
      setError(`No booking found for PNR code "${pnr.toUpperCase()}". Please check your reference.`);
    }
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
          <div className="modal-header bg-dark text-white p-4">
            <div className="d-flex align-items-center gap-2">
              <Ticket size={22} className="text-info" />
              <h5 className="modal-title fw-bold text-white m-0">Retrieve E-Ticket / PNR</h5>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4 bg-light">
            <form onSubmit={handleSearch}>
              <label className="form-label fw-bold small text-muted">ENTER 6-CHARACTER PNR CODE</label>
              <div className="input-group input-group-lg mb-3">
                <input
                  type="text"
                  className="form-control fw-extrabold text-uppercase text-center border-2 border-primary"
                  placeholder="e.g. AB12CD"
                  maxLength={6}
                  value={pnr}
                  onChange={(e) => setPnr(e.target.value.toUpperCase())}
                  required
                />
                <button
                  type="submit"
                  className="btn btn-primary fw-bold px-4"
                  disabled={loading}
                >
                  {loading ? <span className="spinner-border spinner-border-sm"></span> : <Search size={20} />}
                </button>
              </div>

              {error && (
                <div className="alert alert-danger small d-flex align-items-center gap-2 rounded-3 m-0">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
