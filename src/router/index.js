// Composables
import {createRouter, createWebHistory} from 'vue-router'
import LoginView from "@/views/login/LoginView.vue";
import RegistrationView from "@/views/registration/RegistrationView.vue";
import HomeView from "@/views/home/HomeView.vue";
import {useAuthStore} from "@/store/authStore";
import CurrentFolderView from "@/views/folder/CurrentFolderView.vue";


const routes = [
  {
    path: '/login',
    component: LoginView,
    name: 'login'
  },
  {
    path: '/registration',
    component: RegistrationView,
    name: 'registration'
  },
  {
    path: '/',
    component: HomeView,
    redirect: '/home',
    name: 'main',
    children: [{
      path: '/home',
      name: 'home',
      component: CurrentFolderView
    }]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()
  if (!authStore.isAuth && to.name !== 'login' && to.name !== 'registration') {
    return {name: 'login'}
  }
  if (authStore.isAuth && to.name === 'main') {
    return {name: 'home'}
  }
})

export default router
