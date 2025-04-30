import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../components/HelloWorld';
import HomePage from '../components/HomePage.vue';

const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld,
        meta: { requiresAuth: false }
    },
    {
        path: '/home',
        name: 'HomePage',
        component: HomePage,
        meta: { requiresAuth: true }
    },
    {
        path: '/:catchAll(.*)', // Обрабатывает все несуществующие маршруты
        redirect: { name: 'HomePage' } // Перенаправляет на главную страницу
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');

    // Если пользователь не авторизован и пытается перейти на защищенный маршрут
    if (to.meta.requiresAuth && !isAuthenticated) {
        const modalElement = document.getElementById('modalLogin');
        const modal = new window.bootstrap.Modal(modalElement);
        modal.show(); // Показываем модальное окно
        next(false); // Отмена перехода
    } else {
        next(); // Продолжить переход
    }
});

export default router;