import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";

const app = express();
const port = 4000;

// Middleware
app.use(express.json());   // All JSON content passes through here
app.use(cors());           // Allows access from any frontend

// Serve static files for uploads
app.use('/uploads', express.static('uploads'));

// DB connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("image",express.static("uploads"))

app.get("/", (req, res) => {         
    res.send("Api Working");   
});

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});


//mongodb+srv://turningtable:turningtable@cluster0.2ykrh1r.mongodb.net/?