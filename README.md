# 🇸🇦 Saudi Electronics & Software Solutions Web Application

A full-stack, 3-tier web application built for a Saudi Arabia electronic shop selling hardware (Monitors, Cables, Desktops, HDDs, SSDs, Pendrives) and providing software solutions (Flashing, OS Installation, System Diagnostics).

---

## 🛠️ Stack & Architecture

- **Frontend**: Vite + React + Tailwind CSS + Lucide Icons (Runs on port `5173`)
- **Backend API**: Node.js + Express.js (Runs on port `5000`)
- **Database**: PostgreSQL 16 (Runs on port `5432` with automated schema & seed script)
- **DevOps**: Docker & Docker Compose (`docker-compose.yml`, `frontend/Dockerfile`, `backend/Dockerfile`)

---

## 🚀 How to Run with Docker Compose

1. Open your terminal in this directory:
   ```bash
   cd "C:\Users\Fahad Hussain\.gemini\antigravity\scratch\saudi-electronics-shop"
   ```

2. Start all 3 containers with build:
   ```bash
   docker compose up --build
   ```

3. Access the services:
   - **Frontend Web App**: [http://localhost:5173](http://localhost:5173)
   - **Backend REST API**: [http://localhost:5000/api/health](http://localhost:5000/api/health)
   - **PostgreSQL DB**: `localhost:5432` (User: `postgres`, Pass: `saudi_electronics_2026`, DB: `saudi_electronics_db`)

---

## 🖥️ Local Development (Without Docker)

### 1. Database Setup
Ensure PostgreSQL is running and execute `db/init.sql`.

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
## Webhook test
Testing Jenkins GitHub 
for weebhook
