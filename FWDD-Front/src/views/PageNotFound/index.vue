<template>
    <v-card>
        <v-card-text>
            ERROR 404
        </v-card-text>
        <v-card-text>
            PAGE NOT FOUND
        </v-card-text>
        <v-card-text>
            <v-btn @click="home">HOME</v-btn>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    
    methods:{
        home(){
            this.$router.push({ name: "Dashboard" });
        }
    }
}
</script>