import express from 'express'
import {verifyStripe, palceOrderCOD, palceOrderStripe, palceOrdeRazorpay, AllOrders, userOrders, updateStatus} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import Auth from '../middleware/Auth.js'

const orderRouter = express.Router();

//Admin Features
orderRouter.post('/list',adminAuth, AllOrders);
orderRouter.post('/status',adminAuth, updateStatus);

//Payment Features
orderRouter.post('/place',Auth, palceOrderCOD);
orderRouter.post('/stripe',Auth, palceOrderStripe);
orderRouter.post('/razorpay',Auth, palceOrdeRazorpay);

//User Features
orderRouter.post('/userorders',Auth, userOrders);

//verify payment
orderRouter.post('/verifyStripe',Auth, verifyStripe);

export default orderRouter;