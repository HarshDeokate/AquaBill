import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {Router} from 'express';
import { Login } from '../controller/loginController.js';

const router = express.Router();

router.post('/login', Login);

export default router;

