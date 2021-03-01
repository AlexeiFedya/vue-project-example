<template>
  <div id="app">
    <AppNavbar text="Example"/>
    <router-view/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import AppNavbar from './components/app-navbar/AppNavbar'
// import AppMainRate from './components/app-main-rate/AppMainRate'
// import AppMainRateCript from './components/app-main-rate-cript/AppMainRateCript'

export default {
  name: 'App',
  components: {
    AppNavbar
  }
}
</script>

<style src="./app.css">

</style>
