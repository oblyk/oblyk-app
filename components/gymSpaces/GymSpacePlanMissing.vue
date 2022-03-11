<template>
  <div class="explain-plan-missing">
    <p class="text-center">
      <v-icon large>
        {{ mdiMap }}
      </v-icon>
    </p>
    <p
      class="text-center"
      v-html="$t('components.gymSpace.explainMissingPlan', { name: gymSpace.name })"
    />
    <p class="text-center">
      <v-btn
        :to="`${gymSpace.path}/upload-plan`"
        outlined
      >
        {{ $t('actions.uploadMap') }}
      </v-btn>
    </p>
  </div>
</template>

<script>
import { mdiMap } from '@mdi/js'
export default {
  name: 'GymSpacePlanMissing',
  props: {
    gymSpace: Object
  },

  data () {
    return {
      mdiMap
    }
  }
}
</script>
<style lang="scss" scoped>
.explain-plan-missing {
  width: 100%;
  margin-top: 5em;
}
</style>
