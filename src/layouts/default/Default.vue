<template>
  <v-app>
    <v-app-bar :elevation="2"
               title="Simple Cloud"
               color="primary"
    >
      <template v-slot:append>
        <v-btn @click="logout" icon="mdi-exit-to-app"></v-btn>
      </template>
    </v-app-bar>
    <default-view />
  </v-app>
</template>

<script setup>
import DefaultView from './View.vue'
import RequestService from "@/api/RequestService";
import router from "@/router";
import {useAuthStore} from "@/store/authStore";

const authStore = useAuthStore()
const logout = async () => {
  router.push('/')
  await RequestService.logout().then(authStore.setAuth(false))
  localStorage.removeItem('isAuth')
  localStorage.removeItem('userInfo')
}

</script>
