import firebase from "@/plugins/firebase"

export const strict = false

export const state = () => ({
  keys: [],
  key: null,
  note: []
})

export const mutations = {
  saveKeys(state, keys) {
    state.keys = keys
  },
  setNote(state, data) {
    state.note = data
  },
  addQestion(state, arr) {
    state.note.questions = state.note.questions.concat(arr)
  }
}

export const actions = {
  async saveNote({ commit, rootState }, [content, key]) {
    console.log("save ->", content, key, rootState.auth)
    let id
    if (rootState.auth.user) {
      id = rootState.auth.user.uid + "/" + key
    } else {
      id = "guest" + "/" + key
    }
    firebase.database().ref("note/" + id).set(content)
  },
  async fetchNoteList({ commit, rootState }) {
    if (rootState.auth.user) {
      firebase.database().ref("note/" + rootState.auth.user.uid).on('value', (v) => {
        const data = v.val()
        let keys = []
        for (let key in data) {
          keys.push({key: key, title: data[key]['title']})
        }
        console.log(keys)
        commit('saveKeys', keys)
      })
    }
  },
  async fetchNote({ commit, rootState }, [key]) {
    let id
    if (rootState.auth.user) {
      id = rootState.auth.user.uid + "/" + key
    } else {
      id = "guest" + "/" + key
    }
    firebase.database().ref("note/"+ id).on('value', (v) => {
      const data = v.val()
      if (data !== null) {
        commit('setNote', data)
      }
    })
  },
  addQuestion({ commit, rootState}, n) {
    console.log(rootState.note.note.questions.length)
    let newArr = new Array(n - rootState.note.note.questions.length)
    for (let i = 0; i < newArr.length; i++) {
      newArr[i] = { check: false, choice: '', memo: '' }
    }
    commit('addNote', newArr)
    
  }
}