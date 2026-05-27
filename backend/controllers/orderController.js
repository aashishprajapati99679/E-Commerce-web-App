import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";



// placing order using COD method 

const placeOrder = async (req, res) => {
    try {

        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        //save order in database
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // remove all cart data
        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: 'Order Placed Successfully' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Failed to place order' })
    }

}

// placing order using Stripe method 
// Not in use currently (planned for future)
// const placeOrderStripe = async (req, res) => {
//     try {



//     } catch (error) {

//     }

// }



// placing order using Razorpay method 
// Not in use currently (planned for future)
// const placeOrderRazorpay = async (req, res) => {
//     try {

//     } catch (error) {

//     }

// }

// All data for Admin panel 

const allOrders = async (req, res) => {
    try {

        const orders = await orderModel.find({});
        res.json({ success: true, orders });

    } catch (error) {

        console.log(error);
        res.json({ success: false, message: "Something went wrong in all orders fetching in Admin" });

    }

}

// user sefice order particular

const userOrders = async (req, res) => {
    try {

        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });

    } catch (error) {

        console.log(error);
        res.json({ success: false, message: "Something went wrong in user orders fetching" });

    }

}


// Update Status by admin
const updateStatus = async (req, res) => {

    try {

        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: "Status Updated" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something went wrong in update status" });
    }

}

export { placeOrder, allOrders, userOrders, updateStatus };