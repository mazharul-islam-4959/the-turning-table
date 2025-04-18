import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://turningtable:turningtable@cluster0.2ykrh1r.mongodb.net/tuning-table').then(()=>console.log("DB connented"));
}