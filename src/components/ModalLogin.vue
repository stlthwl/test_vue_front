<template>
  <div class="modal fade" id="modalLogin" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Login</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        </div>
        <form @submit.prevent="login">
          <div class="modal-body">
            <div class="mb-3">
              <label for="email" class="form-label">Адрес электронной почты</label>
              <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="email"
                  required
              >
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Пароль</label>
              <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                  required
              >
            </div>
            <p v-if="errorMessage">{{ errorMessage }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
            <button type="submit" class="btn btn-primary">Войти</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import router from "@/router";

export default {
  name: "ModalLogin",
  setup() {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const login = async () => {
      try {
        const response = await axios.post(`${process.env.VUE_APP_BASE_URL}/login`, {
          email: email.value,
          password: password.value,
        });
        localStorage.setItem('token', response.data.access_token);
        router.push('home')

        const modalElement = document.getElementById('modalLogin');
        if (modalElement) {
          const event = new KeyboardEvent('keydown', { key: 'Escape' });
          modalElement.dispatchEvent(event);
        }

        // window.location.reload(); // Перезагрузить страницу для обновления состояния
      } catch (error) {
        errorMessage.value = 'Неверные учетные данные';
      }
    };

    return { email, password, login, errorMessage };
  },
}
</script>

<style scoped>

</style>