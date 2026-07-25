# Flight Search Application ✈️

A modern full-stack application for searching flights, comparing itineraries, booking tickets, and looking up booking status via PNR.

---

## 🏗️ Architecture Overview

The application follows a decoupled client-server architecture:

```
+-------------------------------------------------------+
|                    Frontend                           |
|       Next.js 16 (React 19, TypeScript)               |
|  - Modern Search UI & Filters (Stops, Price, Airline) |
|  - One-Way, Round-Trip & Multi-City support           |
|  - Interactive Booking Modal & Ticket Generator       |
|  - PNR Lookup & Management                            |
+---------------------------+---------------------------+
                            | HTTP / REST (Axios)
                            v
+-------------------------------------------------------+
|                    Backend                            |
|          Java 17 / Spring Boot 3                      |
|  - RESTful API Controllers (/api/*)                   |
|  - Business Services (Flight, Airport, Booking)       |
|  - Dynamic Mock Data Generators                       |
|  - OpenAPI 3 / Swagger Documentation                  |
|  - CORS Configured for Local Development              |
+-------------------------------------------------------+
```

### Key Components

- **Frontend (`/frontend`)**:
  - **Framework**: Next.js 16 (App Router), React 19, TypeScript.
  - **Styling**: Custom modern CSS with glassmorphism aesthetics, responsive layouts, and Bootstrap Icons.
  - **Services**: Centralized API abstraction using Axios ([api.ts](file:///c:/AgentWorkspace/MyFirstAppInAntigravity/frontend/src/services/api.ts)).

- **Backend (`/backend`)**:
  - **Framework**: Java 17, Spring Boot 3.2.5, Maven.
  - **API Documentation**: Springdoc OpenAPI / Swagger UI.
  - **Controllers**:
    - `AirportController` - Airport lookup and auto-complete (`/api/airports`).
    - `FlightController` - Flight search logic across single/multi-leg routes (`/api/flights`).
    - `BookingController` - Ticket reservation & PNR retrieval (`/api/bookings`).

---

## 📂 Project Structure

```
MyFirstAppInAntigravity/
├── backend/                  # Java Spring Boot Backend Service
│   ├── pom.xml               # Maven configuration & dependencies
│   └── src/
│       └── main/
│           ├── java/com/flightsearch/
│           │   ├── config/   # CORS & Swagger OpenApi configuration
│           │   ├── controller/# REST Controllers (Airport, Flight, Booking)
│           │   ├── model/    # Data Transfer Objects & Domain Models
│           │   └── service/  # Core business logic & data providers
│           └── resources/    # Application properties (port 8080)
├── frontend/                 # Next.js Frontend Web Application
│   ├── package.json          # Node dependencies & npm scripts
│   ├── src/
│   │   ├── app/              # Next.app router, layouts, and global styles
│   │   ├── components/       # SearchBox, FlightCard, FilterSidebar, BookingModal, etc.
│   │   ├── services/         # Axios REST API client
│   │   └── types/            # TypeScript interfaces for flight models
└── README.md
```

---

## 🛠️ Prerequisites

Before running the application, make sure you have installed:

- **Java Development Kit (JDK)**: Version 17 or higher
- **Apache Maven**: Version 3.8+ (or use the included Maven wrapper)
- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher

---

## 🚀 Getting Started

### 1. Running the Backend (Spring Boot API)

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Build and start the Spring Boot server using Maven:
   - **On Windows (PowerShell/CMD):**
     ```cmd
     mvn spring-boot:run
     ```
   - **On macOS/Linux:**
     ```bash
     mvn spring-boot:run
     ```

3. The backend will start on **`http://localhost:8080`**.
   - **API Base URL**: `http://localhost:8080/api`
   - **Swagger OpenAPI Documentation**: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

---

### 2. Running the Frontend (Next.js App)

1. Open a new terminal window and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to **`http://localhost:3000`**.

---

## 📡 API Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/airports/search?query={q}` | Search airports by code, city, or name |
| `GET` | `/api/airports` | Get all available airports |
| `POST` | `/api/flights/search` | Search flights matching criteria |
| `GET` | `/api/flights/{id}` | Get detailed flight information |
| `POST` | `/api/bookings` | Create a new flight booking |
| `GET` | `/api/bookings/{pnr}` | Lookup booking status by PNR code |

---

## ⚙️ Environment Variables (Optional)

If you run the backend on a port other than `8080`, you can configure the frontend API base URL by creating a `.env.local` file inside the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

---

## 📝 Git & Version Control

To stage and commit changes to your repository:

```bash
git add .
git commit -m "Update application"
```

To push to your remote GitHub repository:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```
