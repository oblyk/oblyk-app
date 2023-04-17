<template>
  <v-card v-if="!IHaveAnAnswer">
    <v-card-title>
      {{ $t('components.user.bePartPartner') }}
    </v-card-title>
    <div class="px-4 pb-4">
      <v-row>
        <v-col
          :style="`max-width: ${$vuetify.breakpoint.mobile ? 130 : 160}px`"
        >
          <v-img
            class="mt-4"
            contain
            src="/svg/enable-partner-search.svg"
          />
        </v-col>
        <v-col>
          {{ $t('components.user.bePartPartnerExplain') }}
          <div class="mt-2 mb-3 text-right text-md-left">
            <v-btn
              :block="$vuetify.breakpoint.mobile"
              outlined
              text
              to="/about/partner-search"
            >
              {{ $t('common.pages.find.climbers.howItWorks.title') }}
            </v-btn>
          </div>
          <div class="text-right">
            <v-btn
              right
              text
              color="primary"
              @click="no()"
            >
              {{ $t('actions.no') }}
            </v-btn>
            <v-btn
              right
              elevation="0"
              color="primary"
              @click="yes()"
            >
              {{ $t('actions.yes') }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
    <overlay-form :overlay="answerSending" />
  </v-card>
</template>

<script>
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
import OverlayForm from '@/components/forms/OverlayForm'

export default {
  name: 'EnablePartnerSearch',
  components: { OverlayForm },
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      IHaveAnAnswer: false,
      answerSending: false
    }
  },

  methods: {
    no () {
      this.answerSending = true
      new CurrentUserApi(this.$axios, this.$auth)
        .update({ partner_search: false })
        .then(() => {
          this.IHaveAnAnswer = true
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'user')
        })
        .finally(() => {
          this.answerSending = false
        })
    },

    yes () {
      this.answerSending = true
      new CurrentUserApi(this.$axios, this.$auth)
        .update({ partner_search: true })
        .then(() => {
          this.$auth.fetchUser().then(() => {
            this.$router.push(`${this.user.currentUserPath}/settings/partner`)
          })
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'user')
        })
        .finally(() => {
          this.answerSending = false
        })
    }
  }
}
</script>
