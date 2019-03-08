<template>
  <v-layout column :class="{result : result}">
    <div id="top">
      <input type="text" name="section" id="section-input" placeholder="Title">
      <stopwatch ref="stopwatch"></stopwatch>
    </div>
    <div id="main">
      <div class="question" v-for="i in questions" :key="i" :class="{ marked : check[i] || memo[i]}">
        <input type="checkbox" :name="'check-'+i" :id="'check-'+i" class="check" v-model="check[i]">
        <label :for="'check-'+i">
          <h2>{{i}}.</h2>
        </label>
        <div class="options">
          <div class="option" v-for="option in ['A', 'B', 'C', 'D']" :key="option">
            <input type="radio" :name="i" :id="i+'-'+option" class="radio">
            <label :for="i+'-'+option">
              <div class="radio-button">{{option}}</div>
            </label>
          </div>
        </div>
        <textarea :name="'memo-'+i" :id="'memo-'+i" class="memo" v-model="memo[i]" :rows="rows[i]"></textarea>
      </div>
    </div>
    <input type="checkbox" name="mode" id="mode" class="mode" v-model="result">
    <label for="mode">
      <div class="mode-button" @click="$refs.stopwatch.pause()">表示切り替え</div>
    </label>
  </v-layout>
</template>

<script>
import Stopwatch from '@/components/stopwatch.vue'
export default {
  components: {
    Stopwatch
  },
  data() {
    return {
      result: false,
      questions: 20,
      check: [],
      memo: ['','','','','','','','','','','','','','','','','','','','',''],
    }
  },
  computed: {
    rows() {
      return this.memo.map(item => {
        return Math.max(item.split("\n").length , 1)
      })
    }
  },
  mounted() {
  }
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
div.mode-button {
  border: 1px solid #333;
  width: fit-content;
  padding: 2px 10px;
  font-weight: bold;
  margin: 10px auto;
}
.result {
  #top {
    font-weight: bold;
    font-size: 150%;
    .reset-button {
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

