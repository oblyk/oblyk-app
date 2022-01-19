<template>
  <v-card v-if="offerToUpload">
    <v-card-text>
      <v-icon left color="primary">
        mdi-panorama
      </v-icon>
      <span v-html="$t('components.user.uploadBanner')" />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        right
        text
        x-small
        @click="no()"
      >
        {{ $t('actions.dontAskMeAgain') }}
      </v-btn>
      <v-btn
        :to="`${user.currentUserPath}/settings/banner`"
        right
        text
        color="primary"
      >
        {{ $t('actions.uploadBanner') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'BannerMissing',
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      offerToUpload: null
    }
  },

  mounted () {
    this.setOffer()
  },

  methods: {
    no () {
      localStorage.setItem('dontAskMeAgainAboutBanner', 'true')
      this.setOffer()
    },

    setOffer () {
      this.offerToUpload = !(this.user.banner || localStorage.getItem('dontAskMeAgainAboutBanner') === 'true')
    }
  }
}
</script>
