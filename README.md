# Project 4: Express Integration and Cloud Deployment

## Project Overview

This project is a full-stack dashboard that connects a front-end web page to a real Express.js back-end. The dashboard uses API endpoints to load and add dashboard items. It also includes environment variable integration and is deployed using Render.

## Features

- Express.js back-end server
- GET `/api/items` endpoint that returns JSON data
- POST `/api/items` endpoint that accepts and validates JSON data
- `express.json()` middleware for reading request bodies
- Simple request-logging middleware
- Front-end dashboard connected to the Express API
- Loading messages
- User-friendly error messages
- Responsive card layout
- Hover effects and button tooltips
- Environment variable support using `process.env`
- Cloud deployment using Render

## API Endpoints

### GET `/api/items`

This endpoint returns all dashboard items as JSON.

Example response:

```json
{
  "message": "Hello from Render! Umar's full-stack dashboard is live.",
  "count": 3,
  "data": [
    {
      "id": 1,
      "title": "Learn Express.js",
      "category": "Backend",
      "description": "Practice creating API routes using Express."
    }
  ]
}
POST /api/items

This endpoint allows a new dashboard item to be added.

Example request body:

{
  "title": "Practice Deployment",
  "category": "Cloud",
  "description": "Deploy the full-stack app using Render."
}

Example response:

{
  "message": "Item added successfully!",
  "data": {
    "id": 4,
    "title": "Practice Deployment",
    "category": "Cloud",
    "description": "Deploy the full-stack app using Render."
  }
}
Environment Variable Setup

This project uses an environment variable named DASHBOARD_GREETING.

In server.js, the app reads the environment variable using:

const DASHBOARD_GREETING = process.env.DASHBOARD_GREETING || "Welcome to Umar's local dashboard API!";

This allows the message to change depending on the environment. Locally, the app uses the default message. On Render, the app uses the message set in the Render environment settings.

On Render, I added this environment variable:

Key: DASHBOARD_GREETING
Value: Hello from Render! Umar's full-stack dashboard is live.
Deployment Platform

I used Render to deploy this project.

I chose Render because it works well with Node.js and Express applications and is simple to use for student projects.

Deployment Steps
I created the Express.js back-end in server.js.
I created the front-end using index.html and dashboard_project.js.
I installed Express using npm install express.
I made sure package.json included the start script:
"scripts": {
  "start": "node server.js"
}
I tested the project locally using npm start.
I uploaded the project files to GitHub.
I created a new Web Service on Render.
I connected my GitHub repository to Render.
I used these Render settings:
Build Command: npm install
Start Command: npm start
I added the DASHBOARD_GREETING environment variable in Render.
I redeployed the application.
I opened the live URL in the browser to confirm that the dashboard and API worked correctly.
Live Application

Live Dashboard URL:
https://final-project-express-dashboard.onrender.com/

Live API Endpoint:
https://final-project-express-dashboard.onrender.com/api/items

Issues Encountered

One issue I had to be careful about was the port setting. A deployed app cannot always use only port 3000, so I used this in server.js:

const PORT = process.env.PORT || 3000;

This allows the app to work locally and also on Render.

Created By 
Umar Mohammed for INFO 350