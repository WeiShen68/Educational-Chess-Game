<template>
    <v-snackbar v-model="showSnackbar" :color="color" location="center" timeout="-1">
        <v-card>
            <v-card-text class="title-css d-flex align-center">
                <v-icon left color="white" class="mr-2">{{ icon }}</v-icon>
                {{ title }}
            </v-card-text>
            <v-card-text>
                {{ message }}
            </v-card-text>
            <v-card-text class="d-flex pa-2">
                <v-btn class="font-weight-bold ml-auto" variant="text" @click="showSnackbar = false">
                    Close
                </v-btn>
            </v-card-text>
        </v-card>
    </v-snackbar>
</template>
  
<script>
export default {
    name: 'Vtoast',
    data() {
        return {
            showSnackbar: false,
            message: '',
            color: 'warning',
            icon: 'mdi-error',
            // timer: 3000,
            title: 'System Busy',
        };
    },
    methods: {
        show(data) {
            this.title = data.title || 'System busy.';
            this.message = data.message || 'missing "message".';
            this.color = data.color || 'danger';
            this.icon = data.icon || 'mdi-alert-circle-outline';
            this.showSnackbar = true;
        },
    },
};
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