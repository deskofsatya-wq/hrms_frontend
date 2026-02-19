# hrms_frontend
# HRMS Lite

HRMS Lite is a lightweight Human Resource Management System built with **React** for the frontend, **Python FastAPI** for the backend, and **MongoDB** as the database. It allows an admin to manage employee records and track attendance with a clean and professional interface. The system includes authentication via JWT tokens and proper validation and error handling.

## Overview
The application provides the following functionalities: add, list, and delete employees; mark, list, and delete attendance; all while maintaining clean UI and proper API responses. It focuses on essential HR operations without over-engineering.

## Tech Stack
- Frontend: React (Vite or Create React App)
- Backend: Python FastAPI
- Database: MongoDB (Atlas or local)
- Authentication: JWT Tokens
- Deployment: Vercel (frontend), Render/Gunicorn+Nginx (backend)

## Frontend Setup (React)
1. Navigate to the frontend folder:
```bash
cd frontend
Install dependencies:

npm install
Start the React app:

npm start
The frontend will run at http://localhost:3000.