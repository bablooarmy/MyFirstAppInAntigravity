import axios from 'axios';
import { Airport, FlightSearchCriteria, FlightSearchResponse, Flight, BookingRequest, BookingResponse } from '../types/flight';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchAirports = async (query: string = ''): Promise<Airport[]> => {
  try {
    const response = await api.get<Airport[]>(`/airports/search`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching airports:', error);
    return [];
  }
};

export const searchFlights = async (criteria: FlightSearchCriteria): Promise<FlightSearchResponse> => {
  try {
    const response = await api.post<FlightSearchResponse>('/flights/search', criteria);
    return response.data;
  } catch (error) {
    console.error('Error searching flights:', error);
    return {
      flights: [],
      totalResults: 0,
      minPrice: 0,
      maxPrice: 1000,
      availableAirlines: [],
    };
  }
};

export const getFlightById = async (id: string): Promise<Flight | null> => {
  try {
    const response = await api.get<Flight>(`/flights/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching flight details:', error);
    return null;
  }
};

export const createBooking = async (bookingData: BookingRequest): Promise<BookingResponse | null> => {
  try {
    const response = await api.post<BookingResponse>('/bookings', bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    return null;
  }
};

export const getBookingByPnr = async (pnr: string): Promise<BookingResponse | null> => {
  try {
    const response = await api.get<BookingResponse>(`/bookings/${pnr}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching booking by PNR:', error);
    return null;
  }
};
