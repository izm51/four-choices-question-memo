<template>
  <v-layout column :class="{result : result}">
    <div id="top">
      <input type="text" name="section" id="section-input" placeholder="Title" v-model.lazy="title" @change="autoSave">
      <stopwatch ref="stopwatch"></stopwatch>
      <v-icon @click="showSetting=!showSetting" class="settings">settings</v-icon>
      <template v-if="showSetting">
        <input type="number" min="0" max="200" v-model.number.lazy="num" class="number-question" @change="autoSave">問
      </template>
    </div>
    <div id="main">
      <div class="question" v-for="(q, i) in answers" :key="i" :class="{ marked : q.check || q.memo}" v-show="i<num">
        <input type="checkbox" :name="'check-'+i" :id="'check-'+i" class="check" v-model="q.check" @change="autoSave">
        <label :for="'check-'+i">
          <h2>{{i+1}}.</h2>
        </label>
        <div class="options">
          <div class="option" v-for="option in ['A', 'B', 'C', 'D']" :key="option">
            <input type="radio" :name="i" :id="i+'-'+option" class="radio" v-model="q.choice" :value="option" @change="autoSave">
            <label :for="i+'-'+option">
              <div class="radio-button">{{option}}</div>
            </label>
          </div>
        </div>
        <textarea :name="'memo-'+i" :id="'memo-'+i" class="memo" v-model="q.memo" :rows="rows[i]" @change="autoSave"></textarea>
      </div>
    </div>
    <v-layout justify-center id="bottom">
      <v-btn dark small color="blue" @click="switchView"><v-icon>cached</v-icon>表示切替</v-btn>
      <nuxt-link v-scroll-to="{el:'#top',offset: -100}" to>
        <v-btn dark small color="gray"><v-icon>arrow_upward</v-icon>一番上へ</v-btn>
      </nuxt-link>
      <v-btn dark small color="light-green" @click="saveNote" v-if="!$store.state.note.key"><v-icon>save</v-icon>新規保存</v-btn>
      <v-btn dark small color="red" @click="deleteNote" v-if="$store.state.note.key"><v-icon>delete_forever</v-icon>削除</v-btn>
    </v-layout>
    <v-snackbar bottom :timeout="3000" v-model="saved">保存されました！<br>以後オートセーブされます。<v-btn flat @click="saved=false"><v-icon>close</v-icon></v-btn></v-snackbar>
    <v-snackbar bottom :timeout="3000" v-model="deleted">消去されました。<v-btn flat @click="deleted=false"><v-icon>close</v-icon></v-btn></v-snackbar>
  </v-layout>
</template>

<script>
import Stopwatch from '@/components/stopwatch.vue'
import firebase from '~/plugins/firebase.js'
export default {
  components: {
    Stopwatch
  },
  data() {
    return {
      result: false,
      showSetting: false,
      saved: false,
      deleted: false
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },
    user() {
      return this.$store.state.auth.user
    },
    answers() {
      return this.$store.state.note.note.answers
    },
    title: {
      get() {
        return this.$store.state.note.note.title
      },
      set(val) {
        this.$store.commit("note/setTitle", val)
      }
    },
    num: {
      get() {
        return this.$store.state.note.note.num
      },
      set(val) {
        this.$store.dispatch("note/changeNum", val)
      }
    },
    rows() {
      return this.$store.getters['note/answerRows']
    }
  },
  created() {
    // this.antiReload()
  },
  mounted() {
    this.$store.dispatch("note/fetchNote", this.$route.query.id)
  },
  methods: {
    antiReload() {
      window.addEventListener('beforeunload', function(e) {
        e.returnValue = 'reload';
      }, false);
    },
    saveNote() {
      this.saved = true;
      this.$store.dispatch("note/saveNote")
      this.$store.dispatch("note/fetchNoteList")
    },
    autoSave() {
      if(this.$store.state.note.key !== null) {
        this.$store.dispatch("note/saveNote")
        this.$store.dispatch("note/fetchNoteList")
      }
    },
    deleteNote() {
      if (window.confirm("削除すると元には戻せません。本当に消去しますか？")) {
        this.$store.dispatch("note/deleteNote")
        this.deleted = true
      }
    },
    switchView() {
      this.result = !this.result
      this.$refs.stopwatch.pause()
    }
  },
}
</script>

<style lang="scss">
#top {
  display: flex;
  overflow: hidden;
  max-width: 100vw;
  align-items: center;
  justify-content: space-between;
  input#section-input {
    // border: 1px #000 solid;
    background: #fff;
    border-style: inset;
    width: 100%;
  }
  .settings {
    width: fit-content;
  }
  input.number-question {
    background: #fff;
    border-style: inset;
    width: 20px;
  }
}
div#main {
  max-width: 100vw;
  overflow: hidden;
}
div.question {
  margin: 10px 0;
  font-size: 130%;
  $height: 26px;
  display: flex;
  input.check {
    display: none;
  }
  h2 {
    height: $height;
    line-height: $height;
    width: 45px;
    flex-shrink: 0;
  }
  input.check:checked + label h2 {
    color: red;
  }
  div.options {
    display: flex;
    .option {
      margin-left: 5px;
      input[type=radio] {
        display: none;
      }
      div.radio-button {
        border: 1px solid #333;
        width: fit-content;
        border-radius: 45%;
        height: $height;
        line-height: $height - 2px;
        box-sizing: border-box;
      }
      input[type=radio].radio:checked+label div.radio-button {
        background: #333;
        color: #fff;
      }
    }
  }
  .memo {
    background: #fff;
    border-style: inset;
    width: 100%;
    resize: none;
    margin-top: 1px;
    margin-left: 10px;
  }
}
input.mode {
  display: none;
}
#bottom a{
  text-decoration: none;
}
div.bottom-button {
  border: 1px solid #333;
  width: fit-content;
  padding: 2px 10px;
  font-weight: bold;
  margin: 10px 0;
  color: #000;
}
.result {
  #top {
    font-weight: bold;
    font-size: 150%;
    .reset-button {
      display: none;
    }
    .settings, .number-question {
      display: none;
    }
  }
  .question {
    display: none;
    font-size: 100%;
    $height: 22px;
    margin: 5px 0;
    h2 {
      height: $height;
      line-height: $height;
      width: 30px;
      font-weight: normal;
    }
    div.options {
      .option {
        div.radio-button {
          height: $height;
          line-height: $height - 2px;
        }
      }
    }
    &.marked {
      display: flex;
    }
  }
  input[type=text], textarea {
    background: transparent!important;
    border-style: none!important;
  }
}
</style>

