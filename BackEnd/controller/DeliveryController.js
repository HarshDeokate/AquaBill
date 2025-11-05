import deliveryModel from "../models/Delivery.js";


export const getDeliveries = async (req, res) => {
    try {
        const deliveries = await deliveryModel.find();
        res.status(200).json(deliveries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 

export const createDelivery = async (req, res) => {
    try {
        const newDelivery = new deliveryModel(req.body);
        const savedDelivery = await newDelivery.save();
        res.status(201).json(savedDelivery);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};