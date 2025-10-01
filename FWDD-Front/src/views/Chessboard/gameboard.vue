<template>
    <v-row class="ma-0" style="min-height: calc(100dvh - 110px);">
        <v-col cols="12" class="pa-0">
            <v-card variant="outlined" elevation="0" class="withbg pa-4 d-flex align-center flex-column position-relative" style="height: 100%;">
                <!-- Header Section -->
                <div class="w-100 text-left px-4">
                    <div class="text-h3 mb-1">Game Board</div>
                    <div class="text-h3 text-center mb-4">Hello, {{ loginStore.getUsername }}! 👋</div>
                    <div :class="xs ? 'text-body-2 font-weight-medium' : 'text-body-1 font-weight-medium'">Game Code: {{
                        gameCode }}</div>
                    <div :class="xs ? 'text-body-2 font-weight-medium' : 'text-body-1 font-weight-medium'">Opponent: {{
                        opponent }}</div>
                </div>

                <!-- Players and Timer Section -->
                <div class="players-section w-100">
                    <div class="d-flex align-center justify-space-between flex-wrap">
                        <!-- Player 1 -->
                        <div class="player-card text-center">
                            <v-avatar :size="$vuetify.display.xs ? '100' : '140'" class="mb-3" color="grey-lighten-2">
                                <v-icon :size="$vuetify.display.xs ? '60' : '90'">mdi-chess-pawn</v-icon>
                            </v-avatar>
                            <div class="text-h6 mb-2">{{ gameData?.player1_username || 'Player 1' }}</div>
                            <div class="points-display">
                                <v-chip color="amber-darken-2" size="large">
                                    <span class="text-h6">{{ player1Points }}</span>
                                </v-chip>
                            </div>
                            <div class="points-display">
                                <v-chip color="green" size="large">
                                    <span class="text-h6">{{ player1Move }}</span>
                                </v-chip>
                            </div>
                        </div>

                        <!-- Timer and Points -->
                        <div class="timer-container text-center">
                            <v-avatar :size="$vuetify.display.xs ? '60' : '80'" color="green" class="mb-2">
                                <v-icon :size="$vuetify.display.xs ? '30' : '40'"
                                    color="white">mdi-timer-outline</v-icon>
                            </v-avatar><br><br><br>
                            <div
                                :class="xs ? 'points-total pt-1 text-h5 font-weight-bold text-amber-darken-2' : 'points-total pt-4 text-h4 font-weight-bold text-amber-darken-2'">
                                Score
                            </div><br>
                            <div
                                :class="xs ? 'text-h5 font-weight-bold mt-1 text-green-accent-4' : 'text-h4 font-weight-bold mt-0 text-green-accent-4'">
                                Attempts
                            </div>
                        </div>


                        <!-- Player 2 -->
                        <div class="player-card text-center">
                            <v-avatar :size="$vuetify.display.xs ? '100' : '140'" class="mb-3" color="grey-lighten-2">
                                <v-icon :size="$vuetify.display.xs ? '60' : '90'">mdi-chess-pawn</v-icon>
                            </v-avatar>
                            <div class="text-h6 mb-2">{{ gameData?.player2_username || 'Player 2' }}</div>
                            <div class="points-display">
                                <v-chip color="amber-darken-2" size="large">
                                    <span class="text-h6">{{ player2Points }}</span>
                                </v-chip>
                            </div>
                            <div class="points-display">
                                <v-chip color="green" size="large">
                                    <span class="text-h6">{{ player2Move }}</span>
                                </v-chip>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="action-buttons w-100 mt-auto">
                    <v-btn :disabled="isMoving" block class="mb-3" color="primary" height="48" rounded="lg"
                        @click="openDialog()">
                        MOVE
                    </v-btn>
                    <v-btn block color="error" height="48" rounded="lg" @click="endGame">
                        END GAME
                    </v-btn>
                </div>
            </v-card>
        </v-col>
    </v-row>
    <v-dialog v-model="dialog" scrollable width="720">
        <v-card style="overflow: initial; z-index: initial;" class="dialog-bg">
            <v-card-text style="overflow: initial;">
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <div
                                class="withbg d-flex justify-center align-center text-center flex-column position-relative">

                                <div class="w-100 text-center">
                                    <QrcodeStream :constraints="selectedConstraints" @camera-on="onCameraReady"
                                        @detect="onDetect" @error="onError" :max-width="750" class="mx-auto">
                                    </QrcodeStream>
                                    <p class="text-red text-center text-subtitle-1">{{ error }}</p>
                                    <!-- <v-img src="@/assets/404.png" alt="Coming Soon" :max-width="750" class="mx-auto" /> -->
                                </div>

                            </div>
                        </v-col>
                        <v-col :cols="xs ? 12 : 10" :offset="xs ? 0 : 1">
                            <v-select v-model="selectedConstraints"
                                :menu-props="{ scrim: true, scrollStrategy: 'close' }" :items="constraintOptions"
                                prepend-icon="mdi-camera" item-title="label" item-value="constraints"
                                label="Select Camera" density="compact" variant="underlined" hide-details></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col :cols="xs ? 12 : 6" :offset="xs ? 0 : 3">
                            <!-- <v-text-field label="Square" variant="outlined" v-model="block" clearable
                                :density="xs ? 'compact' : 'default'" hide-details="auto" /> -->
                            <v-select v-model="block" :items="items" label="Select Square" variant="outlined"
                                :height="xs ? '45' : '55'" @update:model-value="fetchQuestion"
                                :density="xs ? 'compact' : 'default'" hide-details="auto"></v-select>
                        </v-col>
                        <v-col :cols="xs ? 12 : 6" :offset="xs ? 0 : 3">
                            <v-btn block color="blue-lighten-4" flat :height="xs ? '45' : '55'" rounded text="CONFIRM"
                                @click="fetchQuestion(block)" :size="xs ? 'small' : 'default'" />
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <!-- {{ result }}<br><br> -->
            <!-- {{ selectedConstraints }}<br><br>
            {{ defaultConstraintOptions }}<br><br>
            {{ constraintOptions }} -->
        </v-card>
    </v-dialog>

    <!-- Question Dialog -->
    <v-dialog v-model="showQuestionDialog" max-width="500" persistent>
        <v-card prepend-icon="mdi-head-question" title="Question" class="dialog-bg">
            <v-divider class="mt-3"></v-divider>
            <v-form validate-on="lazy blur" ref="form">
                <v-card-text>
                    <p class="text-body-3 mb-4 font-weight-medium">{{ currentQuestion?.question_text }}</p>
                    <v-radio-group v-model="selectedAnswer" class="mt-2 font-weight-bold" :rules="radioRules"
                        hide-details="auto">
                        <v-radio label="True" :value="1" color="info"></v-radio>
                        <v-radio label="False" :value="0" color="info"></v-radio>
                    </v-radio-group>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn class="mx-auto" color="primary" @click="validate">
                        SUBMIT
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>

    <!-- Explanation Dialog -->
    <v-dialog v-model="showExplanationDialog" max-width="500">
        <v-card prepend-icon="mdi-lightbulb-on" title="Explanation" class="dialog-bg">
            <v-divider class="mt-3"></v-divider>
            <v-card-text>
                <div :class="['text-h2 mb-4 text-center', isAnswerCorrect ? 'text-success' : 'text-error']">
                    {{ isAnswerCorrect ? '🎉 Great job! 🤠' : '😔 Better luck next time!' }}
                </div>
                <p class="text-body-1 mb-4">{{ currentQuestion?.explanation }}</p>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="showExplanationDialog = false">
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Audio Element -->
    <audio id="victorySound" preload="auto">
        <source src="@/assets/victory.mp3" type="audio/mp3">
    </audio>

    <!-- Winner Dialog -->
    <v-dialog v-model="showWinnerDialog" max-width="400">
        <v-card class="text-center dialog-bg">
            <v-card-text>
                <v-icon icon="mdi-trophy" size="120" color="amber-darken-2" class="mb-4 trophy-icon"
                    v-if="winner !== 'It\'s a tie! 🤝'"></v-icon>
                <h2 class="text-h4 mb-4" v-if="winner !== 'It\'s a tie! 🤝'">👏 Congratulations! 👏</h2>
                <h2 class="text-h4 mb-4" v-else>Game Over!</h2>
                <p class="text-h3 mb-4">
                    <span class="text-orange-darken-2">{{ winner }}</span>
                    <template v-if="winner !== 'It\'s a tie! 🤝'"> Wins! 🥳</template>
                </p>
                <div class="text-body-1 mb-4">
                    Final Score:<br>
                    {{ gameData?.player1_username }}: {{ player1Points }} points<br>
                    {{ gameData?.player2_username }}: {{ player2Points }} points
                </div>
            </v-card-text>
            <v-card-actions class="justify-center">
                <v-btn color="primary" @click="returnToDashboard" size="large">
                    Return to Dashboard
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- {{ block }}<br><br>
    {{ gameStatus }}<br><br>
    {{ gameCode }}<br><br>
    {{ gameData }}<br><br>
    {{ gameScoreData }}<br><br>
    {{ user_id }}<br><br>
    {{ questions }}<br><br> -->

</template>

<script>
import axios from 'axios';
import { login } from '@/store/login';
import { useDisplay } from 'vuetify';
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
    components: {
        QrcodeStream
    },
    setup() {
        const { xs } = useDisplay()
        return {
            xs
        }
    },
    data: () => ({
        loginStore: login(),
        gameCode: null,
        gameData: null,
        opponent: null,
        player1Points: 0,
        player2Points: 0,
        player1Move: 0,
        player2Move: 0,
        dialog: false,
        selectedConstraints: { facingMode: 'environment' },
        defaultConstraintOptions: [
            { label: 'rear camera', constraints: { facingMode: 'environment' } },
            { label: 'front camera', constraints: { facingMode: 'user' } }
        ],
        constraintOptions: [],
        result: '',
        error: '',
        block: '',
        questions: [],
        showQuestionDialog: false,
        showExplanationDialog: false,
        currentQuestion: null,
        selectedAnswer: null,
        radioRules: [v => v !== null || 'Please select an answer!'],
        gameScoreData: null,
        refreshInterval: null,
        showWinnerDialog: false,
        winner: null,
        isAnswerCorrect: false,
        user_id: '',
        gameStatus: '',
        isMoving: false,
        items: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8',
            'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8',
            'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8',
            'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8',
            'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8',
            'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8',
            'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8',
            'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8'],
    }),
    computed: {
        totalPoints() {
            return this.player1Points + this.player2Points;
        },
    },
    async created() {
        if (this.loginStore.getId == null) {
            this.logout();
            return;
        }
        this.user_id = this.loginStore.getId;
        this.constraintOptions = this.defaultConstraintOptions;
        // Get the game ID from the route parameters
        this.gameCode = this.$route.params.game_code;
        console.log('Game code received:', this.gameCode);
        console.log('Game data:', JSON.parse(sessionStorage.getItem('gameData')));

        if (sessionStorage.getItem('gameData')) {
            this.gameData = JSON.parse(sessionStorage.getItem('gameData'));
            if (this.gameData.player1_id == this.loginStore.getId) {
                this.opponent = this.gameData.player2_username;
            } else {
                this.opponent = this.gameData.player1_username;
            }
        }

        this.getAllQuestion();
        this.refreshGameData();
        this.startRefreshInterval();
    },
    methods: {
        async logout() {
            await login().logout_act();
        },
        openDialog() {
            this.dialog = true;
            this.block = '';
            this.error = '';
        },
        async endGame() {
            this.displayWinnerResult();
            if (this.gameStatus !== 'completed') {
                try {
                    const response = await axios.put(`http://localhost:5000/games/${this.gameData.id}/status`, {
                        status: 'completed'
                    });
                    this.refreshGameData();
                    console.log('Game status updated:', response.data);
                } catch (error) {
                    console.error('Error updating game status:', error);
                }
            }
        },
        async onCameraReady() {
            const devices = await navigator.mediaDevices.enumerateDevices()
            const videoDevices = devices.filter(({ kind }) => kind === 'videoinput')

            this.constraintOptions = [
                ...this.defaultConstraintOptions,
                ...videoDevices.map(({ deviceId, label }) => ({
                    label: label,
                    constraints: { deviceId }
                }))
            ]

            this.error = ''
        },
        onDetect(detectedCodes) {
            console.log(detectedCodes)
            this.result = JSON.stringify(detectedCodes.map(c => c.rawValue))
            const detectedValue = detectedCodes[0].rawValue;

            if (this.items.includes(detectedValue)) {
                this.block = detectedValue;
                this.error = '';
            } else {
                this.error = 'Invalid QR code';
                this.block = '';
            }
        },
        onError(err) {
            const map = {
                NotAllowedError: 'You need to grant camera access permission',
                NotFoundError: 'No camera on this device',
                NotSupportedError: 'Secure context required (HTTPS, localhost)',
                NotReadableError: 'Is the camera already in use?',
                OverconstrainedError: 'Installed cameras are not suitable',
                StreamApiNotSupportedError: 'Stream API is not supported in this browser',
                InsecureContextError: 'Use HTTPS or localhost instead of HTTP.'
            }

            const errorType = err.name
            const errorMsg = map[err.name] || err.message

            this.error = `[${errorType}]: ${errorMsg}`
            // this.warningMsg(errorType, errorMsg)
        },
        async getAllQuestion() {
            try {
                const response = await axios.get('http://localhost:5000/games/question');
                console.log(response.data);
                // Format question_text and explanation fields
                this.questions = response.data;
            } catch (error) {
                console.error('Error fetching question:', error);
            }
        },
        async fetchQuestion(selected) {
            const selectedBlock = (selected || this.block || '').toString().toUpperCase().trim();

            // Validate block selection
            if (!selectedBlock) {
                this.error = 'Please select a square first';
                return;
            }
            if (!this.items.includes(selectedBlock)) {
                this.error = 'Invalid square selected';
                return;
            }
            // Ensure component state reflects the validated block
            this.block = selectedBlock;

            if (!this.questions || this.questions.length === 0) {
                this.error = 'No questions available';
                return;
            }

            try {
                // Pick a random question from the loaded list
                const randomIndex = Math.floor(Math.random() * this.questions.length);
                this.currentQuestion = this.questions[randomIndex];

                // Open question dialog and close scanner dialog if open
                this.showQuestionDialog = true;
                this.dialog = false;
                this.error = '';
            } catch (error) {
                console.error('Error processing question:', error);
                this.error = 'Error processing question';
            }
        },
        async validate() {
            const { valid } = await this.$refs.form.validate()

            if (valid) {
                await this.submitAnswer();
            }
        },
        async submitAnswer() {
            try {
                // Check if answer is correct
                console.log('this.selectedAnswer', this.selectedAnswer);
                console.log('this.currentQuestion', this.currentQuestion);
                this.isAnswerCorrect = this.selectedAnswer === this.currentQuestion.answer;

                // Update user score data
                const scoreData = {
                    game_session_id: this.gameData.id,
                    player_id: this.user_id,
                    score: this.isAnswerCorrect ? 1 : 0,
                    attempts: 1
                };

                console.log('scoreData', scoreData);

                // Send score to backend
                try {
                    await axios.post('http://localhost:5000/game_scores/update', scoreData);
                } catch (error) {
                    console.error('Error saving score:', error);
                }

                // Update points if answer is correct
                if (this.isAnswerCorrect) {
                    console.log('this.gameData.player1_id', this.gameData.player1_id);
                    console.log('this.user_id', this.user_id);
                    if (this.gameData.player1_id === this.user_id) {
                        this.player1Points += 1;
                        this.player1Move += 1;
                        console.log('1');
                    } else {
                        this.player2Points += 1;
                        this.player2Move += 1;
                        console.log('2');
                    }
                } else {
                    // Even if answer is wrong, increment move counter
                    if (this.gameData.player1_id === this.user_id) {
                        this.player1Move += 1;
                        console.log('a');
                    } else {
                        this.player2Move += 1;
                        console.log('b');
                    }
                }
                this.stopRefreshInterval();
                this.refreshGameData();
                this.startRefreshInterval();

                // Show explanation
                this.showQuestionDialog = false;
                this.showExplanationDialog = true;

                // Reset selected answer
                this.selectedAnswer = null;
                this.$refs.form.reset();
            } catch (error) {
                console.error('Error submitting answer:', error);
                this.error = 'Error submitting answer';
            }
        },
        closeQuestionDialog() {
            this.showQuestionDialog = false;
            this.selectedAnswer = null;
        },
        async refreshGameData() {
            try {
                const response = await axios.get(`http://localhost:5000/game_scores/${this.gameData.id}`);
                this.gameScoreData = response.data;

                // Update points and moves based on player ID
                if (this.user_id == this.gameScoreData.player1_id) {
                    this.player1Points = this.gameScoreData.player1_score;
                    this.player1Move = this.gameScoreData.player1_attempts;
                    this.player2Points = this.gameScoreData.player2_score;
                    this.player2Move = this.gameScoreData.player2_attempts;
                    this.gameStatus = this.gameScoreData.status;
                    console.log('1');
                } else {
                    this.player2Points = this.gameScoreData.player2_score;
                    this.player2Move = this.gameScoreData.player2_attempts;
                    this.player1Points = this.gameScoreData.player1_score;
                    this.player1Move = this.gameScoreData.player1_attempts;
                    this.gameStatus = this.gameScoreData.status;
                    console.log('2');
                }

                if (this.gameStatus === 'completed') {
                    this.stopRefreshInterval();
                    this.isMoving = true;
                }

                console.log('Game data refreshed:', this.gameScoreData);
            } catch (error) {
                this.warningMsg(error.name, error.message);
                this.stopRefreshInterval();
            }
        },
        startRefreshInterval() {
            this.refreshInterval = setInterval(() => {
                this.refreshGameData();
            }, 10000); // Refresh every 10 seconds
        },
        stopRefreshInterval() {
            if (this.refreshInterval) {
                clearInterval(this.refreshInterval);
                this.refreshInterval = null;
            }
        },
        async displayWinnerResult() {
            // Determine winner
            if (this.player1Points > this.player2Points) {
                this.winner = this.gameData.player1_username;
            } else if (this.player2Points > this.player1Points) {
                this.winner = this.gameData.player2_username;
            } else {
                this.winner = "It's a tie! 🤝";
            }

            // Play victory sound
            try {
                const audio = document.getElementById('victorySound');
                if (audio) {
                    audio.currentTime = 0; // Reset to start
                    await audio.play();
                }
            } catch (error) {
                console.error('Error playing sound:', error);
            }

            // Show winner dialog
            this.showWinnerDialog = true;

            // Stop the refresh interval
            this.stopRefreshInterval();
        },
        async returnToDashboard() {
            if (sessionStorage.getItem('gameData')) {
                sessionStorage.removeItem('gameData');
            }
            this.$router.push({ name: 'Dashboard' });
        }
    },
    async beforeUnmount() {
        this.stopRefreshInterval();
    }
}
</script>

<style scoped>
.v-card {
    border-radius: 12px;
}

.players-section {
    flex: 1;
    padding: 2rem;
}

.player-card {
    flex: 1;
    min-width: 120px;
    padding: 1rem;
    margin: 0.5rem;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
}

.timer-container {
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.points-display {
    margin-top: 0.5rem;
}

.points-total {
    margin-top: 1rem;
    color: #4CAF50;
}

.action-buttons {
    padding: 1rem;
    max-width: 400px;
    margin: 0 auto;
}

@media (max-width: 600px) {
    .players-section {
        padding: 1rem;
    }

    .player-card {
        min-width: 100px;
        padding: 0.5rem;
    }

    .timer-container {
        padding: 0 0.5rem;
    }

    .points-total {
        margin-top: 0.5rem;
        font-size: 1.1rem;
    }
}

.trophy-icon {
    animation: bounce 1s ease infinite;
}

@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}
</style>