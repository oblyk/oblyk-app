<template>
  <div>
    <v-container class="global-form-width">
      <v-row>
        <v-col>
          <p class="text-center mb-7">
            <v-icon x-large>
              {{ mdiLock }}
            </v-icon>
          </p>
          <p class="text-center">
            {{ $t('components.gym.administratorRequired') }}
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mdiLock } from '@mdi/js'

export default {
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiLock
    }
  },

  head () {
    return {
      title: this.$t('meta.gym.requiredAdministrator')
    }
  }
}
</script>
