<template>
  <v-container
    v-if="gym"
    class="global-form-width"
  >
    <v-row>
      <v-col v-if="currentUserIsGymAdmin()">
        <p class="text-center mb-7">
          <v-icon x-large>
            {{ mdiMapLegend }}
          </v-icon>
        </p>
        <p class="text-center">
          {{ $t('components.gym.firstSpaceExplain') }}
        </p>

        <div v-if="gym.gym_grades_count === 0">
          <p class="text-center">
            {{ $t('components.gym.createDifficultyFirst') }}
          </p>

          <p class="text-center">
            <v-btn
              text
              color="primary"
              :to="`${gym.path}/first-difficulty-system`"
            >
              {{ $t('components.gym.difficultySystem') }}
            </v-btn>
          </p>
        </div>
        <p v-if="gym.gym_grades_count > 0" class="text-center mt-10">
          <v-btn
            color="primary"
            :to="`/a${gym.path}/spaces/new`"
          >
            {{ $t('components.gym.createFirstSpace') }}
          </v-btn>
        </p>
      </v-col>

      <v-col v-else>
        <p class="text--disabled text-center">
          {{ $t('components.gym.administratorRequired') }}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiMapLegend } from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'
import { GymConcern } from '@/concerns/GymConcern'

export default {
  mixins: [SessionConcern, GymConcern],

  data () {
    return {
      mdiMapLegend
    }
  },

  head () {
    return {
      title: this.firstSpaceMetaTitle,
      meta: [
        { hid: 'description', name: 'description', content: this.firstSpaceMetaDescription },
        { hid: 'og:title', property: 'og:title', content: this.firstSpaceMetaTitle },
        { hid: 'og:description', property: 'og:description', content: this.firstSpaceMetaDescription },
        { hid: 'og:url', property: 'og:url', content: this.firstSpaceMetaUrl }
      ]
    }
  },

  computed: {
    firstSpaceMetaTitle () {
      return this.$t('meta.gym.space.firstTilte', { name: (this.gym || {}).name })
    },

    firstSpaceMetaDescription () {
      return this.$t('meta.gym.space.firstDescription', { name: (this.gym || {}).name })
    },

    firstSpaceMetaUrl () {
      if (this.gym) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.gym.path}/first-space`
      }
      return ''
    }
  },

  methods: {
    userCanTouch () {
      return this.isLoggedIn && (!this.gym.administered || this.currentUserIsGymAdmin())
    }
  }
}
</script>
