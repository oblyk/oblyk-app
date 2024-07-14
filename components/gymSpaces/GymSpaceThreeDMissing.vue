<template>
  <div class="explain-plan-missing d-flex align-center justify-center">
    <div>
      <p class="text-center">
        <v-icon large>
          {{ mdiCubeOutline }}
        </v-icon>
      </p>
      <div v-if="currentUserIsGymAdmin()">
        <p
          class="text-center"
          v-html="$t('components.gymSpace.explainMissingThreeD', { name: gymSpace.name })"
        />
        <p class="text-center">
          <v-btn
            :to="`${gymSpace.path}/upload-3d`"
            outlined
          >
            {{ $t('actions.upload3D') }}
          </v-btn>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiCubeOutline } from '@mdi/js'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'

export default {
  name: 'GymSpaceThreeDMissing',
  mixins: [GymRolesHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    },
    gymSpace: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiCubeOutline
    }
  }
}
</script>
<style lang="scss" scoped>
.explain-plan-missing {
  width: 100%;
  height: 100%;
}
</style>
