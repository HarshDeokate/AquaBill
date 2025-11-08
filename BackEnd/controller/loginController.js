import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config(); 
export const Login = async(req,res) =>{
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(400).json({message: "Username and password are required"});
    }

    if(username === process.env.USER_NAME && password === process.env.PASSWORD){
        const payload = { username: username };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
        return res.status(200).json({message: "Login successful", token: token });
    }

    return res.status(401).json({message: "Invalid username or password"});
};




