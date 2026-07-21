// Project 4: Express Integration and Cloud Deployment
// Created by Umar Mohammed for INFO 350

const express = require("express");
const path = require("path");

const app = express();

// Render provides its own PORT when deployed.
// Locally, the app will use port 3000.
const PORT = process.env.PORT || 3000;

// Environment variable used in the app.
// This will be configured in Render later.
const DASHBOARD_GREETING = process.env.DASHBOARD_GREETING || "Welcome to Umar's local dashboard API!";

// Middleware that allows Express to read JSON request bodies
app.use(express.json());

// Simple request-logging middleware
// This logs the request method, URL, and time.
app.use((req, res, next) => {
    const currentTime = new Date().toLocaleString();
    console.log(`${req.method} ${req.url} - ${currentTime}`);
    next();
});

// Serve frontend files from the same project folder
app.use(express.static(path.join(__dirname)));

// Mock database stored in an array
// This simulates data that would usually come from a real database.
let items = [
    {
        id: 1,
        title: "Learn Express.js",
        category: "Backend",
        description: "Practice creating API routes using Express."
    },
    {
        id: 2,
        title: "Connect Frontend to API",
        category: "Full-Stack",
        description: "Use fetch() to get data from the Express backend."
    },
    {
        id: 3,
        title: "Deploy to Render",
        category: "Deployment",
        description: "Make the application available through a live public URL."
    }
];

// Home route
// This sends the dashboard page when the user visits the main URL.
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// GET /api/items
// This returns all dashboard items as JSON.
app.get("/api/items", (req, res) => {
    res.json({
        message: DASHBOARD_GREETING,
        count: items.length,
        data: items
    });
});

// POST /api/items
// This accepts a new item and adds it to the mock database.
app.post("/api/items", (req, res) => {
    const { title, category, description } = req.body;

    // Validate required fields
    if (!title || !category || !description) {
        return res.status(400).json({
            error: "Title, category, and description are required."
        });
    }

    const newItem = {
        id: items.length + 1,
        title: title,
        category: category,
        description: description
    };

    items.push(newItem);

    res.status(201).json({
        message: "Item added successfully!",
        data: newItem
    });
});

// Fallback route for unknown API routes
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found."
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});