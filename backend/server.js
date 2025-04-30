import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import chatbotRoute from "./routes/chatbotRoute.js";   // 👈  this line here chatbot


const app = express();
const port = 4000;

// Middleware
app.use(express.json());   // All JSON content passes through here
app.use(cors());           // Allows access from any frontend
app.use("/images", express.static("uploads"));


// Serve static files for uploads
app.use('/uploads', express.static('uploads'));

// DB connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("image",express.static("uploads"))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/chat", chatbotRoute);  // 👈 this line here chatbot


app.get("/", (req, res) => {         
    res.send("Api Working")   
});

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});



//mongodb+srv://turningtable:turningtable@cluster0.2ykrh1r.mongodb.net/?