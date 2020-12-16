<template>
  <div class="spinner-area">
    <v-row class="spinner-row">
     <v-col align-self="center">
       <v-progress-circular
         :size="50"
         color="primary"
         indeterminate
       />
     </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'Spinner'
}
</script>
<style lang="scss">
.spinner-area {
  height: calc(100vh - 64px);
  width: 100%;
  text-align: center;
  .spinner-row {
    height: 100%;
  }
}
</style>
