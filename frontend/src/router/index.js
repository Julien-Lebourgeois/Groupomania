import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Message from '../components/Message.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/loginpage',
    name: 'Login',
    component: Login
  },
  {
    path: '/homepage',
    name: 'Home',
    component: Home
  },
  {
    path: '/myprofile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/postmessage',
    name: 'Message',
    component: Message
  }
]

const router = new VueRouter({
  mode:'history',
  base: process.env.BASE_URL,
  routes
})

export default router
