<template>
  <div class="pt-10 pb-5">
    <p class="text-center">
      <v-icon x-large>
        {{ mdiVectorPolygon }}
      </v-icon>
    </p>
    <p class="text-center">
      {{ $t('components.gymSector.clicOnPlan') }}
    </p>
    <p class="text-center">
      {{ $t('components.gymSector.clicOnFinish') }}
    </p>
    <p class="text-center mt-10">
      <v-btn
        text
        outlined
        color="primary"
        @click="stopEditingSectorPolygon()"
      >
        {{ $t('actions.finish') }}
      </v-btn>
    </p>
  </div>
</template>

<script>
import { mdiVectorPolygon } from '@mdi/js'

export default {
  name: 'GymSectorEditingPlan',

  data () {
    return {
      mdiVectorPolygon
    }
  },

  methods: {
    stopEditingSectorPolygon () {
      this.$root.$emit('showEditingExplain', false)
      this.$root.$emit('stopEditingSectorPolygon')
    }
  }
}
</script>
