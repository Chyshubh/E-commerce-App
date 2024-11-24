import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productroute.js';
import kartRouter from './routes/KartRoute.js';
import orderRouter from './routes/orderRoute.js';

// Initialize the app
const app = express();
connectDb();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/kart', kartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
  res.send('API Working');
});

// Export the app to be used by Vercel
export default app;
