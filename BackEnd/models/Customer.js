import mongoose from "mongoose";
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: {type: String, required: true,},
    address: {type: String},
    phone: {type: String, required: true, unique: true,},
    rate: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now}
});

const customerModel = mongoose.models.customer || mongoose.model('user', customerSchema)

export default customerModel;