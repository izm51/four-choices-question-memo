<template>
  <div class="stopwatch">
    <span class="time" v-html="dispTime" @click="click()"></span>
    <div class="reset-button" @click="reset()">Reset</div>
  </div>
</template>

<style>
    
</style>

<script>
export default {
  data() {
    return {
      state: "paused",
      time: 0,
      interval: null
    }
  },
  mounted() {
    // this.interval = setInterval(this.updateCurrentTime, 100);
  },
  destroyed() {
    clearInterval(this.interval)
  },
  computed: {
    dispTime() {
      return this.hours + ':' + this.minutes + ':' + this.seconds + '.' + this.milliseconds;
    },
    milliseconds() {
      return this.time % 10;
    },
    hours() {
      let hrs = Math.floor((this.time / 10 / 60 / 60));
      return hrs >= 10 ? hrs : '0' + hrs;
    },
    minutes() {
      let min = Math.floor((this.time / 10 / 60) % 60);
      return min >= 10 ? min : '0' + min;
    },
    seconds() {
      let sec = Math.ceil((this.time / 10) % 60);
      return sec >= 10 ? sec : '0' + sec;
    }
  },
  methods: {
    reset() {
      this.pause()
      this.time = 0
    },
    start() {
      this.interval = setInterval(this.updateCurrentTime, 100);
      this.state = "started"
    },
    pause() {
      clearInterval(this.interval)
      this.state = "paused"
    },
    updateCurrentTime() {
      this.time++
    },
    click() {
      if (this.state == "paused") {
        this.start()
      } else {
        this.pause()
      }
    }      
  }
} 
</script>

<style lang="scss">
.stopwatch {
  display: flex;
  .time {
    margin: 0 5px;
    height: 23px;
    line-height: 23px;
  }
  .reset-button {
    border: 1px #ccc solid;
    border-radius: 25px;
    padding: 0 5px;
    height: 23px;
    line-height: 21px;
  }
}
</style>