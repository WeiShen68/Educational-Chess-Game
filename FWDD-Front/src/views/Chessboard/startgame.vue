<template>
    <v-row class="ma-0" style="min-height: calc(100dvh - 110px);">
        <v-col cols="12" class="pa-0">
            <v-card variant="outlined" elevation="0" class="withbg pa-4 d-flex justify-center align-center flex-column position-relative" style="height: 100%;">
                <v-btn icon variant="tonal" class="position-absolute bg-lightsecondary text-secondary"
                    style="top: 16px; left: 16px;" @click="handleLeave">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>

                <v-card-text class="w-100 text-center pb-0">
                    <div class="text-h6 mb-4">The Game Code is</div>
                    <v-img v-if="gameCode"
                        :src="`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${gameCode}`" width="150"
                        height="150" class="mx-auto mb-2" />
                    <div class="text-h5 font-weight-bold mb-4">{{ gameCode }}</div>
                    <div class="text-body-2 mb-4">
                        Enter the code above in your mobile browser to join the game.
                    </div>
                </v-card-text>

                <v-card-text class="w-100 py-0">
                    <div class="mb-2">Players joined:</div>
                    <v-list>
                        <v-list-item v-for="player in players" :key="player">
                            <template v-slot:prepend>
                                <v-icon icon="mdi-account" color="primary" />
                            </template>
                            <v-list-item-title>{{ player }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card-text>

                <v-card-actions class="justify-center">
                    <v-btn block color="primary" variant="elevated" width="227" height="55" rounded text="START"
                        @click="startGame" :disabled="players.length < 2" />
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
    <!-- {{ gameId }}
    {{ players }} -->
</template>

<script>
import axios from 'axios';
import { login } from '@/store/login';
import AppStorage from '@/plugins/storage/index.js';

export default {
    data: () => ({
        players: [],
        gameCode: '',
        loginStore: login(),
        userId: null,
        userName: null,
        gameId: null,
        isDeleting: false,
        refreshInterval: null,
        isStartingGame: false
    }),
    async created() {
        // Check both store and localStorage for user data
        if (this.loginStore.getId == null) {
            this.$router.push({ name: 'Login' });
            return;
        }

        // If we have an id, set it and continue
        this.userId = this.loginStore.getId;
        this.userName = this.loginStore.getUsername;
        // Add current user to players array with "(Me)" label
        this.players = [`${this.userName} (Me)`];
        await this.initializeGame();

        // Add event listener for page unload
        window.addEventListener('beforeunload', this.handlePageUnload);

        // Start polling for players
        this.startPolling();
    },
    async beforeUnmount() {
        // Remove event listener
        window.removeEventListener('beforeunload', this.handlePageUnload);

        // Stop polling
        this.stopPolling();

        // Only delete if not already being deleted
        if (this.gameId && !this.isDeleting && !this.isStartingGame) {
            await this.deleteGame();
        }
    },
    async beforeRouteLeave(to, from, next) {
        // Only skip deletion if going to GameBoard after clicking start
        if (to.name === 'GameBoard' && this.isStartingGame) {
            next();
            return;
        }

        if (this.gameId && !this.isDeleting && !this.isStartingGame) {
            await this.deleteGame();
        }
        next();
    },
    async beforeRouteUpdate(to, from, next) {
        // Handle direct navigation
        if (to.name === 'Dashboard' && this.gameId && !this.isDeleting && !this.isStartingGame) {
            await this.deleteGame();
        }
        next();
    },
    methods: {
        handlePageUnload(event) {
            // Handle browser/tab close
            if (this.gameId && !this.isDeleting && !this.isStartingGame) {
                this.deleteGame();
            }
        },
        async initializeGame() {
            try {
                // Generate a new game code
                const generatedCode = this.generateGameCode();

                // Create the game session
                const gameSession = await this.createGame(generatedCode);

                // Validate game session and set data
                if (gameSession && gameSession.id) {
                    this.gameCode = gameSession.game_code;
                    this.gameId = gameSession.id;
                    console.log('Game initialized with ID:', this.gameId);
                } else {
                    throw new Error('Failed to initialize game: Invalid game session data');
                }
            } catch (error) {
                console.error('Failed to initialize game:', error);
                this.warningMsg('Error!', error.response?.data?.message || error.message);
            }
        },
        startGame() {
            console.log('Starting game...')
            this.isStartingGame = true;
            this.updateGameStatus('started');
        },
        generateGameCode() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let code = '';
            for (let i = 0; i < 5; i++) {
                code += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return code;
        },
        async handleLeave() {
            if (this.gameId && !this.isDeleting && !this.isStartingGame) {
                await this.deleteGame();
            }
            this.$router.push({ name: 'Dashboard' });
        },
        async deleteGame() {
            if (this.isDeleting) return; // Prevent multiple delete requests

            try {
                this.isDeleting = true;
                await axios.delete(`http://localhost:5000/games/${this.gameId}`);
                console.log('Game deleted successfully');
                this.gameId = null; // Clear the game ID after successful deletion
            } catch (error) {
                console.error('Error deleting game:', error);
                this.warningMsg('Error!', error.response?.data?.message || error.message);
            } finally {
                this.isDeleting = false;
            }
        },
        async createGame(code) {
            try {
                const response = await axios.post('http://localhost:5000/games', {
                    player1_id: this.userId,
                    player2_id: null,
                    game_code: code,
                    status: 'waiting'
                });

                // Validate that we received a proper response with game ID
                if (!response.data || !response.data.id) {
                    throw new Error('Invalid response: No game ID received');
                }

                console.log('Game session created:', response.data);
                return {
                    id: response.data.id,
                    game_code: response.data.game_code,
                    player1_id: response.data.player1_id,
                    player2_id: response.data.player2_id,
                    status: response.data.status
                };
            } catch (error) {
                console.error('Error creating game:', error);
                this.warningMsg('Error!', error.response?.data?.message || error.message);
                throw error;
            }
        },
        startPolling() {
            // Poll every 10 seconds
            this.refreshInterval = setInterval(this.refreshPlayers, 10000);
        },
        stopPolling() {
            if (this.refreshInterval) {
                clearInterval(this.refreshInterval);
                this.refreshInterval = null;
            }
        },
        async refreshPlayers() {
            if (!this.gameId) return;

            try {
                const response = await axios.get(`http://localhost:5000/games/code/${this.gameCode}`);
                const game = response.data;

                if (!game) {
                    console.log('Game not found');
                    this.stopPolling();
                    this.$router.push({ name: 'Dashboard' });
                    return;
                }

                console.log('Game data:', game);

                // Update players list
                this.players = [`${game.player1_username} (Me)`];

                // If there's a second player, add them to the list
                if (game.player2_id && game.player2_username) {
                    this.players.push(game.player2_username);
                }

            } catch (error) {
                console.error('Error refreshing players:', error);
                // Stop polling and redirect to dashboard on any error
                this.stopPolling();
                this.$router.push({ name: 'Dashboard' });
            }
        },
        async updateGameStatus(status) {
            this.stopPolling();
            try {
                const response = await axios.put(`http://localhost:5000/games/${this.gameId}/status`, {
                    status: status
                });
                console.log('Game status updated:', response.data);
                // Store game data in session storage
                sessionStorage.setItem('gameData', JSON.stringify(response.data));
                const params = {
                    game_session_id: this.gameId,
                    player_id: this.userId
                }
                this.createGameScore(params);
                this.$router.push({
                    name: 'GameBoard',
                    params: {
                        game_code: response.data.game_code,
                    }
                });
            } catch (error) {
                console.error('Error updating game status:', error);
            }
        },
        async createGameScore(params) {
            try {
                const response = await axios.post('http://localhost:5000/game_scores', params);
                console.log('Game score created:', response.data);
            } catch (error) {
                console.error('Error creating game score:', error);
            }
        }
    }
}
</script>

<style scoped>
.v-card {
    border-radius: 12px;
}

.position-absolute {
    position: absolute !important;
}
</style>