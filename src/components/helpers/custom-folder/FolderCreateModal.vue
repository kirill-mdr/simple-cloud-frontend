<template>
  <v-btn class="me-8" icon="mdi-folder-plus" @click="dialog = true"></v-btn>
  <v-dialog
    v-model="dialog"
    width="auto"
  >
    <v-card class="px-6 py-8" min-width="360px" title="Create folder">
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
        <v-text-field
          v-model="name"
          :readonly="loading"
          :rules="[required]"
          class="mb-2 mt-5"
          clearable
          label="Название папки"
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
          Create folder
        </v-btn>

      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import RequestService from "@/api/RequestService";
import {useFilesStore} from "@/store/filesStore";

export default {
  name: "FolderCreateModal",
  data() {
    return {
      form: false,
      loading: false,
      dialog: false,
      name: null
    }
  },
  methods: {
    onSubmit() {
      if (!this.form) return

      this.loading = true
      RequestService.createFolder(this.folder.id,
        {
          folder_name: this.name,
        }
      ).then(() => {
        const filesStore = useFilesStore()
        filesStore.setFiles()
      }).then(() => {
        this.dialog = false
        this.name = null
      })
        .catch((error) => alert(error.response.data.message))
        .then(() => this.loading = false)
    },
    required(v) {
      return !!v || 'Field is required'
    },
  },
  props: {
    folder: {type: Object}
  }
}
</script>

<style scoped>

</style>
