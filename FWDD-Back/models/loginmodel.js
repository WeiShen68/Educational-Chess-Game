import db from "../config/database.js";

export const mLoginUser = async (username) => {
    try {
        const [results] = await db.execute("SELECT * FROM users WHERE user_name = ?", [username]);
        return results.length > 0 ? results[0] : null;
    } catch (error) {
        console.error('Error in mLoginUser:', error);
        throw error;
    }
};

export const mCreateUser = async (userData) => {
    try {
        const [result] = await db.execute(
            "INSERT INTO users (user_name, user_email, user_password) VALUES (?, ?, ?)",
            [userData.user_name, userData.user_email, userData.user_password]
        );
        return result;
    } catch (error) {
        console.error('Error in mCreateUser:', error);  
        throw error;
    }
};



