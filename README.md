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

## API Endpoints

### GET `/api/items`

Returns all dashboard items as JSON.

Example response:

```json
{
  "message": "Hello from Render!",
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