<template>
  <v-btn small flat @click="doLogout()"><v-icon left>exit_to_app</v-icon>Logout</v-btn>
</template>
<script>
import { mapActions } from "vuex";

export default {
    methods: {
    ...mapActions({
      logout: "auth/logout",
      fetchNoteList: 'note/fetchNoteList',
      initNote: 'note/initNote'
    }),
    doLogout() {
      this.logout()
        .then(() => {
          this.$router.push("/");
          this.fetchNoteList()
        })
        .catch(err => console.log(err))
    }
  }
}
</script>
