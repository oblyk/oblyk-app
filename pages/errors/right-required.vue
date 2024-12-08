<template>
  <v-container class="common-page-container">
    <div class="my-14 text-center">
      <v-icon
        x-large
        color="amber darken-2"
      >
        {{ mdiDoorClosedLock }}
      </v-icon>
      <p class="mt-4 text--disabled">
        Vous n'avez pas les droits nécessaire pour accéder à cette ressource.
      </p>
    </div>
  </v-container>
</template>
<script>
import { mdiDoorClosedLock } from '@mdi/js'

export default {
  data () {
    return {
      mdiDoorClosedLock
    }
  },

  head () {
    return {
      title: 'Droits requis',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ]
    }
  }
}
</script>
