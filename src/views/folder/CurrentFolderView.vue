<template>
  <FolderView @setCurrentFolderId="setCurrentFolderId" :content="filesStore.currentFolder"/>
</template>

<script setup>

import {useFilesStore} from "@/store/filesStore";
import FolderView from "@/components/app/FolderView.vue";

const filesStore = useFilesStore()

const setCurrentFolderId = (id) => {
  filesStore.currentFolderId = id
}


</script>

<style scoped>

</style>
