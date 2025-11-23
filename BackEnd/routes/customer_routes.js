import {Router} from 'express';
import Customer from '../models/Customer.js'; // your Mongoose model
import { createCustomer, getCustomers } from '../controller/CustomerController.js';
import { get } from 'mongoose';

const customerRoutes = Router();

customerRoutes.get('/get',getCustomers);
customerRoutes.post('/create', createCustomer);
export default customerRoutes;