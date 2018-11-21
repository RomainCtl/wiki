<template>
  <div id="app">
    <nar-bar></nar-bar>
    <!-- file d'ariane ? (or sidebar with structure like a tree) -->
    <router-view/>
    <div id="down"></div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  name: 'App',
  components: {
    'nar-bar': NavBar
  },
  created: function(){
    if (this.$route.fullPath == "/") this.$router.push({path: "/viewer/home"});
  }
}
</script>

<style>
@font-face {
  font-family: Exo;
  src: url('./assets/fonts/Exo-SemiBold.otf');
}
#app {
  font-family: Exo;
  padding-top: 50px;
}
</style>
