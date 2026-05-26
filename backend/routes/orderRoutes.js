import express from "express";

import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus } from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// Admin feature only for Admin Panel 
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

//Payment router
orderRouter.post('/place', authUser, placeOrder)

//current not in uuse (plaind For Future Payment Gateway)

// orderRouter.post('/stripe', authUser, placeOrderStripe)
// orderRouter.post('/razorpay', authUser, placeOrderRazorpay)


// User feature only for User Panel
orderRouter.post('/userorders', authUser, userOrders)







export default orderRouter
