import db from '../config/database.js';

class GameScore {
    static async create(game_session_id, player_id) {
        const [result] = await db.execute(
            'INSERT INTO game_scores (game_session_id, player_id, score, attempts) VALUES (?, ?, 0, 0)',
            [game_session_id, player_id]
        );

        return result;
    }

    static async getGameStatusWithScores(game_session_id) {
        const [result] = await db.execute(
            `SELECT 
            gs1.player_id AS player1_id,
            gs1.score AS player1_score,
            gs1.attempts AS player1_attempts,
            gs2.player_id AS player2_id,
            gs2.score AS player2_score,
            gs2.attempts AS player2_attempts,
            g.status
        FROM game_sessions g
        JOIN game_scores gs1 ON gs1.player_id = g.player1_id AND gs1.game_session_id = g.id
        JOIN game_scores gs2 ON gs2.player_id = g.player2_id AND gs2.game_session_id = g.id
        WHERE g.id = ?`,
            [game_session_id]
        );

        return result[0];
    }

    static async updateGameScore(game_session_id, player_id, scoreIncrement, attemptIncrement) {
        const [result] = await db.execute(
            `UPDATE game_scores 
             SET score = score + ?, 
                 attempts = attempts + ? 
             WHERE game_session_id = ? 
               AND player_id = ?`,
            [scoreIncrement, attemptIncrement, game_session_id, player_id]
        );
    
        return result;
    }
    
}

export default GameScore;


