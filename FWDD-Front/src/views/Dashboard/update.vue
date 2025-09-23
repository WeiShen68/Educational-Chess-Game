<template>
    <div>
        <label>
            Change User Name:
        </label><br>
        <input type="text" v-model="userName" placeholder="Enter new username" />
    </div>
    <div>
        <button @click="updateUser">Update</button>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data: () => ({
        userName: ''
    }),
    async created() {
        this.getUserById();
    },
    methods: {
        async getUserById() {
            console.log('Fetching user...');
            try {
                const response = await axios.get(`http://localhost:5000/users/${this.$route.params.id}`);
                this.userName = response.data.user_name;
            } catch (error) {
                console.log('Error fetching user:', error);
            }
        },
        async updateUser() {
            console.log('Updating user...');
            if (!this.userName.trim()) {
                console.log('Username cannot be empty');
                return;
            }
            
            try {
                const response = await axios.put(`http://localhost:5000/users/${this.$route.params.id}`, { 
                    user_name: this.userName 
                });
                
                this.$router.push('/dashboard');
            } catch (error) {
                console.log('Error updating user:', error);
            }
        }
    }
}
</script>