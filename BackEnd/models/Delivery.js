import mongoose from "mongoose";
const Schema = mongoose.Schema;

const deliverySchema = new Schema({
    customerId: {type: Schema.Types.ObjectId, ref: 'customer', required: true,},
    deliveryDate: {type: Date, required: true},   

});

const deliveryModel = mongoose.models.delivery || mongoose.model('delivery', deliverySchema)

export default deliveryModel
