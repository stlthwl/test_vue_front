<template>
  <div class="modal fade" id="modalLogin" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Вход</h1>
          <button type="button" id="close-modal-login" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        </div>
        <form @submit.prevent="login">
          <div class="modal-body">
            <div class="mb-3">
              <label for="login-email" class="form-label">Адрес электронной почты</label>
              <input
                  type="email"
                  class="form-control"
                  id="login-email"
                  v-model="email"
                  required
              >
            </div>
            <div class="mb-3">
              <label for="login-password" class="form-label">Пароль</label>
              <input
                  type="password"
                  class="form-control"
                  id="login-password"
                  v-model="password"
                  required
              >
            </div>
            <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
            <p>
              <a href="#" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                 @click="openRegisterModal">
                Регистрация
              </a>
            </p>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-success">Войти</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from "@/router"
import { ref } from 'vue'
import { Modal } from 'bootstrap'

export default {
  name: "ModalLogin",
  setup() {
    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')

    const login = async () => {
      try {
        const response = await axios.post(`${process.env.VUE_APP_BASE_URL}/login`, {
          email: email.value,
          password: password.value,
        });
        localStorage.setItem('token', response.data.access_token)
        router.push('home')

        const closeBtn = document.getElementById('close-modal-login')
        closeBtn?.click()
      } catch (error) {
        console.error(error)
        errorMessage.value = error.response ? error.response.data.detail : error.message
      }
    }

    const openRegisterModal = () => {
      const registrationModalEl = document.getElementById('modalRegistration')
      if (registrationModalEl) {
        const closeBtn = document.getElementById('close-modal-login')
        closeBtn?.click()
        setTimeout(() => {
          const registrationModal = new Modal(registrationModalEl)
          registrationModal.show()
        }, 100)
      }
    }

    return { email, password, login, errorMessage, openRegisterModal };
  }
}
</script>

<style scoped>

</style>