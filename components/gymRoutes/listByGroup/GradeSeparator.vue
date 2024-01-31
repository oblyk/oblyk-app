<template>
  <div class="rounded-pill py-1 pl-2 back-app-color mb-1 d-flex align-center">
    <v-icon
      left
      :color="gradeValueToColor(grade)"
    >
      {{ mdiCircle }}
    </v-icon>
    <div>
      <strong v-html="gradeValueToText(grade)" />
    </div>
  </div>
</template>

<script>
import { mdiCircle } from '@mdi/js'
import { GradeMixin } from '~/mixins/GradeMixin'

export default {
  name: 'GradeSeparator',
  mixins: [GradeMixin],
  props: {
    grade: {
      type: [String, Number],
      required: true
    }
  },

  data () {
    return {
      mdiCircle
    }
  }
}
</script>
