import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';
import gameRoutes from './routes/game.js';
import userRoutes from './routes/user.js';
import gameScoreRoutes from './routes/gamescore.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/', routes);
app.use('/games', gameRoutes);
app.use('/users', userRoutes);
app.use('/game_scores', gameScoreRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error details:', {
        message: err.message,
        stack: err.stack,
        name: err.name,
        code: err.code
    });
    
    // Log the request details
    console.error('Request details:', {
        method: req.method,
        url: req.url,
        body: req.body,
        params: req.params,
        query: req.query
    });
    
    res.status(500).json({
        message: 'Internal server error',
        error: err.message,
        code: err.code || 'UNKNOWN_ERROR'
    });
});

const PORT = process.env.PORT || 5000;
console.log('Port: ', process.env.PORT)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});