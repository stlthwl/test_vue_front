<template>
  <div>
    <h1>Главная</h1>
    <div>
      <button v-if="isAuthenticated" @click="logout">Выйти</button>
      <div v-else>
        <button @click="openLoginModal">Вход</button>
        <button @click="openRegisterModal">Регистрация</button>
<!--        <router-link to="/home" class="btn">Перейти на HomePage</router-link>-->
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'HelloWorld',
  setup() {
    const modal = ref(null)
    const router = useRouter();
    const isAuthenticated = computed(() => !!localStorage.getItem('token'));

    const logout = () => {
      localStorage.removeItem('token'); // Удалите токен
      router.push({ name: 'HelloWorld' }); // Перенаправьте на главную страницу
      window.location.reload(); // Перезагрузить страницу для обновления состояния
    };

    const modalElement = document.getElementById('modalLogin');
    const registrationModalElement = document.getElementById('modalRegistration')

    const openLoginModal = () => {
      if (modalElement) {
        modal.value = new window.bootstrap.Modal(modalElement);
        modal.value.show(); // Показываем модальное окно
      }
    };

    const openRegisterModal = () => {
      if (registrationModalElement) {
        modal.value = new window.bootstrap.Modal(registrationModalElement);
        modal.value.show()
      }
    }

    return { isAuthenticated, logout, openLoginModal, openRegisterModal };
  }
}
</script>

<style scoped>

</style>