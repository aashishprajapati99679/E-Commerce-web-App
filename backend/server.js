import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudnary.js";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoutes.js";

//app config

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//miiddleWares

app.use(express.json());
app.use(cors());


// api end point 
// for user login register annd all
app.use('/api/user', userRouter);
// for product add list and remove 
app.use('/api/product', productRouter);
// for cart function
app.use('/api/cart', cartRouter);
//for order function
app.use('/api/order', orderRouter);




app.get("/", (req, res) => {
    res.send("API WORKING BUDDY");
});



app.listen(port, () => {
    console.log(`Server is Running on http://localhost:${port}`);
})

export default app;