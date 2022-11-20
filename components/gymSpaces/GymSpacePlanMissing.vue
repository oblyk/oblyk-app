<template>
  <div
    class="explain-plan-missing d-flex align-center justify-center"
    :class="$vuetify.breakpoint.mobile ? 'mobil-interface' : 'desktop-interface'"
  >
    <div>
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
  </div>
</template>

<script>
import { mdiMap } from '@mdi/js'
export default {
  name: 'GymSpacePlanMissing',
  props: {
    gymSpace: {
      type: Object,
      required: true
    }
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
  height: 100%;
  &.desktop-interface {
    padding-left: 450px;
  }
}
</style>
