<template>
  <v-btn class="delete" icon="mdi-delete" @click="dialog = true"></v-btn>
  <v-dialog
    v-model="dialog"
    width="auto"
  >
    <v-card class="px-6 py-8" min-width="360px">
      <h2>When deleting nested elements will be deleted</h2>
      <v-btn color="error" @click="deleteFolder">
        Yes, confirm
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import RequestService from "@/api/RequestService";
import {useAuthStore} from "@/store/authStore";
import {useFilesStore} from "@/store/filesStore";

export default {
  name: "FolderCreateModal",
  data() {
    return {
      dialog: false,
      authStore: useAuthStore(),
      filesStore: useFilesStore()
    }
  },
  methods: {
    async deleteFolder() {
      await RequestService.deleteFolder(this.folder.id).then(() => {
        this.filesStore.currentFolderId = this.folder.parent_id
      }).then(() => this.dialog = false)
    }
  },
  props: {
    folder: {type: Object}
  }
}
</script>

<style lang="sass">
.delete
  position: absolute
  bottom: 5%
  right: 5%
</style>
