const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");

// Create an instance of Express App
const app = express();

// Middleware setup
app.use(cors()); // Enables cors for routing
app.use(helmet()); // Adds security headers
app.use(morgan("combined")); //Log HTTP requests
app.disable("x-powered-by"); // Hides Express Server information

//Define routes and corresponding microservices
const services = [
    {
        route: "/auth",
        target: "https://localhost:3001/auth"
    }
]