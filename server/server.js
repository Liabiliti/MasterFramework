const express = require("express");
const cors = require("cors")
const db = require("./configs/db")


const app = express();
const port = 3000;


app.use(cors({origin: 'http://localhost:5173', credentials: true}));
app.use(express.json());

app.post("/api/user", (req, res) => {
    const query = "SELECT ID FROM admin WHERE `User Name` = ? AND Password = ?";
    console.log(req.body.params.email)
    db.query(query, [req.body.params.email, req.body.params.password], (error, results) => {
        if(error){
            throw error;
        }
        res.json(results);
    });
})

app.listen(port, () => {
    console.log("Server started on port 3000");
  });
  