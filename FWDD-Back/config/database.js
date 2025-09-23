import mysql from "mysql2/promise";

// Create a connection pool instead of a single connection
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "chessboard",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Database connection successful');
        connection.release();
    } catch (error) {
        console.error('Database connection failed:', error);
        // Don't exit the process, just log the error
        // The application will try to reconnect on the next query
    }
};

// Test the connection when the module is loaded
testConnection();

export default pool;