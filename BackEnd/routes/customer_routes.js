import {Router} from 'express';
import Customer from '../models/Customer.js'; // your Mongoose model
import { createCustomer, getCustomers } from '../controller/CustomerController.js';
import { get } from 'mongoose';

const router = Router();

router.get('/get',getCustomers);
router.post('/create', createCustomer);
export default router;