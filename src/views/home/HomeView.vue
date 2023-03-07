<template>
  <router-view/>
</template>

<script setup>

import RequestService from "@/api/RequestService";
import {useFilesStore} from "@/store/filesStore";
import {onMounted, watch} from "vue";


const filesStore = useFilesStore()
onMounted(() => {
  setTimeout(async () => {
    await filesStore.setFiles()
  }, 1000)
})
watch(() => filesStore.currentFolderId, async () => {
  filesStore.currentFolder = await RequestService.getFolder(filesStore.currentFolderId).then(res => res.data)
})
</script>

<style scoped>

</style>
