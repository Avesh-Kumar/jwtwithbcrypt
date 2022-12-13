import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
mongoose.set('strictQuery',false);
mongoose.connect(`mongodb+srv://AveshKumar:${process.env.password}@cluster0.jbyq6le.mongodb.net/authenticationAPI?retryWrites=true&w=majority`, {
  useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected with application;")
})

export default mongoose;