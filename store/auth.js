import firebase from '@/plugins/firebase'

const googleProvider = new firebase.auth.GoogleAuthProvider()

export const strict = false

export const state = () => ({
  user: null,
  isAuthLoading: true
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  toggleAuthLoading(state) {
    state.isAuthLoading = false
  }
}

export const actions = {
  login() {
    // console.log("!");
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithRedirect(googleProvider)
        .then(() => resolve())
        .catch((err) => reject(err))
    })
  },

  logout({ commit }) {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut()
        .then(() => {
          commit('setUser', null)
          resolve()
        })
    })
  },

  setUser({ commit }, payload) {
    commit('setUser', payload)
  },

  toggleAuthLoading({commit}) {
    commit('toggleAuthLoading')
  }
}

export const getters = {
  isAuthenticated(state) {
    return !!state.user
  }
}