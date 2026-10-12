# 🇸🇦 Saudi Electronics & Software Solutions Web Application

A full-stack, 3-tier web application for a Saudi Arabia electronics shop selling hardware (Monitors, Cables, Desktops, HDDs, SSDs, Pendrives) and offering software services (Flashing, OS Installation, System Diagnostics).

## 🛠️ Stack & Architecture

- **Frontend:** Vite + React + Tailwind CSS + Lucide Icons (port `5173`)
- **Backend API:** Node.js + Express.js (port `5000`)
- **Database:** PostgreSQL 16 (port `5432`, automated schema and seed script)
- **DevOps:** Docker, Docker Compose, Jenkins, Docker Hub, AWS EC2

## 🔄 CI/CD Pipeline

GitHub -> Jenkins (webhook) -> Docker Hub -> AWS EC2

1. Checkout code
2. Validate Docker Compose
3. Backend validation
4. Frontend build validation
5. Build and push Docker images to Docker Hub

## 🚀 Run with Docker Compose

1. Clone the repo:

```
git clone https://github.com/sohaildevops123/saudi-electronic-app.git
cd saudi-electronic-app
```

2. Create your env file and set your own database password:

```
cp .env.example .env
```

3. Build and start all 3 containers:

```
docker compose up -d --build
```

4. Open the services:
   - Frontend: http://localhost:5173
   - Backend health check: http://localhost:5000/api/health
   - PostgreSQL: `localhost:5432` (credentials come from your `.env` file)

## 🖥️ Local Development (Without Docker)

1. **Database:** make sure PostgreSQL is running, then execute `db/init.sql`.
2. **Backend:**

```
cd backend
npm install
npm run dev
```

3. **Frontend:**

```
cd frontend
npm install
npm run dev
```

## 📌 Future Improvements

- Automated deploy stage in the pipeline
- Move secrets to Jenkins credentials
- Add automated tests
