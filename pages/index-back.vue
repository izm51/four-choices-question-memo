<template>
  <v-layout column :class="{result : result}">
    <div id="top">
      <input type="text" name="section" id="section-input" placeholder="Title" v-model="title">
      <stopwatch ref="stopwatch"></stopwatch>
      <v-icon @click="showSetting=!showSetting" class="settings">settings</v-icon>
      <template v-if="showSetting">
        <input type="text" v-model.number.lazy="num" class="number-question">問
      </template>
      <!-- <v-dialog v-model="showSettings" light>
        <v-card>
          <div>設問数：<input type="text" v-model.number.lazy="num" class="number-question"></div>
        </v-card>
      </v-dialog> -->
    </div>
    <div id="main">
      <div class="question" v-for="(q, i) in questions" :key="i" :class="{ marked : q.check || q.memo}" v-show="i<num">
        <input type="checkbox" :name="'check-'+i" :id="'check-'+i" class="check" v-model="q.check">
        <label :for="'check-'+i">
          <h2>{{i+1}}.</h2>
        </label>
        <div class="options">
          <div class="option" v-for="option in ['A', 'B', 'C', 'D']" :key="option">
            <input type="radio" :name="i" :id="i+'-'+option" class="radio" v-model="q.choice" :value="option">
            <label :for="i+'-'+option">
              <div class="radio-button">{{option}}</div>
            </label>
          </div>
        </div>
        <textarea :name="'memo-'+i" :id="'memo-'+i" class="memo" v-model="q.memo" :rows="rows[i]"></textarea>
      </div>
    </div>
    <input type="checkbox" name="mode" id="mode" class="mode" v-model="result">
    <v-layout justify-center id="bottom">
      <label for="mode">
        <div class="bottom-button" @click="$refs.stopwatch.pause()">表示切り替え</div>
      </label>
      <nuxt-link v-scroll-to="{el:'#top',offset: -100}" to>
        <div class="bottom-button">TOPへ</div>
      </nuxt-link>
      <div class="bottom-button" @click="saveData">SAVE</div>
    </v-layout>
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
      questions: [],
      num: 20,
      showSetting: false,
      key: null,
      title: "",
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },
    user() {
      return this.$store.state.auth.user
    },
    rows() {
      return this.questions.map(item => {
        return Math.max(item.memo.split("\n").length , 1)
      })
    }
  },
  watch: {
    num(newN, oldN) {
      if (newN > this.questions.length) {
        this.fillQuestions(newN)
      }
    }
  },
  created() {
    // this.antiReload()
    this.fillQuestions(this.num)
  },
  mounted() {
    // this.getData()
    this.fetchData()
  },
  methods: {
    antiReload() {
      window.addEventListener('beforeunload', function(e) {
        e.returnValue = 'reload';
      }, false);
    },
    fillQuestions(n) {
      let newArr = new Array(n - this.questions.length)
      for (let i = 0; i < newArr.length; i++) {
        newArr[i] = {check: false, choice: '', memo: ''}
      }
      this.questions = this.questions.concat(newArr)
    },
    fetchData() {
      if (this.$route.query.id !== undefined) {
        this.$store.dispatch("note/fetchNote", [this.$route.query.id])
      }

    },
    getData() {
      if (this.$route.query.id !== undefined) {
        let id
        if(this.isAuthenticated) {
          id = this.user.uid + "/" + this.$route.query.id
        } else {
          id = "guest/" + this.$route.query.id
        }
        const db = firebase.database().ref("note/" + id).on('value', (v) => {
          const data = v.val()
          if (data !== null) {
            this.questions = data.questions
            this.num = data.num
            this.title = data.title
            this.key = this.$route.query.id
          } else {
            this.$router.push("/")
          }
        })
      }
    },
    saveData() {
      if (this.key === null) {
        const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-"
        const len = 48
        this.key = ""
        for (let i = 0; i < len; i++) {
          this.key += str.charAt(Math.floor(Math.random() * str.length))
        }
      }

      if(this.title=="") {this.title=new Date().toLocaleString()}

      let content = {
        questions: this.questions,
        num: this.num,
        title: this.title,
        savedAt: new Date().toISOString()
      }

      this.$store.dispatch("note/saveNote", [content, this.key])

      this.$router.push({ query: { id: this.key } })

      
      // if (this.id == null) {
      //   const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";
      //   const len = 48;
      //   let result = "";
      //   for(var i=0;i<len;i++){
      //     result += str.charAt(Math.floor(Math.random() * str.length));
      //   }
      //   this.id = result
      // }
      // const db = firebase.database().ref(this.id).set({questions: this.questions, num: this.num, title: this.title})
      // this.$router.push({query: {id: this.id}})
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

