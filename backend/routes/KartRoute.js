import express from 'express'

import { addToKart, updateKart, getKart } from '../controllers/KartController.js'
import authUser from '../middleware/Auth.js';

const kartRouter = express.Router()

kartRouter.post('/get',authUser, getKart);
kartRouter.post('/add',authUser, addToKart);
kartRouter.post('/update',authUser, updateKart);

export default kartRouter;