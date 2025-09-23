import db from '../config/database.js';

class GameModel {
    static async createGame(player1_id, player2_id, game_code, status) {
        try {
            const [result] = await db.execute(
                'INSERT INTO game_sessions (player1_id, player2_id, game_code, status) VALUES (?, ?, ?, ?)',
                [player1_id, player2_id || null, game_code, status || 'waiting']
            );
            
            if (result.insertId) {
                const [game] = await db.execute(
                    'SELECT * FROM game_sessions WHERE id = ?',
                    [result.insertId]
                );
                return game[0];
            }
            return null;
        } catch (error) {
            console.error('Error in createGame:', error);
            throw error;
        }
    }

    static async deleteGame(gameId) {
        try {
            const [result] = await db.execute(
                'DELETE FROM game_sessions WHERE id = ?',
                [gameId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error in deleteGame:', error);
            throw error;
        }
    }

    static async getGameById(gameId) {
        try {
            const [game] = await db.execute(`
                SELECT 
                    g.*,
                    p1.user_name as player1_username,
                    p2.user_name as player2_username
                FROM game_sessions g
                LEFT JOIN users p1 ON g.player1_id = p1.id
                LEFT JOIN users p2 ON g.player2_id = p2.id
                WHERE g.id = ?
            `, [gameId]);
            return game[0] || null;
        } catch (error) {
            console.error('Error in getGameById:', error);
            throw error;
        }
    }

    static async updateGameStatus(gameId, status) {
        try {
            const [result] = await db.execute(
                'UPDATE game_sessions SET status = ? WHERE id = ?',
                [status, gameId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error in updateGameStatus:', error);
            throw error;
        }
    }

    static async joinGame(gameId, player2_id) {
        try {
            const [result] = await db.execute(
                'UPDATE game_sessions SET player2_id = ?, status = "ready" WHERE id = ? AND player2_id IS NULL',
                [player2_id, gameId]
            );
            
            if (result.affectedRows > 0) {
                const [game] = await db.execute(
                    'SELECT * FROM game_sessions WHERE id = ?',
                    [gameId]
                );
                return game[0];
            }
            return null;
        } catch (error) {
            console.error('Error in joinGame:', error);
            throw error;
        }
    }

    static async getGameByCode(gameCode) {
        try {
            const [game] = await db.execute(`
                SELECT 
                    g.*,
                    p1.user_name as player1_username,
                    p2.user_name as player2_username
                FROM game_sessions g
                LEFT JOIN users p1 ON g.player1_id = p1.id
                LEFT JOIN users p2 ON g.player2_id = p2.id
                WHERE g.game_code = ?
            `, [gameCode]);
            return game[0] || null;
        } catch (error) {
            console.error('Error in getGameByCode:', error);
            throw error;
        }
    }

    static async getAllQuestion() {
        try {
            const [result] = await db.execute('SELECT * FROM question');
            return result;
        } catch (error) {
            console.error('Error in getAllQuestion:', error);
            throw error;
        }
    }
}

export default GameModel;
