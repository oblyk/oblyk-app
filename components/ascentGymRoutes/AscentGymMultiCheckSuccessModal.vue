<template>
  <v-dialog
    v-model="multiCheckSuccessModal"
    max-width="350"
  >
    <v-card class="pa-4">
      <h2 class="mb-2 text-center">
        {{ $t('common.congratulations') }} 🥳
      </h2>
      <p
        class="mb-1"
        v-html="$t('components.ascentGymRoute.youHaveAddedXAscents', { count: `<strong style='color: #743ad5; font-size: 1.2em'>${ascentsAddedCount}</strong>` })"
      />
      <p class="mb-0 text--disabled pl-1">
        <small>
          {{ $t('common.seeMyEtc') }}
        </small>
      </p>
      <v-row no-gutters class="mb-4">
        <v-col>
          <v-card
            :to="`/home/climbing-sessions?only-indoor=true&back_to=${$route.fullPath}`"
            class="back-app-color py-2 mr-2 text-center"
          >
            <v-icon large>
              {{ mdiCommentBookmark }}
            </v-icon>
            <p class="mb-0 text--disabled font-weight-bold text-lowercase">
              {{ $t('common.sessions') }}
            </p>
          </v-card>
        </v-col>
        <v-col v-if="gym.display_ranking">
          <v-card
            :to="`${gym.path}/ranking?back_to=${$route.fullPath}`"
            class="back-app-color py-2 text-center"
          >
            <v-icon large>
              {{ mdiTrophyOutline }}
            </v-icon>
            <p class="mb-0 text--disabled font-weight-bold text-lowercase">
              {{ $t('components.gymRanking.rank') }}
            </p>
          </v-card>
        </v-col>
        <v-col>
          <v-card
            :to="`/home/ascents/indoor?back_to=${$route.fullPath}`"
            class="back-app-color py-2 ml-2 text-center"
          >
            <v-icon large>
              {{ mdiChartBar }}
            </v-icon>
            <p class="mb-0 text--disabled font-weight-bold text-lowercase">
              {{ $t('common.stats') }}
            </p>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center">
        <v-btn
          color="primary"
          elevation="0"
          @click="multiCheckSuccessModal = false"
        >
          {{ $t('common.backToGuidebook') }}
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  mdiChartBar,
  mdiTrophyOutline,
  mdiCommentBookmark
} from '@mdi/js'

export default {
  name: 'AscentGymMultiCheckSuccessModal',
  props: {
    gym: {
      type: Object,
      required: true
    },
    ascentsAddedCount: {
      type: Number,
      default: null
    }
  },

  data () {
    return {
      multiCheckSuccessModal: false,

      mdiChartBar,
      mdiTrophyOutline,
      mdiCommentBookmark
    }
  },

  methods: {
    toggleModal (open = true) {
      this.multiCheckSuccessModal = open
    }
  }
}
</script>
