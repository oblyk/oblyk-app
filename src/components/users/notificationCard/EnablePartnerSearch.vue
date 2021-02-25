<template>
  <v-card v-if="!IHaveAnAnswer">
    <div class="d-flex flex-no-wrap justify-start">
      <v-avatar
        class="ma-3"
        size="170"
        width="170"
        tile
      >
        <v-img contain :src="require('@/assets/svgs/enable-partner-search.svg')"></v-img>
      </v-avatar>
      <div class="flex-grow-1">
        <v-card-title>
          {{ $t('components.user.bePartPartner') }}
        </v-card-title>

        <v-card-text>
          {{ $t('components.user.bePartPartnerExplain') }}
        </v-card-text>

        <v-card-actions>
          <v-spacer />
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
            text
            color="primary"
            @click="yes()"
          >
            {{ $t('actions.yes') }}
          </v-btn>
        </v-card-actions>
      </div>
    </div>
    <overlay-form :overlay="answerSending" />
  </v-card>
</template>

<script>
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import OverlayForm from '@/components/forms/OverlayForm'

export default {
  name: 'EnablePartnerSearch',
  components: { OverlayForm },
  props: {
    user: Object
  },

  data () {
    return {
      IHaveAnAnswer: false,
      answerSending: false
    }
  },

  methods: {
    no: function () {
      this.answerSending = true
      CurrentUserApi
        .update({ partner_search: false })
        .then(() => {
          this.IHaveAnAnswer = true
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'user')
        })
        .finally(() => {
          this.answerSending = false
        })
    },

    yes: function () {
      this.answerSending = true
      CurrentUserApi
        .update({ partner_search: true })
        .then(() => {
          this.$router.push(this.user.currentUserPath('settings/partner'))
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'user')
        })
        .finally(() => {
          this.answerSending = false
        })
    }
  }
}
</script>
