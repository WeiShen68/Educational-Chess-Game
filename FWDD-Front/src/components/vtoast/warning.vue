<template>
    <v-snackbar v-model="showMsg" color="transparent" location="center">
        <v-card>
            <v-card-text class="title-css">
                {{ title }}
            </v-card-text>
            <v-card-text>
                {{ message }}
            </v-card-text>
            <v-card-text class="d-flex pa-2">
                <v-btn class="font-weight-bold ml-auto" variant="text" @click="close()">
                    Close
                </v-btn>
            </v-card-text>
        </v-card>
    </v-snackbar>
</template>

<script>
export default {

    props: {
        show: {
            type: Boolean,
            default: false,
        },
        message: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        }
    },

    computed: {
        showMsg() {
            return this.show;
        }
    },

    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>

<style scoped>
.title-css {
    background-color: orange;
    color: white;
    font-weight: bold;
}
:deep(.v-snackbar__content) {
    padding: 0px 0px 0px 0px !important;
}
</style>