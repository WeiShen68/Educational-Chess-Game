<template>
    <v-row class="ma-0" style="min-height: calc(100dvh - 110px);">
        <v-col cols="12" class="pa-0">
            <v-card variant="outlined" elevation="0"
                class="withbg d-flex justify-center align-center text-center flex-column position-relative" style="height: 100%;">

                <div class="w-100 text-center">
                    <v-img src="@/assets/404.png" alt="Coming Soon" :max-width="750" class="mx-auto" />
                </div>
                <div class="d-flex ga-8 flex-1-1-auto flex-wrap justify-center px-4" style="z-index: 1;">


                    <v-btn block color="secondary" flat height="55" rounded text="GET STARTED"
                        @click="navigateToPage" />

                    <v-btn block color="red" flat height="55" rounded text="JOIN A GAME" @click="openDialog()" />
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
                                    <QrcodeStream :constraints="selectedConstraints" @camera-on="onCameraReady" :paused="paused"
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
                            <v-text-field label="Game Code" variant="outlined" v-model="gameCode" clearable
                                :density="xs ? 'compact' : 'default'" hide-details="auto" />
                        </v-col>
                        <v-col :cols="xs ? 12 : 6" :offset="xs ? 0 : 3">
                            <v-btn block color="secondary" flat :height="xs ? '45' : '55'" rounded text="JOIN GAME"
                                @click="joinGame" :size="xs ? 'small' : 'default'" />
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
    <v-dialog v-model="loadingDialog" max-width="340" persistent>
        <v-list class="py-2" color="primary" elevation="12" rounded="lg">
            <v-list-item prepend-icon="mdi-controller" title="Waiting host to start the game...">
                <template v-slot:prepend>
                    <div class="pe-4">
                        <v-icon color="primary" size="x-large"></v-icon>
                    </div>
                </template>

                <template v-slot:append>
                    <v-progress-circular color="primary" indeterminate="disable-shrink" size="16"
                        width="2"></v-progress-circular>
                </template>
            </v-list-item>
        </v-list>
    </v-dialog>
    <!-- {{ loginStore }}<br><br> -->
</template>

<script>
import axios from 'axios';
import { useDisplay } from 'vuetify';
import { login } from '@/store/login';
import AppStorage from '@/plugins/storage/index.js';
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
    setup() {
        const { xs } = useDisplay()

        return {
            xs
        }
    },
    components: {
        QrcodeStream
    },
    data: () => ({
        loginStore: login(),
        dialog: false,
        loadingDialog: false,
        gameCode: '',
        gameId: null,
        selectedConstraints: { facingMode: 'environment' },
        defaultConstraintOptions: [
            { label: 'rear camera', constraints: { facingMode: 'environment' } },
            { label: 'front camera', constraints: { facingMode: 'user' } }
        ],
        constraintOptions: [],
        result: '',
        error: '',
        userId: '',
        checkInterval: null,
        paused: false,
    }),
    async created() {
        console.log(this.loginStore.getId);
        if (this.loginStore.getId == null) {
            this.logout();
        }
        this.constraintOptions = this.defaultConstraintOptions;
        this.userId = this.loginStore.getId;
    },
    methods: {
        navigateToPage() {
            this.$router.push({ name: 'StartGame' });
        },
        async logout() {
            await login().logout_act();
        },
        openDialog() {
            this.dialog = true;
            this.gameCode = '';
            this.error = '';
        },
        async joinGame() {
            if (!this.gameCode) {
                this.error = 'Game Code is required!';
                return;
            }

            try {
                // First check if the game exists
                const gameResponse = await axios.get(`http://localhost:5000/games/code/${this.gameCode}`);
                const game = gameResponse.data;
                console.log('Game response:', gameResponse);
                console.log('Game data:', game);

                if (!game || game.message === 'Game session not found') {
                    this.error = 'Invalid game code. Please check and try again.';
                    return;
                }

                if (game.player2_id) {
                    this.error = 'This game is already full. Please try another game code.';
                    return;
                }

                // Join the game
                const joinResponse = await axios.put(`http://localhost:5000/games/${game.id}/join`, {
                    player2_id: this.userId
                });
                console.log('Join response:', joinResponse.data);

                // Store game ID and show loading dialog
                this.gameId = game.id;
                this.loadingDialog = true;

            } catch (error) {
                console.error('Error joining game:', error);
                if (error.response?.status === 404) {
                    this.error = 'Invalid game code. Please check and try again.';
                } else {
                    this.error = error.response?.data?.message || 'Failed to join game. Please try again.';
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
        async onDetect(detectedCodes) {
            console.log(detectedCodes)
            this.result = JSON.stringify(detectedCodes.map(c => c.rawValue))
            this.gameCode = detectedCodes[0].rawValue;
            this.error = '';
            this.paused = true
            await this.timeout(500)
            this.paused = false
        },
        timeout(ms) {
            return new Promise((resolve) => {
                window.setTimeout(resolve, ms)
            })
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
        async createGameScore(params) {
            try {
                const response = await axios.post('http://localhost:5000/game_scores', params);
                console.log('Game score created:', response.data);
            } catch (error) {
                console.error('Error creating game score:', error);
            }
        }
    },
    watch: {
        loadingDialog(newVal) {
            if (newVal) {
                // Start interval when loading dialog opens
                this.checkInterval = setInterval(async () => {
                    try {
                        // Check game status
                        const response = await axios.get(`http://localhost:5000/games/code/${this.gameCode}`);
                        const game = response.data;

                        console.log('Game status:', game);

                        if (game.message) {
                            console.log('Game status:', game.message);
                            this.loadingDialog = false;
                            this.error = game.message;
                            return;
                        }

                        // If game status is 'started', navigate to game board
                        if (game.status === 'started') {
                            this.loadingDialog = false;
                            this.dialog = false;
                            console.log('Game started');
                            sessionStorage.setItem('gameData', JSON.stringify(game));
                            const params = {
                                game_session_id: game.id,
                                player_id: this.userId

                            }
                            this.createGameScore(params);
                            this.$router.push({
                                name: 'GameBoard',
                                params: { game_code: game.game_code }
                            });
                        }
                    } catch (error) {
                        console.error('Error checking game status:', error);
                        // If game not found or other error, close loading dialog and show error
                        this.loadingDialog = false;
                        this.error = 'Error checking game status. Please try again.';
                    }
                }, 5000);
            } else {
                // Clear interval when loading dialog closes
                if (this.checkInterval) {
                    clearInterval(this.checkInterval);
                    this.checkInterval = null;
                }
            }
        },
    },
}
</script>

<style scoped>
</style>