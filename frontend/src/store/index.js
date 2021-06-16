  
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Storage of our auth and user infos
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },

  /*:::::::::: set up of our mutations :::::::::: */
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },

    auth_success(state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },

    auth_error(state) {
      state.status = 'error'
    },

    logout(state) {
      state.status = ''
      state.token = ''
    },
  },

  actions: {
    /*:::::::::: login action to be used on our Longin page :::::::::: */
    login({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: 'http://localhost:3000/api/user/login', data: user, method: 'POST'})
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(error => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(error)
        })
      })
    },

    /*:::::::::: register action to be used on our Longin page :::::::::: */
    register({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: 'http://localhost:3000/api/user/signup', data: user, method: 'POST'})
        .then(resp => {
          commit('auth_success')
          resolve(resp)
        })
        .catch (error => {
          commit('auth_error', error)
          localStorage.removeItem('token')
          reject(error)
        })
      })
    },

    /*:::::::::: logout action to be used on our Longin page :::::::::: */
    logout({commit}) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
        .catch (error => {
          commit('auth_error', error)
          localStorage.removeItem('token')
          reject(error)
        })
      })
    },

    /*:::::::::: deleteAcount action to be used on our Profile page :::::::::: */
    deleteAccount() {
      return new Promise((resolve, reject) => {
        const token = {headers: {authorization: localStorage.token}};
        axios.delete('http://localhost:3000/api/user/delete', token )
        .then(response => {
          console.log(response.data);
        })
        resolve()
        .catch (error => {
          reject(error)
        })
      })
    },
  },

  modules: {
  },

  getters: {
    isLoggedIn: state => state.token,
    isLoggedOut: state => !state.token,
    authStatus: state => state.status,
  }
})