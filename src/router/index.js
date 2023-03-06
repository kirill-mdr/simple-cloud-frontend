// Composables
import {createRouter, createWebHistory} from 'vue-router'
import LoginView from "@/views/login/LoginView.vue";
import RegistrationView from "@/views/registration/RegistrationView.vue";
import HomeView from "@/views/home/HomeView.vue";
import {useAuthStore} from "@/store/authStore";



const routes = [
  {
    path: '/',
    component: LoginView,
    name: 'login'
  },
  {
    path: '/registration',
    component: RegistrationView,
    name: 'registration'
  },
  {
    path: '/home',
    component: HomeView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()
  if (!authStore.isAuth && to.name !== 'login' && to.name !== 'registration')
  {
    return { name: 'login' }
  }})
export default router
