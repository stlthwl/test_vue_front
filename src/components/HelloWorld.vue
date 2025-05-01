<template>
  <nav class="navbar bg-body-tertiary fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Logo</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
<!--      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">-->
      <div class="offcanvas offcanvas-end" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <div v-if="isAuthenticated" class="d-flex gap-2">
            <button @click="logout" class="btn btn-outline-dark" type="button">Выход</button>
          </div>
          <div v-else class="d-flex gap-2">
            <button @click="openLoginModal" class="btn btn-outline-dark" type="button">Вход</button>
            <button @click="openRegisterModal" class="btn btn-outline-dark" type="button">Регистрация</button>
          </div>
          <button type="button" id="btn-offcanvas-close" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Закрыть"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Главная</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Modal } from 'bootstrap'

export default {
  name: 'HelloWorld',
  setup() {
    const modal = ref(null)
    const router = useRouter()
    const isAuthenticated = computed(() => !!localStorage.getItem('token'))
    const loginModalEl = document.getElementById('modalLogin')
    const registrationModalEl = document.getElementById('modalRegistration')

    const openLoginModal = () => {
      const canvasCloseBtn = document.getElementById('btn-offcanvas-close')
      canvasCloseBtn?.click()
      if (loginModalEl) {
        setTimeout(() => {
          modal.value = new Modal(loginModalEl)
          modal.value.show()
        }, 300)
      }
    }

    const openRegisterModal = () => {
      const canvasCloseBtn = document.getElementById('btn-offcanvas-close')
      canvasCloseBtn?.click()
      if (registrationModalEl) {
        setTimeout(() => {
          modal.value = new Modal(registrationModalEl)
          modal.value.show()
        }, 300)
      }
    }

    const logout = () => {
      localStorage.removeItem('token') // Удалите токен
      router.push({ name: 'HelloWorld' }) // Перенаправьте на главную страницу
      window.location.reload() // Перезагрузить страницу для обновления состояния
    };

    return { isAuthenticated, logout, openLoginModal, openRegisterModal }
  }
}
</script>

<style scoped>

</style>