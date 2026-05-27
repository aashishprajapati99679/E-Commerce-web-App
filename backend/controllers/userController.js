import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// route for userLogin 
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not exists" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: 'Invalid Crenditial' });
        }


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}


// route for userRegister
const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        //   checking user alredy exits or not 
        const exits = await userModel.findOne({ email });
        if (exits) {
            return res.json({ success: false, message: "User alredy exists" })
        }
        // validating email format dd
        if (!validator.isEmail) {
            return res.json({ success: false, message: "invalid emial" })
        }
        // validating password
        if (password.length < 8) {
            return res.json({ success: false, message: "password is too short" })
        }

        // hashing password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //creating new User
        const newUser = new userModel({
            name, email, password: hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id) // id autogenrate by mongodb
        res.json({ success: true, token });



    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

// route for AdminLogin
const adminLogin = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid Crenditial" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

export { loginUser, registerUser, adminLogin }  