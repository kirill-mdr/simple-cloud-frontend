<template>
  <Default v-if="authStore.isAuth">
    <router-view/>
  </Default>
  <router-view v-else/>
</template>

<script setup>
import AppLayout from "@/layout/AppLayout.vue";
import {useAuthStore} from "@/store/authStore";
import Default from "@/layouts/default/Default.vue";
import {onMounted} from 'vue'
const authStore = useAuthStore()


</script>
