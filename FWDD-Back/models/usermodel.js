import db from "../config/database.js";

export const mGetAllUsers = async () => {
    try {
        const [results] = await db.execute("SELECT * FROM users");
        return results;
    } catch (error) {
        console.error('Error in mGetAllUsers:', error);
        throw error;
    }
};

export const mGetUserById = async (id) => {
    try {
        const [results] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
        return results.length > 0 ? results[0] : null;
    } catch (error) {
        console.error('Error in mGetUserById:', error);
        throw error;
    }
};

export const mCreateUser = async (data) => {
    try {
        const [result] = await db.execute("INSERT INTO users SET ?", [data]);
        return result;
    } catch (error) {
        console.error('Error in mCreateUser:', error);
        throw error;
    }
};

export const mUpdateUser = async (data, id) => {
    try {
        const [result] = await db.execute("UPDATE users SET user_name = ? WHERE id = ?", [data.user_name, id]);
        return result;
    } catch (error) {
        console.error('Error in mUpdateUser:', error);
        throw error;
    }
};

export const mDeleteUser = async (id) => {
    try {
        const [result] = await db.execute("DELETE FROM users WHERE id = ?", [id]);
        return result;
    } catch (error) {
        console.error('Error in mDeleteUser:', error);
        throw error;
    }
};
