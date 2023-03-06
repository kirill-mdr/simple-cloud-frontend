<template>
  <v-sheet class="bg-grey-lighten-5 h-screen d-flex align-center justify-center" rounded>
    <v-card class="px-6 py-8 w-auto" min-width="344px" title="User Registration">
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
        <v-text-field
          v-model="name"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          label="Name"
        ></v-text-field>

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

        <v-text-field
          v-model="password_confirmation"
          :readonly="loading"
          :rules="[required]"
          type="password"
          clearable
          label="Confirm password"
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
          Sign Up
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script>
import {useAuthStore} from "@/store/authStore";
import RequestService from "@/api/RequestService";
import router from "@/router";

export default {
  name: "RegistrationForm",
  data: () => ({
    form: false,
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
    loading: false,
  }),

  methods: {
    onSubmit () {
      const authStore = useAuthStore()
      if (!this.form) return

      this.loading = true
      RequestService.makeRegistration(
        {
          email: this.email,
          name: this.name,
          password: this.password,
          password_confirmation: this.password_confirmation
        }
      ).then(()=> authStore.setAuth(true))
        .then(() => router.push('/home'))
        .catch((error) => alert(error.response.data.message))
        .then(() => this.loading = false)
    },
    required (v) {
      return !!v || 'Field is required'
    },
  },
}
</script>

<style scoped>

</style>
