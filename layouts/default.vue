<template>
  <v-app>
    <v-toolbar clipped-left fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer"/>
      <v-toolbar-title @click="toTop">4択解答メモ</v-toolbar-title>
      <v-spacer />
      <v-chip outline color="blue darken-3" v-if="$store.state.note.key"><v-avatar><v-icon>autorenew</v-icon></v-avatar>Autosaving</v-chip>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <div class="info-btn"><v-btn icon @click="info=true"><v-icon color="grey darken-2">info</v-icon></v-btn></div>
      <v-dialog v-model="info">
        <v-card>
          <v-card-title class="headline grey lighten-2">About "4択解答メモ"</v-card-title>
          <v-card-text>
            <p>"4択解答メモ"はTOEICなどの4択問題の解答と、各問のメモを記録するための簡易ツールです！</p>
            <p>問題番号をタップすることで、要注意問題としてマークを付けることが出来ます。
            <br>"表示切替"を使用するとマークした問題とメモのある問題のみを表示して、復習に活用することが出来ます。
            <br>設定アイコンから設問数を変更できます。
            <br>一応ストップウォッチ機能がついています。</p>
            <p>Googleのアカウントでログインすることで、ノートを自分のアカウントに保存し、一覧することが出来ます。
            <br>一度保存したノートは、変更があるたびにオートセーブされます。</p>
            <p>リポジトリ：<a href="https://github.com/izm51/four-choices-question-memo" target="_blank">Github</a>
            <br>Twitter：<a href="https://twitter.com/immzm51" target="_blank">@immzm51</a>
            <br>Blog：<a href="https://izm51.com/" target="_blank">Izm Log</a></p>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" flat @click="info=false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <the-drawer-login />
    </v-navigation-drawer>

    <v-content v-if="!isAuthLoading">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <auth-loading v-if="isAuthLoading" />

  </v-app>
</template>

<script>
import TheDrawerLogin from '@/components/TheDrawerLogin'
import AuthLoading from '@/components/AuthLoading'
import { mapActions } from 'vuex';

export default {
  components: {
    TheDrawerLogin,
    AuthLoading
  },
  data() {
    return {
      drawer: false,
      info: false,
    }
  },
  computed: {
    isAuthLoading() {
      return this.$store.state.auth.isAuthLoading
    }
  },
  methods: {
    ...mapActions({
      toTop: 'note/fullInit'
    })
  }
}
</script>

<style>
a {
  text-decoration: none;
  color: #222
}
.info-btn {
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>
