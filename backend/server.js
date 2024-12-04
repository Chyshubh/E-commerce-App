import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import kartRouter from './routes/KartRoute.js';
import orderRouter from './routes/orderRoute.js';

//App Config
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;
connectDb();
connectCloudinary();


const allowedOrigins = ['https://forever-app-shubham.vercel.app'];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));


//middlewares
app.use(express.json());
app.use(cors(corsOptions));

//api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/kart', kartRouter);
app.use('/api/order', orderRouter);

app.get('/',(req, res)=>{
 res.send('API Working');
})

app.listen(port,()=>console.log(`Server started at PORT: ${port}`))
