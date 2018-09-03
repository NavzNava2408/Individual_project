import { stat } from "fs";

const state = {
    email: '',
    userId: null,
    isLoggedIn: false,
    loginError: ''
}

const getters = {
    isLoggedIn: state => state.isLoggedIn,
    userId: state => state.userId,
    loginError: state => state.loginError
}

const actions = {
    logInUser ({commit}, payload){
        if (payload.email === 'test1@user.com' && payload.password === test111){
            payload.userId = '001'
            commit('logInUser', payload)
        } else {
            commit('loginError')
        }
    }
}

const mutations = {
    logInUser(state, payload){
        state.email = payload.email
        state.userId = payload.userId
        state.isLoggedIn = true
    },
    loginError(state){
        state.isLoggedIn = false
        state.loginError = 'Email and/or password are invalid. Login Failed!'

    }
}

export default {
    state,
    getters,
    actions,
    mutations
}