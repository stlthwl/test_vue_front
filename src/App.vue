<template>
  <div id="app">
    <router-view />
    <ModalLogin />
    <ModalRegistration />
  </div>
</template>

<script>
import ModalLogin from './components/ModalLogin.vue';
import ModalRegistration from "./components/ModalRegistration";

export default {
  name: 'App',
  components: {
    ModalRegistration,
    ModalLogin
  }
}
</script>

<style>

</style>