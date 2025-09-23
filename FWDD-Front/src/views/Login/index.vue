<template>
    <div class="auth-wrapper d-flex align-center justify-center pa-4">
        <v-card class="auth-card pa-4 pt-7" max-width="448">
            <v-form validate-on="lazy blur" ref="form">

                <v-card-text class="d-flex align-center justify-center">
                    <v-img height="60" src="@\assets\Battle-Chess-Pieces.png"></v-img>
                </v-card-text>

                <v-card-text class="pt-0">
                    <p class="">Welcome to <b>Chess Battle Board</b>👋🏻</p>
                    <p>Please sign-in to your account to continue.</p>
                </v-card-text>

                <v-card-text class="pb-0">
                    <v-text-field v-model="form.username" density="comfortable" label="Username"
                        variant="outlined" :rules="usernameRules" hide-details="auto" color="secondary"></v-text-field>
                </v-card-text>

                <v-card-text class="">
                    <v-text-field v-model="form.pwd" density="comfortable" variant="outlined" label="Password"
                        :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules"
                        :type="show ? 'text' : 'password'" @click:append-inner="show = !show" hide-details="auto"
                        color="secondary" @keyup.enter.prevent="submit"></v-text-field>
                </v-card-text>

                <v-card-text class="d-flex py-0">
                    <router-link to="/register">Register</router-link>
                    <p class="ml-auto" @click="showfp = !showfp">Forgot Password?
                        <v-tooltip v-model="showfp" activator="parent" location="bottom">Please contact the admin at
                            tp065295@apu.edu.my</v-tooltip>
                    </p>
                </v-card-text>

                <v-card-text class="d-flex py-4">
                    <v-btn rounded="pill" append-icon="mdi-login" block color="secondary" @click="validate"
                        :loading="loading">Login</v-btn>
                </v-card-text>


            </v-form>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios';
import { login } from '@/store/login';
import router from '@/router';
import { useDisplay } from 'vuetify'
import { mapActions } from 'pinia';
import { push } from 'notivue';
export default {
    setup() {
        const { xs } = useDisplay()

        return {
            xs,
        }
    },
    data: () => ({
        show: false,
        showfp: false,
        loading: false,
        enterCount: 0,
        form: {
            username: '',
            pwd: '',
        },
        usernameRules: [
            (v) => !!v || 'Username is required',
            (v) => (v && v.length >= 3) || 'Username must be at least 3 characters long',
        ],
        passwordRules: [
            (v) => !!v || 'Password is required',
            (v) => (v && v.length >= 8) || 'Password must be at least 8 characters long',
            (v) => /[a-z]/.test(v) || 'Password must contain at least one lowercase letter',
            (v) => /[A-Z]/.test(v) || 'Password must contain at least one uppercase letter',
            (v) => /\d/.test(v) || 'Password must contain at least one number',
            (v) => /[^a-zA-Z0-9]/.test(v) || 'Password must contain at least one special character'
        ]
    }),
    methods: {
        ...mapActions(login, ['login_act', 'login_process']),

        async validate() {
            const { valid } = await this.$refs.form.validate()

            if (valid) {
                await this.submit();
            }
        },

        async submit() {
            if (this.enterCount == 0) {
                this.enterCount++;
                this.loading = true;

                const params = {
                    username: this.form.username,
                    pwd: this.form.pwd,
                }

                // console.log(params)

                try {
                    const response = await axios.post('http://localhost:5000/login', params, {
                        headers: {
                            'Content-Type': 'application/json',  // Ensure JSON format is set
                        },
                    });
                    console.log("Login successful:", response.data);
                    this.processData(response.data.user);
                    this.loading = false;
                } catch (error) {
                    console.log("Login error:", error);
                    console.error("Login failed:", error.response ? error.response.data : error.message);
                    setTimeout(() => {
                        this.enterCount = 0;
                        this.loading = false;
                        this.warningMsg('Error!', error.response?.data?.message || error.message);
                    }, 3000);
                }

                // await this.login_act(params).then(res => {
                //     if (res.ret == 0) {
                //         this.processData(res);
                //     }
                //     else if (res.ret == 'NotInitialized') {
                //         const data = {
                //             username: this.form.username,
                //             pwd: this.form.pwd,
                //         };

                //         this.$router.push({ name: 'SetLogin', state: data }).catch(() => { });
                //     }
                //     else {
                //         if (res.msg) {
                //             this.warningMsg(res.ret, res.msg);
                //             push.error({
                //                 title: res.ret,
                //                 message: res.msg,
                //             });
                //         }
                //         else {
                //             this.whoopsMsg();
                //         }
                //         setTimeout(() => {
                //             this.enterCount = 0;
                //             this.loading = false;
                //         }, 3000);
                //     }
                // }).catch((error) => {
                //     setTimeout(() => {
                //         this.enterCount = 0;
                //         this.loading = false;
                //     }, 3000);
                //     this.warningMsg('Error!', error);
                // })
            }
        },

        processData(res) {
            return new Promise((resolve) => {
                this.login_process(res).then(() => {
                    router.push({ name: 'Dashboard' })
                })
                resolve();
            });
        }
    },
}
</script>

<style lang="scss">
.auth-wrapper {
    min-block-size: calc(var(--vh, 1vh) * 100);
    // background: #eef2f6;
    background-image: url('../../assets/chessboard.jpg');
    background-position: center center;
    background-size: cover;
}

.auth-card {
    z-index: 1 !important;
}
</style>
