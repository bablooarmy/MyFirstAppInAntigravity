export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  timezone: string;
}

export interface Leg {
  flightNumber: string;
  airlineCode: string;
  airlineName: string;
  aircraft: string;
  origin: Airport;
  destination: Airport;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  cabinClass: string;
}

export interface Flight {
  id: string;
  flightNumber: string;
  airlineCode: string;
  airlineName: string;
  airlineLogo: string;
  origin: Airport;
  destination: Airport;
  departureTime: string;
  arrivalTime: string;
  totalDuration: string;
  stops: number;
  stopDetails: string;
  price: number;
  cabinClass: string;
  seatsAvailable: number;
  baggagePolicy: string;
  legs: Leg[];
  badge?: string;
}

export interface FlightSearchCriteria {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  tripType: 'one-way' | 'round-trip';
  passengers: number;
  cabinClass: string;
  maxPrice?: number;
  maxStops?: number;
  airlineFilter?: string;
  sortBy?: 'cheapest' | 'fastest' | 'departure';
}

export interface FlightSearchResponse {
  flights: Flight[];
  returnFlights?: Flight[];
  totalResults: number;
  minPrice: number;
  maxPrice: number;
  availableAirlines: string[];
}

export interface Passenger {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passportNumber: string;
  seatNumber: string;
}

export interface BookingRequest {
  outboundFlightId: string;
  returnFlightId?: string;
  passengers: Passenger[];
  cabinClass: string;
  paymentMethod: string;
  totalPrice: number;
}

export interface BookingResponse {
  pnrCode: string;
  bookingStatus: string;
  bookingDate: string;
  outboundFlight: Flight;
  returnFlight?: Flight;
  passengers: Passenger[];
  totalPrice: number;
  message: string;
}
