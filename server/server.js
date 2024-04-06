const express = require("express");
const cors = require("cors")
const db = require("./configs/db")

const app = express();
const port = 3000;


app.use(cors({origin: 'http://localhost:5173', credentials: true}));
app.use(express.json());

app.get("/api/user", (req, res) => {
    const query = "SELECT UserID FROM users WHERE emailAddress = ? AND password = ?";
    db.query(query, [req.query.email, req.query.password], (error, results) => {
   
        if(error){
            // console.log(error);
            throw error;
        }
        res.json(results);
    });
})

app.listen(port, () => {
    console.log("Server started on port 3000");
  });