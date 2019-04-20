<template>
  <v-layout class="auth-loading" column wrap align-center justify-center>
    <v-progress-circular indeterminate size="100" width="7" color="blue lighten-1"></v-progress-circular>
    <!-- <p class="mt-3">Auth Loading...</p> -->
  </v-layout>
</template>

<style lang="scss" scoped>
.auth-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  color: #000;
  z-index: 100;
}
</style>
