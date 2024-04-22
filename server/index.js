const express =require("express");
const app =express();
const userRouter = require("./routes/User");
const patientsRouter = require("./routes/Patients");
const database =require("./config/database");
const cookieParser =require("cookie-parser");
const cors =require("cors");
const dotenv = require("dotenv");

dotenv.config();

const PORT =process.env.PORT || 5000;

database.connect();
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"*",
        credentials:true,
    })
)
app.use("/api/v1/auth",userRouter);
app.use("/api/v1/patients",patientsRouter);
app.get("/",(req,res) =>{
    return res.json({
        success:true,
        message:"your server is running at port no.."
    })
})

app.listen(PORT, () =>{
    console.log(`app is running at port no ${PORT}`)
})
