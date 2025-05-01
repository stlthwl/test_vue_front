<template>
  <div class="modal fade" id="modalRegistration" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Регистрация</h1>
          <button type="button" id="close-modal-registration" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
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
            <div v-if="message"
                 :class="{
                  'alert': true,
                  'alert-success': confirmed,
                  'alert-danger': !confirmed
                 }"
                 role="alert"
            >
              {{message}}
            </div>
            <p>
              <a href="#" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                 @click="openLoginModal">
                Уже есть учетная запись?
              </a>
            </p>
          </div>
          <div class="modal-footer">
<!--            <button type="button" class="btn btn-outline-secondary" @click="openLoginModal">Вход</button>-->
            <button :disabled="confirmed" id="registration-btn" type="submit" class="btn btn-success">Зарегистрироваться</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
import { Modal } from 'bootstrap'
// import router from "@/router"

export default {
  name: "ModalRegistration",
  setup() {
    const email = ref('')
    const password = ref('')
    const message = ref('')
    const confirmed = ref(false)

    const registration = async () => {
      try {
        const response = await axios.post(`${process.env.VUE_APP_BASE_URL}/register`, {
          email: email.value,
          password: password.value,
        });

        localStorage.setItem('token', response.data.access_token)
        message.value = 'Регистрация успешно выполнена'
        confirmed.value = true
      } catch (error) {
        message.value = error.response ? error.response.data.detail : error.message
      }
    }

    const openLoginModal = () => {
      const loginModalEl = document.getElementById('modalLogin')
      if (loginModalEl) {
        const closeBtn = document.getElementById('close-modal-registration')
        closeBtn?.click()
        setTimeout(() => {
          const modal = new Modal(loginModalEl)
          modal.show()
        }, 100)
      }
    }

    return { email, password, registration, message, confirmed, openLoginModal }
  },
}
</script>

<style scoped>

</style>