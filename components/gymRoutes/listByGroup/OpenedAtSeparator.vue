<template>
  <div class="rounded-pill py-1 px-4 back-app-color mb-1 d-flex align-center">
    <v-icon left>
      {{ mdiCalendar }}
    </v-icon>
    <div class="font-weight-bold mr-auto">
      {{ humanizeDate(openedAt) }}
    </div>
  </div>
</template>

<script>
import { mdiCalendar } from '@mdi/js'
import { DateHelpers } from '~/mixins/DateHelpers'

export default {
  name: 'OpenedAtSeparator',
  mixins: [DateHelpers],
  props: {
    openedAt: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      mdiCalendar
    }
  }
}
</script>
