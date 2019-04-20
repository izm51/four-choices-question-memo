import firebase from "@/plugins/firebase"

export const strict = false

export const state = () => ({
  keys: [],
  note: {
    answers: [],
    title: "",
    num: 0,
    savedAt: null
  },
  key: null
})

export const mutations = {
  setKeys(state, keys) {
    state.keys = keys
  },
  initNote(state) {
    state.note.answers = []
    state.note.title = ""
    state.note.savedAt = null
  },
  setNote(state, data) {
    state.note = data
  },
  addAnswer(state, arr) {
    state.note.answers = state.note.answers.concat(arr)
  },
  setTitle(state, title) {
    state.note.title = title
  },
  setNum(state, n) {
    state.note.num = n
  },
  setKey(state, key) {
    state.key = key
  },
  setSavedAt(state) {
    state.note.savedAt = new Date().toISOString()
  }
}

export const actions = {
  async fullInit({ dispatch }) {
    dispatch("initNote")
    this.$router.push('/')
  },
  async initNote({ commit, dispatch }) {
    commit("initNote")
    commit("setKey", null)
    dispatch("changeNum", 20)
  },
  async changeNum({ commit, rootState }, n) {
    const range = n - rootState.note.note.answers.length
    if (range > 0) {
      let newArr = []
      for (let i = 0; i < range; i++) {
        newArr.push({ choice: '', memo: '', check: false })
      }
      commit('addAnswer', newArr)
    }
    commit('setNum', n)
  },
  async generateKey({ commit }) {
    const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-"
    const len = 48
    let key = ""
    for (let i = 0; i < len; i++) {
      key += str.charAt(Math.floor(Math.random() * str.length))
    }
    commit('setKey', key)
  },
  async saveNote({ commit, dispatch, rootState }) {
    if (rootState.note.key == null) {
      dispatch("generateKey")
    }
    commit("setSavedAt")
    let id
    if (rootState.auth.user) {
      id = rootState.auth.user.uid + "/" + rootState.note.key
    } else {
      id = "guest" + "/" + rootState.note.key
    }
    if (rootState.note.note.title == "") {
      commit("setTitle", new Date().toLocaleString())
    }
    firebase.database().ref("note/" + id).set(rootState.note.note)
    this.$router.push({ query: { id: rootState.note.key } })
  },
  async fetchNote({ commit, dispatch, rootState }, key) {
    let id
    if (rootState.auth.user) {
      id = rootState.auth.user.uid + "/" + key
    } else {
      id = "guest" + "/" + key
    }
    firebase.database().ref("note/" + id).on('value', (v) => {
      const data = v.val()
      if (data !== null) {
        commit('setNote', data)
        commit('setKey', key)
        this.$router.push({ query: { id: key } })
      } else {
        dispatch('initNote')
        this.$router.push("/")
      }
    })
  },
  async fetchNoteList({ commit, rootState }) {
    if (rootState.auth.user) {
      firebase.database().ref("note/" + rootState.auth.user.uid).orderByChild('savedAt').on('value', (v) => {
        console.log(typeof(v))
        const data = v.val()
        let keys = []
        for (let key in data) {
          keys.push({ key: key, title: data[key]['title'] })
        }
        console.log(keys)
        commit('setKeys', keys)
      })
    } else {
      commit('setKeys', [])
    }
  },
  async deleteNote({ commit, dispatch, rootState }) {
    if (rootState.note.key == null) {
      dispatch("generateKey")
    }
    commit("setSavedAt")
    let id
    if (rootState.auth.user) {
      id = rootState.auth.user.uid + "/" + rootState.note.key
    } else {
      id = "guest" + "/" + rootState.note.key
    }
    firebase.database().ref("note/" + id).remove()
    dispatch("fullInit")
  }
}

export const getters = {
  answerRows(state) {
    return state.note.answers.map(item => {
      return Math.max(item.memo.split("\n").length , 1)
    })
  }
}