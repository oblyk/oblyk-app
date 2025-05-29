<template>
  <v-sheet>
    <v-list-item>
      <v-list-item-action>
        <v-btn
          icon
          color="primary"
          exact-path
          to="/home/settings"
        >
          <v-icon>
            {{ mdiArrowLeft }}
          </v-icon>
        </v-btn>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>
          {{ $t(titleKey) }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
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
