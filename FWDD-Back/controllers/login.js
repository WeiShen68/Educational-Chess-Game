import { mLoginUser, mCreateUser } from "../models/loginmodel.js";

import bcrypt from "bcrypt";

export const loginUser = async (req, res) => {
    try {
        const { username, pwd } = req.body;

        if (!username || !pwd) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const user = await mLoginUser(username);

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare passwords
        const match = await bcrypt.compare(pwd, user.user_password);
        
        if (!match) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

export const registerUser = async (req, res) => {
    try {
        const { user_name, user_email, user_password } = req.body;
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user_password, salt);

        // Create user object with hashed password
        const userData = {
            user_name: user_name,
            user_email: user_email, 
            user_password: hashedPassword
        };

        // Save user to database
        const result = await mCreateUser(userData);
        
        res.status(201).json({ message: "User registered successfully", user: result });

    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
}
