// const express = require("express");
// const cors = require("cors")
// const db = require("./configs/db")

const express = require("express");
const session = require('express-session');
const cors = require("cors");
const db = require("./configs/db")
// const passport = require("./configs/passport-config"); // Adjust the path as necessary


const app = express();
const port = 3000;


app.use(cors({origin: 'http://localhost:5173', credentials: true}));
app.use(express.json());

// app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));
// app.use(passport.initialize());
// app.use(passport.session());

app.post("/api/user", (req, res) => {
    const query = "SELECT ID FROM admin WHERE `User Name` = ? AND Password = ?";
    db.query(query, [req.body.params.email, req.body.params.password], (error, results) => {
        if(error){
            throw error;
        }
        res.json(results);
    });
    // res.json({ user: req.user });
})

app.listen(port, () => {
    console.log("Server started on port 3000");
  });
  