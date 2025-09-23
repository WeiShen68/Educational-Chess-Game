<template>
    <div>
        <span v-for="user in users" :key="user.id">{{ user.user_name }}
            <router-link :to="{ name: 'DashboardU', params: { id: user.id } }">
                <button class="mr-2">Edit </button>

            </router-link>

            <a @click="deleteUser(user.id)">
                <button>Delete</button></a>
            <br>
        </span>
        <input type="text" v-model="newUserName" placeholder="Enter username" />
        <button @click="createUser">+</button><br>
        <!-- {{ users }} -->
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
        users: [],
        newUserName: ''
    }),
    async created() {
        this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            console.log('Fetching users...');
            try {
                const response = await axios.get('http://localhost:5000/users');
                this.users = response.data
            } catch (error) {
                console.log('Error fetching users:', error);
            }
        },
        async createUser() {
            console.log('Creating user...');
            if (!this.newUserName.trim()) {
                console.log('Username cannot be empty');
                return;
            }
            
            try {
                const response = await axios.post('http://localhost:5000/users', { 
                    user_name: this.newUserName 
                });
                
                this.users.push(response.data);
                this.newUserName = '';
                
                // Optionally refresh the list
                this.fetchUsers();
            } catch (error) {
                console.log('Error creating user:', error);
            }
        },
        async deleteUser(id) {
            console.log('Deleting user...');
            try {
                await axios.delete(`http://localhost:5000/users/${id}`);
                this.fetchUsers();
            } catch (error) {
                console.log('Error deleting user:', error);
            }
        }
    }
}
</script>