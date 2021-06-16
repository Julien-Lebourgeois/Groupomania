<template>
  <div class="card">
        <h1>Fil d'actualité</h1>
        <div id="link">
            <router-link  to="/postmessage">Quelque chose à partager ?</router-link>
        </div>
        <div v-for="message in messages" :key="message.id" id="fil">
            <h3 id="title">{{ message.title }}</h3>
            <img id="picture" :src="message.attachment" :alt="message.title">
            <span id="description">{{ message.content}}</span>
            <div>
                <p>{{ message.User.username }} le {{ formatDate(message.createdAt) }}</p>
                <i v-if="user.isAdmin == 1 || user.id == message.userId" @click="deleteMessage()" class="fas fa-trash"></i>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Home',
    data() {
        return {
            messages: [],
            user: {
                username: '',
                email: '',
                isAdmin: '',
                id: ''
            },            
        }
    },

    methods: {
        getAllMessages: function() {
            const token = {headers: {authorization: localStorage.token}};            // get the token from the header
            axios.get('http://localhost:3000/api/message/messages?page=1', token)    // using axios to get all the messages
            .then(response => {
                this.messages = response.data.messages;                              // get the answer from the back
            })
            .catch(error => {
                console.log(error);                                                  // error message if something goes wrong
            })
        },

        getInfosUser: function() {
            const token = {headers: {authorization: localStorage.token}};            // get the token from the header
            axios.get('http://localhost:3000/api/user/myprofile', token)             // using axios to get user infos
            .then(response => {
                let userInfos = response.data                                        // get the answer from the back
                this.user.username = userInfos.username;                             // display the anwer that we need in front
                this.user.email = userInfos.email;
                this.user.isAdmin = userInfos.isAdmin;
                this.user.id = userInfos.id;
            })
            .catch(error => {
            console.log(error);                                                      // error message if something goes wrong
            })
        },

        deleteMessage: function(){
            const token = {headers: {authorization: localStorage.token}};            // get the token from the header
            const idMessage = this.messages[0].id;                                   // find the id of the message that we want to delete
            axios.delete(`http://localhost:3000/api/message/${idMessage}`, token)    // using axios to delete the message
            .then(() => {
                location.reload()                                                    // reload the page to actualize
            })
            .catch(error => {
                console.log(error);                                                  // error message if something goes wrong
            })
        },

        formatDate(dateString) {
            let convertedDate = new Date(dateString);
            return convertedDate.toLocaleDateString();
        },
    },

    mounted() {
        this.getAllMessages();
        this.getInfosUser();
    },
}
</script>

<style scoped lang="scss">

#link {
    width: 50%;
    background: linear-gradient(0deg, rgba(253,78,0,1) 22%, rgba(255,106,0,1) 100%);
    font-weight: bold;
    border: none;
    padding: 8px;
    margin: 10px 0px;
    border-radius: 50px;
    box-shadow: 5px 5px 15px black;
    transition: 0.4s ease-out;
    &:hover{
        background: linear-gradient(0deg, rgba(253,78,0,1) 22%, rgba(255,106,0,1) 100%);
        cursor: pointer;
        transform: scale(1.1);
    }
    a{
        text-decoration: none;
        color: whitesmoke;
    }
}
.card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 5%;
    margin-left: 10%;
    margin-right: 10%;
    padding: 1% 0%;
    box-shadow: 10px 10px 50px black;
    border-radius: 2rem;
    background-color: whitesmoke;
    #fil {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10px;
        margin-top: 20px;
        width: 70%;
        height: fit-content;
        box-shadow: 10px 10px 30px black;
        border-radius: 2rem;
        img {
            width: 100%;
            height: auto;
            margin-bottom: 1rem;
            border-radius: 2rem;
        }
        #title{
            padding-right: 20%;
            padding-left: 20%;
        }
        div {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 80%;
            margin-top: 1rem;
            p {
                font-size: 14px;
            }
            i {
                color: rgb(207, 8, 8);
                cursor: pointer;
            }
        }
    }
}


</style>
