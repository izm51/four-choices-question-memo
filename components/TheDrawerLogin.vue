<template>
  <v-layout column justify-start fill-height>
    <v-flex style="flex-grow: 0;">
      <v-layout column align-center text-xs-center>
        <v-flex class="mt-4">
          <v-avatar size="100">
            <img v-if="isAuthenticated" :src="user.photoURL" alt="">
            <v-icon v-else size="100">account_circle</v-icon>
          </v-avatar>
          <p class="subheading mt-3 mb-1">
            <template v-if="isAuthenticated">
              {{user.displayName}}
            </template>
            <template v-else>
              ゲストユーザー
            </template>
          </p>
          <div v-if="!isAuthenticated" @click="doLogin()" class="login-btn">
            <img :src="require('@/assets/img/btn_google_signin_light_normal_web.png')" alt="" width="150">
          </div>  
        </v-flex>
      </v-layout>
    </v-flex>
    <hr class="grey-lighten--4 mx-4 my-3">
    <v-btn outline color="blue" @click="fullInit"><v-icon>description</v-icon>新規作成</v-btn>
    <v-flex grow class="note-list">
      <v-list>
        <v-list-tile v-for="item in $store.state.note.keys" @click="goTo(item.key)" :key="item.key" active-class="">
          <v-list-tile-action>
            <v-icon>description</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>
    <hr class="grey-lighten--4 mx-4 mt-3" v-if="$store.getters['auth/isAuthenticated']">
    <v-flex align-self-center style="flex-grow: 0;" v-if="$store.getters['auth/isAuthenticated']">
      <logoutButton />
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from '@/plugins/firebase'
import { mapActions } from 'vuex'
import LogoutButton from '@/components/atoms/LogoutButton'

export default {
  components: {
    LogoutButton,
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },
    user() {
      return this.$store.state.auth.user
    }
  },
  async mounted () {
    let user = await new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => resolve(user))
    })
    this.setUser(user)
    this.fetchNoteList()
    this.toggleAuthLoading()
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
      setUser: 'auth/setUser',
      fetchNoteList: 'note/fetchNoteList',
      fullInit: 'note/fullInit',
      toggleAuthLoading: 'auth/toggleAuthLoading'
    }),
    doLogin () {
      this.login()
        .then(() => console.log('resloved'))
        .catch((err) => console.log(err))
    },
    goTo(to) {
      this.$store.dispatch("note/fetchNote", [to])
    }
  }
}
</script>

<style lang="scss" scoped>
.login-btn {
  &:hover {
    cursor: pointer;
  }
}
.note-list {
  height: 50px;
  overflow-y: scroll;
}
</style>
