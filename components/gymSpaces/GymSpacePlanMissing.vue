<template>
  <div
    class="explain-plan-missing d-flex align-center justify-center"
    :class="$vuetify.breakpoint.mobile ? 'mobile-interface' : 'desktop-interface'"
  >
    <div>
      <p class="text-center">
        <v-icon large>
          {{ mdiMap }}
        </v-icon>
      </p>
      <div v-if="currentUserIsGymAdmin()">
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
  </div>
</template>

<script>
import { mdiMap } from '@mdi/js'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'

export default {
  name: 'GymSpacePlanMissing',
  mixins: [GymRolesHelpers],
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
