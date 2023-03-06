<template>
  <div class="file-modal" @click.stop="() => $emit('close')">
    <div class="file-modal__window" @click.stop>
      <img class="file-modal__img" alt="file" src="@/assets/icons/file.svg"/>
      <h1 class="file-modal__name" @click="isEdit=true" v-if="!isEdit">{{name}} <v-icon icon="mdi-pencil" size="x-small"></v-icon></h1>
      <v-text-field v-if="isEdit" v-model="name" @keydown.enter="updateFileName"></v-text-field>
      <p style="font-size: 12px">{{file.name}}</p>
      <p>{{file.size}}</p>
      <p>{{file.created_at}}</p>
      <v-btn
        color="primary"
        class="mt-8"
        @click="downloadFile"
      >
        Download
      </v-btn>
      <v-btn
        color="error"
        class="mt-8"
        @click="deleteFile"
      >
        Delete
      </v-btn>
    </div>
  </div>
</template>


<script setup>
import {onMounted, ref, defineEmits} from "vue";
import RequestService from "@/api/RequestService";
import router from "@/router";
import {useAuthStore} from "@/store/authStore";
import {useFilesStore} from "@/store/filesStore";


const filesStore = useFilesStore()

const isEdit = ref(false)
const name = ref('')

const props = defineProps({
  file: {type: Object}
})

onMounted(() => {
  name.value = props.file.name_without_ext
})

const updateFileName = async () => {
  console.log('enter')
  await RequestService.editFileName(props.file.id, {name: name.value})
  isEdit.value = false
  await filesStore.setFiles()
}

const downloadFile = async () => {
  await RequestService.downloadFile(props.file.id, props.file.name)
}
const emit = defineEmits(['close'])
const deleteFile = async ( ) => {
  await RequestService.deleteFile(props.file.id)
  emit('close')
  await filesStore.setFiles()
}
</script>

<style lang="sass">
.file-modal
  width: 100vw
  height: 100vh
  position: absolute
  display: flex
  justify-content: center
  align-items: center
  background: rgba(0,0,0,0.25)
  top: 0
  left: 0
  cursor: default
  &__window
    width: 90vw
    padding: 24px
    background: #ffffff
    border-radius: 16px
    display: flex
    flex-direction: column
  &__img
    width: 120px
  &__name
    cursor: pointer
    display: flex
    align-items: center
</style>
