import express from 'express';
import { createGameScore, getGameStatusWithScores, updateGameScore } from '../controllers/gamescore.js';

const router = express.Router();

router.post('/', createGameScore);
router.get('/:game_session_id', getGameStatusWithScores);
router.post('/update', updateGameScore);

export default router;
