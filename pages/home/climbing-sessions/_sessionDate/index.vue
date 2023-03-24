<template>
  <v-container>
    <v-btn
      text
      exact
      to="/home/climbing-sessions"
    >
      <v-icon class="mr-2">
        {{ mdiArrowLeft }}
      </v-icon>
      {{ $t('components.climbingSession.list') }}
    </v-btn>

    <div v-if="!climbingSession">
      <v-skeleton-loader
        class="mt-3"
        type="article"
      />
      <v-row class="mt-1">
        <v-col>
          <v-btn text>
            <v-icon class="mr-2">
              {{ mdiArrowLeft }}
            </v-icon>
            ...
          </v-btn>
        </v-col>
        <v-col class="text-right">
          <v-btn text>
            ...
            <v-icon class="ml-2">
              {{ mdiArrowRight }}
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <div v-if="climbingSession">
      <v-card class="mt-5">
        <v-card-title>
          {{ $t('components.climbingSession.title', { date: humanizeDate(climbingSession.session_date) }) }}
        </v-card-title>
        <v-card-subtitle>
          {{ dateFromToday(climbingSession.session_date) }}
        </v-card-subtitle>
        <v-card-text>
          <climbing-session-detail :climbing-session="climbingSession" />
        </v-card-text>
      </v-card>

      <!-- Previous and next climbing session -->
      <v-row class="mt-3">
        <v-col
          v-if="climbingSession.previous_climbing_session"
        >
          <v-btn
            text
            class="px-2"
            :to="`/home/climbing-sessions/${climbingSession.previous_climbing_session}`"
          >
            <v-icon class="mr-2">
              {{ mdiArrowLeft }}
            </v-icon>
            {{ humanizeDate(climbingSession.previous_climbing_session, 'll') }}
          </v-btn>
        </v-col>
        <v-col
          v-if="climbingSession.next_climbing_session"
          class="text-right"
        >
          <v-btn
            text
            class="px-2"
            :to="`/home/climbing-sessions/${climbingSession.next_climbing_session}`"
          >
            {{ humanizeDate(climbingSession.next_climbing_session, 'll') }}
            <v-icon class="ml-2">
              {{ mdiArrowRight }}
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mdiArrowLeft, mdiArrowRight } from '@mdi/js'
import { DateHelpers } from '~/mixins/DateHelpers'
import { ClimbingSessionConcern } from '~/concerns/ClimbingSessionConcern'
import ClimbingSessionDetail from '~/components/climbingSessions/ClimbingSessionDetail.vue'

export default {
  components: {
    ClimbingSessionDetail
  },
  mixins: [
    ClimbingSessionConcern,
    DateHelpers
  ],

  data () {
    return {
      mdiArrowLeft,
      mdiArrowRight
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Ma session de grimpe du %{date}',
        metaDescription: "Les croix, lieux, grimpeurs et grimpeuses avec qui j'ai grimpé le %{date}"
      },
      en: {
        metaTitle: 'My climbing session on %{date}',
        metaDescription: 'My ascents, places, climbers with whom I climbed on %{date}'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle', { date: this.humanizeDate(this.climbingSession?.session_date) }),
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' },
        { hid: 'description', name: 'description', content: this.$t('metaDescription', { date: this.humanizeDate(this.climbingSession?.session_date) }) },
        { hid: 'og:title', property: 'og:title', content: this.$t('metaTitle', { date: this.humanizeDate(this.climbingSession?.session_date) }) },
        { hid: 'og:description', property: 'og:description', content: this.$t('metaDescription', { date: this.humanizeDate(this.climbingSession?.session_date) }) },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg` }
      ]
    }
  }
}
</script>
