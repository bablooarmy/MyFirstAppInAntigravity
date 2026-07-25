'use client';

import React from 'react';
import { Plane, Ticket, Compass, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenPnrModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenPnrModal }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center gap-2" href="#">
          <div className="bg-primary bg-gradient p-2 rounded-circle d-flex align-items-center justify-content-center text-white shadow-sm">
            <Plane size={22} className="text-white" />
          </div>
          <span className="brand-title">SkyWings</span>
        </a>

        <div className="d-flex align-items-center gap-3 ms-auto">
          <button
            className="btn btn-outline-light btn-sm d-flex align-items-center gap-2 rounded-pill px-3 py-2"
            onClick={onOpenPnrModal}
          >
            <Ticket size={16} className="text-info" />
            <span className="d-none d-sm-inline fw-semibold">My Bookings / PNR</span>
          </button>
          
          <div className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-25 px-3 py-2 rounded-pill d-none d-md-flex align-items-center gap-1">
            <ShieldCheck size={14} />
            <span className="small">Spring Boot API Connected</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
