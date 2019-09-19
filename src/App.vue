<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <Test/> -->
    <Getapi/>
    <Header/>
    <!-- <Index/> -->
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Test from './components/Test'
import Getapi from './components/Getapi'
import Header from './pages/home/components/Header'


export default {
  name: 'app',
  components: {
    Header,
    Getapi,
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    //刷新页面
     reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
}
</script>

<style>

</style>
