<template>
  <div id="app">
    <nar-bar></nar-bar>
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
