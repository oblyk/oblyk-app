<template>
  <v-sheet class="d-flex">
    <div class="pa-2">
      <v-btn
        exact-path
        icon
        large
        to="/home/settings"
      >
        <v-icon color="primary">
          {{ mdiArrowLeft }}
        </v-icon>
      </v-btn>
    </div>
    <div class="d-flex flex-column justify-center">
      {{ $t(titleKey) }}
    </div>
  </v-sheet>
</template>

<script>
import { mdiArrowLeft } from '@mdi/js'
export default {
  name: 'SettingBackBtn',
  props: {
    titleKey: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      mdiArrowLeft
    }
  }
}
</script>
