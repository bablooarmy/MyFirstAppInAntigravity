'use client';

import React from 'react';
import { SlidersHorizontal, DollarSign, Plane, Filter, ArrowUpDown } from 'lucide-react';

interface FilterSidebarProps {
  minPrice: number;
  maxPrice: number;
  selectedPrice: number;
  onPriceChange: (price: number) => void;
  selectedStops: number | null; // null for all, 0 for direct, 1 for 1 stop
  onStopsChange: (stops: number | null) => void;
  availableAirlines: string[];
  selectedAirline: string;
  onAirlineChange: (airline: string) => void;
  sortBy: 'cheapest' | 'fastest' | 'departure';
  onSortChange: (sort: 'cheapest' | 'fastest' | 'departure') => void;
  onResetFilters: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  minPrice,
  maxPrice,
  selectedPrice,
  onPriceChange,
  selectedStops,
  onStopsChange,
  availableAirlines,
  selectedAirline,
  onAirlineChange,
  sortBy,
  onSortChange,
  onResetFilters,
}) => {
  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 sticky-lg-top" style={{ top: '100px' }}>
      <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
        <h5 className="fw-bold m-0 d-flex align-items-center gap-2">
          <Filter size={18} className="text-primary" /> Filter & Sort
        </h5>
        <button
          className="btn btn-link text-decoration-none p-0 small text-muted fw-semibold"
          onClick={onResetFilters}
        >
          Reset All
        </button>
      </div>

      {/* Sort By */}
      <div className="mb-4">
        <label className="form-label fw-bold small text-muted d-flex align-items-center gap-1">
          <ArrowUpDown size={14} className="text-primary" /> SORT RESULTS BY
        </label>
        <div className="btn-group w-100" role="group">
          <button
            type="button"
            className={`btn btn-sm ${sortBy === 'cheapest' ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => onSortChange('cheapest')}
          >
            Cheapest
          </button>
          <button
            type="button"
            className={`btn btn-sm ${sortBy === 'fastest' ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => onSortChange('fastest')}
          >
            Fastest
          </button>
          <button
            type="button"
            className={`btn btn-sm ${sortBy === 'departure' ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => onSortChange('departure')}
          >
            Departure
          </button>
        </div>
      </div>

      {/* Price Slider */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <label className="form-label fw-bold small text-muted m-0 d-flex align-items-center gap-1">
            <DollarSign size={14} className="text-primary" /> MAX PRICE
          </label>
          <span className="fw-bold text-primary fs-5">${selectedPrice}</span>
        </div>
        <input
          type="range"
          className="form-range"
          min={minPrice || 100}
          max={maxPrice || 3000}
          step={20}
          value={selectedPrice || maxPrice || 3000}
          onChange={(e) => onPriceChange(Number(e.target.value))}
        />
        <div className="d-flex justify-content-between small text-muted">
          <span>${minPrice || 100}</span>
          <span>${maxPrice || 3000}</span>
        </div>
      </div>

      {/* Stops Filter */}
      <div className="mb-4">
        <label className="form-label fw-bold small text-muted d-flex align-items-center gap-1 mb-2">
          <Plane size={14} className="text-primary" /> STOPS
        </label>
        <div className="d-flex flex-column gap-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="stopsFilter"
              id="stopsAll"
              checked={selectedStops === null}
              onChange={() => onStopsChange(null)}
            />
            <label className="form-check-label fw-semibold text-secondary" htmlFor="stopsAll">
              All Flights
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="stopsFilter"
              id="stopsDirect"
              checked={selectedStops === 0}
              onChange={() => onStopsChange(0)}
            />
            <label className="form-check-label fw-semibold text-secondary" htmlFor="stopsDirect">
              Non-stop Only
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="stopsFilter"
              id="stopsOne"
              checked={selectedStops === 1}
              onChange={() => onStopsChange(1)}
            />
            <label className="form-check-label fw-semibold text-secondary" htmlFor="stopsOne">
              1 Stop Max
            </label>
          </div>
        </div>
      </div>

      {/* Airline Filter */}
      {availableAirlines.length > 0 && (
        <div className="mb-2">
          <label className="form-label fw-bold small text-muted mb-2">AIRLINES</label>
          <select
            className="form-select form-select-sm rounded-3 fw-semibold text-secondary"
            value={selectedAirline}
            onChange={(e) => onAirlineChange(e.target.value)}
          >
            <option value="">All Airlines</option>
            {availableAirlines.map((airline) => (
              <option key={airline} value={airline}>
                {airline}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
