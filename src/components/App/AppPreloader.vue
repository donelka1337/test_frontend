<template>
  <div class="progress-bar">
    <v-overlay>
      <v-progress-circular
        color="primary"
        indeterminate
        :size="100"
      />
    </v-overlay>
  </div>
</template>
<script>
export default {
  name: 'AppPreloader',
}
</script>
<style scoped>
  .progress-bar {
    position: fixed;
    top:50%;
    left: 50%;
    z-index: 1000;
  }
</style>