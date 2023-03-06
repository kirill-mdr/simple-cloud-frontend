<template>
  <div class="folder">
    <img class="folder__img" alt="folder" src="@/assets/icons/folder.svg"/>
    <slot/>
  </div>
</template>

<script>
export default {
  name: "CustomFolder",
}
</script>

<style lang="sass">
.folder
  height: 96px
  width: 72px
  border-radius: 8px
  display: flex

  align-items: center
  flex-direction: column
  cursor: pointer
  &__img
    width: 72px
</style>
