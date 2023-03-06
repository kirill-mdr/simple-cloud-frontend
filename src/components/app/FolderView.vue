<template>
  <v-container>
    <div class="mb-8 d-flex">
      <v-btn class="mr-8" @click="setId(content.parent_id)" icon="mdi-arrow-left" v-if="authStore.userInfo.home_folder_id !== filesStore.currentFolderId">
      </v-btn>
      <FolderCreateModal :folder="content"/>
      <FileUploadModal :folder="content"/>
    </div>
    <div class="d-flex">
      <CustomFolder @click="setId(folder.id)" v-for="folder in content.folders" :key="folder.id">{{folder.name.replace(/(.{7})..+/, "$1…")}}</CustomFolder>
      <CustomFile  v-for="file in content.files" :key="file.id" :file="file">{{file.name.replace(/(.{7})..+/, "$1…")}}</CustomFile>
    </div>
    <FolderDeleteModal :folder="content" v-if="authStore.userInfo.home_folder_id !== filesStore.currentFolderId"/>
  </v-container>
</template>

<script>
import CustomFolder from "@/components/helpers/custom-folder/CustomFolder.vue";
import CustomFile from "@/components/helpers/custom-file/CustomFile.vue";
import FileModal from "@/components/helpers/custom-file/FileModal.vue";
import FileUploadModal from "@/components/helpers/custom-file/FileUploadModal.vue";
import {useAuthStore} from "@/store/authStore";
import {useFilesStore} from "@/store/filesStore";
import FolderCreateModal from "@/components/helpers/custom-folder/FolderCreateModal.vue";
import FolderDeleteModal from "@/components/helpers/custom-folder/FolderDeleteModal.vue";


export default {

  name: "FolderView",
  components: {FolderCreateModal, FileUploadModal, FileModal, CustomFolder, CustomFile, FolderDeleteModal},
  data() {
    return {
      authStore: useAuthStore(),
      filesStore: useFilesStore(),
    }
  },
  props: {
    content: {type: Object}
  },
  methods: {
    setId(id){
      this.$emit('setCurrentFolderId', id)
    }
  }
}
</script>

<style scoped>

</style>
