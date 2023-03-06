<template>
  <v-sheet class="bg-grey-lighten-5 h-screen d-flex align-center justify-center" rounded>
    <v-card class="px-6 py-8 w-auto" min-width="344px" title="Login">
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          type="password"
          clearable
          label="Password"
          placeholder="Enter your password"
        ></v-text-field>

        <br>

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          Sign In
        </v-btn>

        <br>
        <v-btn
          block
          color="teal-lighten-2"
          size="large"
          variant="elevated"
          to="/registration"
        >
          Sign Up
        </v-btn>

      </v-form>
    </v-card>
  </v-sheet>
</template>

<script>
import RequestService from "@/api/RequestService";
import {useAuthStore} from "@/store/authStore";
import router from "@/router";

export default {
  name: "LoginForm",
  data: () => ({
    form: false,
    loading: false,
    email: null,
    password: null,
  }),
  methods: {
    onSubmit() {
      const authStore = useAuthStore()
      if (!this.form) return

      this.loading = true
      RequestService.makeLogin(
        {
          email: this.email,
          password: this.password
        }
      ).then(() => authStore.setAuth(true))
        .then(() => router.push('/home'))
        .catch((error) => alert(error.response.data.message))
        .then(() => this.loading = false)
    },
    required(v) {
      return !!v || 'Field is required'
    },
  },
}
</script>

<style scoped>

</style>
