/* This API Gateway was developed with the code from this website: 
https://www.freecodecamp.org/news/build-a-custom-api-gateway-with-node-js/
For future developers if this does not make sense, refer to the article above */

const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
// Import Express
const express = require("express");
const app = express();

const corsOptions = {
    origin: ['http://localhost:3001', 'http://localhost:5173'],
    credentials: true,
}

app.use(cors(corsOptions));
app.use(helmet()); //Adds security headers
app.use(morgan("combined")); // Log HTTP Requests
app.disable("x-powered-by"); //Hides the details of the express server

const services = [
    {
        route: "/auth",
        target: "http://localhost:3001"
    }
]


// Rate Limit Constants
const rateLimit = 20; //Max requests per minute
const interval = 60 * 1000; // Time window in milliseconds

//Object to store request counts for each IP address
const requestCounts = {};

// Reset request count for each IP address every single "interval" milliseconds
setInterval(() => {
    Object.keys(requestCounts).forEach((ip) => {
        requestCounts[ip] = 0;
    })
}, interval);

//Middleware function for rate limiting and timeout handling
function rateLimitAndTimeout(req, res, next) {
    const ip = req.ip; //Get the client IP address
    // Update request count for the current IP
    requestCounts[ip] = (requestCounts[ip] || 0) + 1;

    // Check if request count doesn't exceed the rate limit
    if(requestCounts[ip] > rateLimit) {
        // Respond with a 429 Too Many Request status code
        return res.status(429).json({
            code: 429,
            status: "Error",
            message: "Rate limit exceeded.",
            data: null,
        });
    }

    // Set timeout for each request (example: 10 seconds)
    req.setTimeout(15000, () => {
        //Handle timeout error
        res.status(504).json({
            code: 504,
            status: "Error",
            message: "Gateway timeout.",
            data: null,
        });
        req.abort(); //Abort the request
    });

    next(); //Continue to the middleware.
}

app.use(rateLimitAndTimeout);

services.forEach(({route, target}) => {
    // Proxy options
    const proxyOptions = {
        target, 
        changeOrigin: true,
        pathRewrite: {
            [`^${route}`]: "",
        },
    };
    // Apply rate limiting and timeout middleware before proxying
    app.use(route, rateLimitAndTimeout, createProxyMiddleware(proxyOptions));
});

// Handler for route-not-found
app.use((_req, res) => {
    res.status(404).json({
      code: 404,
      status: "Error",
      message: "Route not found.",
      data: null,
    });
   });

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server started on port 3000");
});
