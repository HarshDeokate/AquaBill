import customerModel from "../models/Customer.js";

export const createCustomer = async (req, res) => {
    try {
        const newCustomer = new customerModel(req.body);
        const savedCustomer = await newCustomer.save();
        res.status(201).json(savedCustomer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};


export const getCustomers = async (req, res) => {
    try {
        const customers = await customerModel.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 