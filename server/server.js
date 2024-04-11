
// Import Express
const express = require("express");
const app = express();

// Import main Passport and Express-Session libraries
const passport = require("passport")
const session = require('express-session');

// Import the secondary "Strategy" library
const LocalStrategy = require("passport-local").Strategy;

// Import Database for querying
const db = require("./configs/db")

// Initialise the Middleware
// This is the basic express session({...}) for inisitalisation
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}))

// Initialise the passport on every use
app.use(passport.initialize());

// Enables Express's Session management
app.use(passport.session());




const authUser = (username, password, done) => {
    const query = "SELECT ID FROM admin WHERE `User Name` = ? AND Password = ?";
    db.query(query, [username, password], (error, results) => {
        if (error) {
            throw error;
        }
        // console.log("Made it to there")
        if (results.length > 0) {
            console.log("Made it to there")
            let { ID } = results[0];
            return done(null, ID)
        }
        console.log("Unsuccessful")
        return (null, false)
    });
   
}

// The authUser function will contain the steps required to authenticate a user
passport.use(new LocalStrategy(authUser));

passport.serializeUser((userID, done) => {
    console.log(" ------> Serialise")
    done(null, userID)
})

passport.deserializeUser((userID, done) => {
    console.log(" ------> Deserialise")
    done(null, {ID: userID} )
})

const cors = require("cors");

//const app = express();
const port = 3000;


app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.post("/api/login", passport.authenticate("local"), (req,res) => {
    let userClearance = req.user;
    console.log(req.isAuthenticated())
    res.json({ message : "RETAIL"})
})  

app.post("/api/logout", (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        console.log(req.isAuthenticated())
        res.json({ message: "Logged out successfully" });
    });
})

app.listen(port, () => {
    console.log("Server started on port 3000");
});
