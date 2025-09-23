import GameModel from '../models/gamemodel.js';
import { mGetUserById } from '../models/usermodel.js';

// Create a new game session
export const createGame = async (req, res) => {
    try {
        const { player1_id, player2_id, game_code, status } = req.body;
        
        // Validate required fields
        if (!player1_id || !game_code) {
            return res.status(400).json({
                message: 'Player 1 ID and game code are required'
            });
        }

        // Create game session
        const game = await GameModel.createGame(player1_id, player2_id, game_code, status);
        
        if (!game) {
            return res.status(500).json({
                message: 'Failed to create game session'
            });
        }

        res.status(201).json(game);
    } catch (error) {
        console.error('Error in createGame controller:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Delete a game session
export const deleteGame = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deleted = await GameModel.deleteGame(id);
        
        if (!deleted) {
            return res.status(404).json({
                message: 'Game session not found'
            });
        }

        res.status(200).json({
            message: 'Game session deleted successfully'
        });
    } catch (error) {
        console.error('Error in deleteGame controller:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Join a game session
export const joinGame = async (req, res) => {
    try {
        const { id } = req.params;
        const { player2_id } = req.body;

        if (!player2_id) {
            return res.status(400).json({
                message: 'Player 2 ID is required'
            });
        }

        const game = await GameModel.joinGame(id, player2_id);

        if (!game) {
            return res.status(404).json({
                message: 'Game session not found or already has player 2'
            });
        }

        res.status(200).json(game);
    } catch (error) {
        console.error('Error in joinGame controller:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get game by code
export const getGameByCode = async (req, res) => {
    try {
        const { code } = req.params;
        
        const game = await GameModel.getGameByCode(code);
        
        if (!game) {
            return res.status(200).json({
                message: 'Game session not found',
                game: null
            });
        }

        res.status(200).json(game);
    } catch (error) {
        console.error('Error in getGameByCode controller:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Update game status
export const updateGameStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                message: 'Status is required'
            });
        }

        const updated = await GameModel.updateGameStatus(id, status);

        if (!updated) {
            return res.status(404).json({
                message: 'Game session not found'
            });
        }

        const game = await GameModel.getGameById(id);
        res.status(200).json(game);
    } catch (error) {
        console.error('Error in updateGameStatus controller:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};  

// Get all question
export const getAllQuestion = async (req, res) => {
    try {
        const questions = await GameModel.getAllQuestion();
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error in getAllQuestion controller:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

