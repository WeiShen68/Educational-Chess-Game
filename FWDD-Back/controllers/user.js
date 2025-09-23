import { mGetAllUsers, mGetUserById, mCreateUser, mUpdateUser, mDeleteUser } from "../models/usermodel.js";

export const showAllUsers = (req, res) => {
    mGetAllUsers((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

export const getUserById = (req, res) => {
    // Extract the ID from the request parameters
    const id = req.params.id;
    
    // Pass the ID to the model function
    mGetUserById(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            // Handle case where no user is found
            if (results.length === 0) {
                res.status(404).json({
                    message: "User not found"
                });
            } else {
                res.json(results[0]);
            }
        }
    });
}

export const createUser = (req, res) => {
    const data = req.body;
    mCreateUser(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

export const updateUser = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    mUpdateUser(data, id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

export const deleteUser = (req, res) => {
    const id = req.params.id;
    mDeleteUser(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Register a new user
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a user data object
        const userData = {
            user_name: username,
            email: email,
            user_password: password // Note: In a real app, you should hash the password
        };

        // Use the callback-based function with a Promise wrapper
        const user = await new Promise((resolve, reject) => {
            mCreateUser(userData, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user.insertId,
                username: username,
                email: email
            }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Use the callback-based function with a Promise wrapper
        const user = await new Promise((resolve, reject) => {
            mGetUserById(email, (err, results) => {
                if (err) reject(err);
                else resolve(results && results.length > 0 ? results[0] : null);
            });
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // In a real app, you should compare the hashed password
        if (user.user_password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Set user session
        req.session.userId = user.id;
        
        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.user_name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

// Logout user
export const logout = async (req, res) => {
    try {
        req.session.destroy();
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Error logging out', error: error.message });
    }
};

// Get user profile
export const getProfile = async (req, res) => {
    try {
        const userId = req.session.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        // Use the callback-based function with a Promise wrapper
        const user = await new Promise((resolve, reject) => {
            mGetUserById(userId, (err, results) => {
                if (err) reject(err);
                else resolve(results && results.length > 0 ? results[0] : null);
            });
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            user: {
                id: user.id,
                username: user.user_name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Error getting profile', error: error.message });
    }
};

// Update user profile
export const updateProfile = async (req, res) => {
    try {
        const userId = req.session.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        const { username, email } = req.body;
        
        // Create a user data object
        const userData = {
            user_name: username
        };

        // Use the callback-based function with a Promise wrapper
        const result = await new Promise((resolve, reject) => {
            mUpdateUser(userData, userId, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        // Get the updated user
        const user = await new Promise((resolve, reject) => {
            mGetUserById(userId, (err, results) => {
                if (err) reject(err);
                else resolve(results && results.length > 0 ? results[0] : null);
            });
        });
        
        res.json({
            message: 'Profile updated successfully',
            user: {
                id: user.id,
                username: user.user_name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};