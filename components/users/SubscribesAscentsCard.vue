<template>
  <div :class="collapse ? 'subscribes-ascents-collapsed' : null">
    <climbing-session session-type="SubscribesClimbingSession" />
    <div
      v-if="collapse"
      class="show-more-subscribes-ascents"
    >
      <v-btn
        text
        @click="collapse = false"
      >
        {{ $t('actions.see') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import { DateHelpers } from '~/mixins/DateHelpers'
import ClimbingSession from '~/components/climbingSessions/ClimbingSession'

export default {
  name: 'SubscribesAscentsCard',
  components: { ClimbingSession },
  mixins: [DateHelpers],
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      collapse: true
    }
  }
}
</script>

<style lang="scss">
.subscribes-ascents-collapsed {
  .show-more-subscribes-ascents {
    display: none;
  }
}
.theme--dark {
  .subscribes-ascents-collapsed .show-more-subscribes-ascents {
    background: linear-gradient(rgba(30, 30, 30, 0) 0%, rgba(30, 30, 30, 0.8) 50%, rgba(30, 30, 30, 1) 100%);
  }
}
.theme--light {
  .subscribes-ascents-collapsed .show-more-subscribes-ascents {
    background: linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 1) 100%);
  }
}
@media only screen and (max-width: 600px) {
  .subscribes-ascents-collapsed {
    height: 200px;
    overflow-y: hidden;
    position: relative;
    .show-more-subscribes-ascents {
      display: block;
      position: absolute;
      bottom: 0;
      height: 150px;
      padding-top: 105px;
      padding-bottom: 10px;
      width: 100%;
      background: linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 1) 100%);
      text-align: center;
    }
  }
}
</style>
