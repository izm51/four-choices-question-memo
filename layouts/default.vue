<template>
  <v-app>
    <v-toolbar clipped-left fixed app>
      <v-toolbar-title><nuxt-link to="/">4択解答</nuxt-link></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
}
</script>

<style>
a {
  text-decoration: none;
  color: #222
}
</style>
