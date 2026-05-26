import express from 'express'

import { addToCart, updateCart, getUserCart } from '../controllers/cartController.js'
import authUser from '../middleware/Auth.js'
const cartRouter = express.Router()

//for user get cart function 
cartRouter.post('/get', authUser, getUserCart);
// for user add to cart function
cartRouter.post('/add', authUser, addToCart);
// for user update cart function
cartRouter.post('/update', authUser, updateCart);

export default cartRouter