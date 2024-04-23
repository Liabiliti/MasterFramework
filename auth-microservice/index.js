// Setup Express
const express = require("express");
const app = express();
// Import main Passport and Express-Session libraries
const passport = require("passport")
const session = require('express-session');

// Import the secondary "Strategy" library
const LocalStrategy = require("passport-local").Strategy;

// Import Database for querying
const db = require("./configs/db")

// JSON Web Token
const jwt = require("jsonwebtoken")

// Hashing algorithm
const argon2 = require("argon2");
const crypto = require('crypto');

const hashingConfig = {
    type: argon2.argon2id,
    memoryCost: 20000,
    timeCost: 2, // 2 iterations
    parallelism: 1, // 1 degree of parallelism
    saltLength: 16, // Length of the salt
};

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

async function hashPassword(password) {
    const salt = crypto.randomBytes(hashingConfig.saltLength);
    // console.log("\n", salt);
    try {
        const hash = await argon2.hash(password, {
            ...hashingConfig,
            salt: salt,
        });
        console.log("Hashed password:", typeof(hash));
        return hash;
    } catch (err) {
        console.error("Error hashing password:", err);
    }
}

async function verifyPassword(hash, password) {
    try {
        if (await argon2.verify(hash, password)) {
            console.log("Password is correct.");
            return true;
        } else {
            console.log("Password is incorrect.");
            return false;
        }
    } catch (err) {
        console.error(err);
    }
}

const authUser = async (username, password, done) => {
    try {
        // console.log(hash);
        const query = "SELECT ID, Password FROM admin WHERE `User Name` = ?";

        const results = await new Promise((resolve, reject) => {
            db.query(query, [username], (error, results) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(results);
                }
            });
        });

        if (results.length > 0) {
            // const userPassword = await hashPassword(results[0].Password)
            const isPasswordCorrect = await verifyPassword(results[0].Password, password);
            if (isPasswordCorrect) {
                const token = jwt.sign({ id: results[0], username: username }, "your_secret_key", { expiresIn: "1h" });
                console.log("Made it to there")
                return done(null, { id: results[0], token: token })
            }
        }
        console.log("Unsuccessful")
        return done(null, false)

    }
    catch (err) {
        console.log("Error in authenticating user: ", err)
        return done(err);
    }
}

// The authUser function will contain the steps required to authenticate a user
passport.use(new LocalStrategy(authUser));

passport.serializeUser((userID, done) => {
    console.log(" ------> Serialise")
    done(null, userID)
})

passport.deserializeUser((userID, done) => {
    console.log(" ------> Deserialise")
    done(null, { ID: userID })
})

const cors = require("cors");

//const app = express();
const port = 3001;

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173'], credentials: true }));
app.use(express.json());

app.post("/login", passport.authenticate("local"), (req, res) => {
    // let userClearance = req.user;
    res.cookie("token", req.user.token, { httpOnly: true, maxAge: 3600000 })
    // res.json({message: req.user.token})
})


app.get("/example", (req, res) => {
    console.log("Made it to here");
    res.json("example")
    return null;
})

app.get("/", (req, res) => {
    console.log("Main Page");
    res.json("lol")
    return null
})



app.post("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        console.log(req.isAuthenticated())
        res.json({ message: "Logged out successfully" });
    });
})

app.listen(port, () => {
    console.log("Server started on port 3001");
});