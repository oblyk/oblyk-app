<template>
  <div>
    <v-container class="common-page-container">
      <v-skeleton-loader
        v-if="!contest"
        class="mt-2"
        type="card-avatar"
      />
      <div v-else>
        <v-img
          dark
          height="400px"
          max-height="400px"
          gradient="to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%"
          :lazy-src="contest.thumbnailBannerUrl"
          :src="contest.bannerUrl"
          class="rounded"
        >
          <template #placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              />
            </v-row>
          </template>
          <v-row
            class="fill-height ma-0 py-4"
            align="end"
            justify="center"
          >
            <div class="text-center">
              <h1 class="mb-n1">
                {{ contest.name }}
              </h1>
              <p
                v-if="contest.start_date === contest.end_date"
                class="subtitle-1 mb-0"
              >
                {{ humanizeDate(contest.start_date) }}
              </p>
              <p v-else>
                Du {{ humanizeDate(contest.start_date) }} au {{ humanizeDate(contest.end_date) }}
              </p>
            </div>
          </v-row>
        </v-img>
        <v-tabs class="rounded mt-3">
          <v-tab
            exact-path
            :to="contest.path"
          >
            <v-icon left>
              {{ mdiInformation }}
            </v-icon>
            Information
          </v-tab>
          <v-tab
            v-if="token"
            exact-path
            :to="`${contest.path}/my-contest`"
          >
            <v-icon left>
              {{ mdiHumanGreeting }}
            </v-icon>
            Mon contest
          </v-tab>
          <v-tab
            exact-path
            :to="`${contest.path}/results`"
          >
            <v-icon left>
              {{ mdiPodium }}
            </v-icon>
            Résultat
          </v-tab>
        </v-tabs>
        <nuxt-child
          :contest="contest"
          :update-token="updateToken"
        />
      </div>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { mdiInformation, mdiHumanGreeting, mdiPodium } from '@mdi/js'
import AppFooter from '~/components/layouts/AppFooter.vue'
import { ContestConcern } from '~/concerns/ContestConcern'
import { DateHelpers } from '~/mixins/DateHelpers'
import ContestParticipantApi from '~/services/oblyk-api/ContestParticipantApi'

export default {
  components: { AppFooter },
  meta: { orphanRoute: true },
  mixins: [ContestConcern, DateHelpers],
  layout: 'contest',

  data () {
    return {
      token: null,

      mdiInformation,
      mdiHumanGreeting,
      mdiPodium
    }
  },

  watch: {
    '$store.state.contestToken.contestTokens': {
      handler () {
        this.token = this.$store.getters['contestToken/getContestToken'](this.$route.params.contestId)
      },
      deep: true
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    const urlToken = urlParams.get('token')
    if (urlToken) {
      this.$store.dispatch('contestToken/setContestToken', { contestId: this.$route.params.contestId, token: urlToken })
      this.token = urlToken
    } else {
      this.token = this.$store.getters['contestToken/getContestToken'](this.$route.params.contestId)
    }
    this.getParticipant()
  },

  methods: {
    getParticipant () {
      if (!this.token) {
        return false
      }
      new ContestParticipantApi(this.$axios, this.$auth)
        .participant(
          this.$route.params.gymId,
          this.$route.params.contestId,
          this.token
        )
        .catch(() => {
          this.$store.dispatch('contestToken/resetToken', this.$route.params.contestId)
        })
    },

    updateToken (token) {
      this.token = token
    }
  }
}
</script>
