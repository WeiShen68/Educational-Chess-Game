import GameScore from '../models/gamescoremodel.js';

export const createGameScore = async (req, res) => {
    try {
        const { game_session_id, player_id } = req.body;
        const gameScore = await GameScore.create(game_session_id, player_id);
        res.status(201).json(gameScore);    
    } catch (error) {
        console.error('Error in createGameScore controller:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const getGameStatusWithScores = async (req, res) => {
    try {
        const { game_session_id } = req.params;
        const gameStatus = await GameScore.getGameStatusWithScores(game_session_id);
        res.status(200).json(gameStatus);
    } catch (error) {
        console.error('Error in getGameStatusWithScores controller:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const updateGameScore = async (req, res) => {
    try {
        const { game_session_id, player_id, score, attempts } = req.body;
        const updatedScore = await GameScore.updateGameScore(game_session_id, player_id, score, attempts);
        res.status(200).json(updatedScore);
    } catch (error) {   
        console.error('Error in updateGameScore controller:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};




