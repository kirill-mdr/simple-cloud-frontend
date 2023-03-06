<template>
  <div class="file" @click="showModal = true">
    <img class="file__img" alt="file" src="@/assets/icons/file.svg"/>
    <slot/>
    <FileModal :file="file" @close="showModal = false" v-if="showModal"/>
  </div>
</template>

<script>
import FileModal from "@/components/helpers/custom-file/FileModal.vue";

export default {
  name: "CustomFile",
  components: {FileModal},
  data(){
    return {
      showModal: false,
  }
  },
  props: {
    file: {type: Object}
  }
}
</script>

<style lang="sass">
.file
  height: 96px
  width: 100px
  border-radius: 8px
  display: flex
  align-items: center
  flex-direction: column
  cursor: pointer
  word-wrap: break-word
  text-wrap: normal
  &__img
    width: 72px
</style>
