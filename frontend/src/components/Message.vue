<template>
  <div id="wrapper">
            <form>
                <h2>Envie d'ajouter quelque chose {{ user.username }} ?</h2>
                <label for="title">Titre :</label>
                <input 
                v-model="title" 
                id="title" 
                type="text" 
                name="title">
                <label for="content">Exprimez vous :</label>
                <input 
                v-model="content" 
                id="content" 
                type="text" 
                name="content">
                <label for="attachment">Ajouter une image</label>
                <input 
                id="attachment" 
                type="file" 
                ref="file"
                name="attachment" 
                accept="image/*" 
                @change="processFile()">
                <button @click.prevent="postMessage()" type="submit">Poster</button>
            </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Message',
    data() {
        return {
            title: '',
            content: '',
            attachment: null,
            user: {
                username: '',
                email: '',
                isAdmin: '',
                id: ''
            },
            messages: []
        }
    },

    methods: {
        /*:::::::::: make the file sendable to the back :::::::::: */
        processFile() {
            const file = this.$refs.file.files[0];
            this.attachment = file;
        },
        
        /*:::::::::: get infos from the form and send them via axios to the back to create a message :::::::::: */
        postMessage: function() {
            var formData = new FormData();
            formData.append("title", this.title);
            formData.append("content", this.content);
            formData.append("file", this.attachment);
            const token = {headers: {authorization: localStorage.token}};
            axios.post('http://localhost:3000/api/message/add', formData, token)
            .then(() => this.$router.push('/homepage'))
            .catch(error => {
                console.log(error);
            })
        },
    },

    /*:::::::::: get user's infos when the page is loaded :::::::::: */
    mounted: function() {
        const token = {headers: {authorization: localStorage.token}};
        axios.get('http://localhost:3000/api/user/myprofile', token)
        .then(response => {
            let userInfos = response.data
            this.user.username = userInfos.username;
            this.user.email = userInfos.email;
            this.user.isAdmin = userInfos.isAdmin;
            this.user.id = userInfos.id;
        })
        .catch(error => {
            console.log(error);
        })
    },
  
}
</script>


<style scoped lang="scss">
#wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: auto;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    width: 50%;
    height: fit-content;
    box-shadow: 10px 10px 30px black;
    border-radius: 2rem;
    background-color: whitesmoke;
    input {
        padding: 5px;
        border: none;
        outline: none;
        border-radius: 2rem;
        margin-bottom: 10px;
        
    }
    label {
        margin-bottom: 10px;
        font-weight: bold;
        text-decoration: underline;
    }
    button {
        width: 20%;
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
    }
    #content {
        width: 90%;
        height: 5rem;
        resize: none;
    }
}

</style>
