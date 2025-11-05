import express from 'express'
// const mongoose = require('mongoose');
import connectDB from './config/db.js';
import deliveryRoutes from "./routes/deliveries.js";
import customerRoutes from "./routes/customer_routes.js";
import login from "./routes/login.js";
import cors from 'cors';




const app = express()
const port = process.env.PORT || 5000;



connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/deliveries", deliveryRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/auth", login);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
