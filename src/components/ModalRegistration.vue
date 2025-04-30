<template>
  <div class="modal fade" id="modalRegistration" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Login</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        </div>
        <form @submit.prevent="registration">
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
            <div class="mb-3">
              <label for="name" class="form-label">Имя</label>
              <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="name"
                  required
              >
            </div>
            <div class="mb-3">
              <label for="surname" class="form-label">Фамилия</label>
              <input
                  type="text"
                  class="form-control"
                  id="surname"
                  v-model="surname"
                  required
              >
            </div>
            <p v-if="message">{{message}}</p>
          </div>
          <div class="modal-footer">
            <button v-if="!confirmed" type="submit" class="btn btn-primary">Регистрация</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
// import router from "@/router";

export default {
  name: "ModalRegistration",
  setup() {
    const email = ref('');
    const password = ref('');
    const name = ref('');
    const surname = ref('');
    const message = ref('');
    const confirmed = ref(false);

    const registration = async () => {
      try {
        console.log(confirmed.value)
        const response = await axios.post(`${process.env.VUE_APP_BASE_URL}/register`, {
          email: email.value,
          name: name.value,
          surname: surname.value,
          password: password.value,
        });
        localStorage.setItem('token', response.data.access_token);
        message.value = 'Регистрация успешно выполнена!'
        confirmed.value = true
        // router.push('HomePage')
        // window.location.reload(); // Перезагрузить страницу для обновления состояния
      } catch (error) {
        console.error(error)
        message.value = 'Ошибка регистрации';
      }
    };

    return { email, password, name, surname, registration, message, confirmed };
  },
}
</script>

<style scoped>

</style>