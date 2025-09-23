import express from 'express';
import { 
    createGame, 
    deleteGame, 
    joinGame, 
    getGameByCode,
    updateGameStatus,
    getAllQuestion
} from '../controllers/game.js';

const router = express.Router();

// Create a new game session
router.post('/', createGame);

// Get game by code (specific route should come before generic :id routes)
router.get('/code/:code', getGameByCode);

// Join a game session
router.put('/:id/join', joinGame);

// Update game status
router.put('/:id/status', updateGameStatus);

// Delete a game session
router.delete('/:id', deleteGame);

// Get question
router.get('/question', getAllQuestion);

export default router; 