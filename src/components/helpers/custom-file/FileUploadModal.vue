<template>
  <v-btn icon="mdi-upload" @click="dialog = true"></v-btn>
  <v-dialog
    v-model="dialog"
    width="auto"
  >
    <v-card class="px-6 py-8" min-width="360px" title="Upload file">
      <v-file-input
        class="mt-5"
        label="File input"
        v-model="file"
        type='file'
      ></v-file-input>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!file"
          :loading="loading"
          block
          color="success"
          size="large"
          variant="elevated"
          @click="uploadFile()">
          Upload file
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import RequestService from "@/api/RequestService";
import {useFilesStore} from "@/store/filesStore";

export default {
  name: "FileUploadModal",
  data() {
    return {
      form: false,
      loading: false,
      dialog: false,
      file: null
    }
  },
  methods: {
    async uploadFile() {
      if (!this.file) return

      this.loading = true
      const formData = new FormData();
      formData.append('file', this.file[0]);
      await RequestService.uploadFile(
        this.folder.id,
        formData
      ).then(() => {
        const filesStore = useFilesStore()
        filesStore.setFiles()
      }).then(() => {
        this.dialog = false
      })
        .catch((error) => alert(error.response.data.message))
        .then(() => this.loading = false)
    },
  },
  props: {
    folder: {type: Object}
  }
}
</script>

<style scoped>

</style>
