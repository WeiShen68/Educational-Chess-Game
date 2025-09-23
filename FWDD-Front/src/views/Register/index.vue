<template>
    <div class="auth-wrapper d-flex align-center justify-center pa-4">
        <v-card class="auth-card pa-4 pt-7" max-width="448">
            <v-form validate-on="lazy blur" ref="form">
                <v-card-text class="d-flex align-center justify-center">
                    <v-img height="60" src="@\assets\Battle-Chess-Pieces.png"></v-img>
                </v-card-text>

                <v-card-text class="pt-0">
                    <p class="">Welcome to <b>Chess Battle Board</b>👋🏻</p>
                    <p>Please register your account to continue.</p>
                </v-card-text>

                <v-card-text class="pb-0">
                    <v-text-field 
                        v-model="form.email" 
                        density="comfortable" 
                        label="Email"
                        variant="outlined" 
                        :rules="emailRules" 
                        hide-details="auto" 
                        color="secondary"
                    ></v-text-field>
                </v-card-text>

                <v-card-text class="pb-0">
                    <v-text-field 
                        v-model="form.username" 
                        density="comfortable" 
                        label="Username"
                        variant="outlined" 
                        :rules="usernameRules" 
                        hide-details="auto" 
                        color="secondary"
                    ></v-text-field>
                </v-card-text>

                <v-card-text class="pb-0">
                    <v-text-field 
                        v-model="form.password" 
                        density="comfortable" 
                        variant="outlined" 
                        label="Password"
                        :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'" 
                        :rules="passwordRules"
                        :type="show ? 'text' : 'password'" 
                        @click:append-inner="show = !show" 
                        hide-details="auto"
                        color="secondary"
                    ></v-text-field>
                </v-card-text>

                <v-card-text class="pb-0">
                    <v-text-field 
                        v-model="form.confirmPassword" 
                        density="comfortable" 
                        variant="outlined" 
                        label="Confirm Password"
                        :append-inner-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'" 
                        :rules="confirmPasswordRules"
                        :type="showConfirm ? 'text' : 'password'" 
                        @click:append-inner="showConfirm = !showConfirm" 
                        hide-details="auto"
                        color="secondary"
                        @keyup.enter="validate"
                    ></v-text-field>
                </v-card-text>

                <v-card-text class="d-flex flex-column gap-4 py-4">
                    <v-btn 
                        rounded="pill" 
                        append-icon="mdi-account-plus" 
                        block 
                        color="secondary" 
                        @click="validate"
                        :loading="loading"
                    >
                        Register
                    </v-btn>
                    
                    <v-btn 
                        class="mt-2"
                        rounded="pill" 
                        append-icon="mdi-login" 
                        block 
                        color="primary" 
                        variant="outlined"
                        @click="goToLogin"
                    >
                        Back to Login
                    </v-btn>
                </v-card-text>
            </v-form>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios';
import router from '@/router';
import { useDisplay } from 'vuetify';
import { push } from 'notivue';

export default {
    setup() {
        const { xs } = useDisplay()
        return { xs }
    },
    data: () => ({
        show: false,
        showConfirm: false,
        loading: false,
        form: {
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        },
        emailRules: [
            v => !!v || 'Email is required',
            v => /.+@.+\..+/.test(v) || 'Email must be valid'
        ],
        usernameRules: [
            v => !!v || 'Username is required',
            v => (v && v.length >= 3) || 'Username must be at least 3 characters long'
        ],
        passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 8) || 'Password must be at least 8 characters long',
            v => /[a-z]/.test(v) || 'Password must contain at least one lowercase letter',
            v => /[A-Z]/.test(v) || 'Password must contain at least one uppercase letter',
            v => /\d/.test(v) || 'Password must contain at least one number',
            v => /[^a-zA-Z0-9]/.test(v) || 'Password must contain at least one special character'
        ]
    }),
    computed: {
        confirmPasswordRules() {
            return [
                v => !!v || 'Please confirm your password',
                v => v === this.form.password || 'Passwords must match'
            ]
        }
    },
    methods: {
        async validate() {
            const { valid } = await this.$refs.form.validate()
            if (valid) {
                await this.register()
            }
        },

        async register() {
            this.loading = true
            try {
                const response = await axios.post('http://localhost:5000/register', {
                    user_email: this.form.email,
                    user_name: this.form.username,
                    user_password: this.form.password
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                
                this.successMsg('Success!', 'Registration successful! Please login.')
                // push.success({
                //     title: 'Success',
                //     message: 'Registration successful! Please login.'
                // })
                
                // Redirect to login page after successful registration
                router.push({ name: 'Login' })
            } catch (error) {
                console.error('Registration error:', error)
                this.warningMsg('Error!', error.response?.data?.message || 'Registration failed. Please try again.')
                // Optionally, you can show a notification or alert to the user
                // push.error({
                //     title: 'Error',
                //     message: error.response?.data?.message || 'Registration failed. Please try again.'
                // })
            } finally {
                this.loading = false
            }
        },

        goToLogin() {
            router.push({ name: 'Login' })
        }
    }
}
</script>

<style lang="scss">
.auth-wrapper {
    min-block-size: calc(var(--vh, 1vh) * 100);
    background-image: url('../../assets/chessboard.jpg');
    background-position: center center;
    background-size: cover;
}

.auth-card {
    z-index: 1 !important;
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.9) !important;
}
</style>