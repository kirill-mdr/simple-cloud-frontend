<template>
  <FolderView @setCurrentFolderId="setCurrentFolderId" :content="filesStore.currentFolder"/>
</template>

<script setup>
import {useAuthStore} from "@/store/authStore";
import {onMounted, reactive, watch} from "vue";
import RequestService from "@/api/RequestService";
import FolderView from "@/components/app/FolderView.vue";
import {useFilesStore} from "@/store/filesStore";

const authStore = useAuthStore()

const state = reactive({
  homeFolder: {},
  currentFolder: {},
  currentFolderId: 0,
})

const filesStore = useFilesStore()
onMounted(() => {
  setTimeout(async () => {
    await filesStore.setFiles()
  }, 1000)
})
const setCurrentFolderId = (id) => {
  filesStore.currentFolderId = id
}

watch(() => filesStore.currentFolderId, async () => {
  filesStore.currentFolder = await RequestService.getFolder(filesStore.currentFolderId).then(res => res.data)
})

</script>

<style scoped>

</style>
