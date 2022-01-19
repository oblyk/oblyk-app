<template>
  <v-card v-if="offerToUpload">
    <v-card-text>
      <v-icon left color="primary">
        mdi-account-circle
      </v-icon>
      <span v-html="$t('components.user.uploadAvatar')" />
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
        :to="`${user.currentUserPath}/settings/avatar`"
        right
        text
        color="primary"
      >
        {{ $t('actions.uploadAvatar') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'AvatarMissing',
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
      localStorage.setItem('dontAskMeAgainAboutAvatar', 'true')
      this.setOffer()
    },

    setOffer () {
      this.offerToUpload = !(this.user.avatar || localStorage.getItem('dontAskMeAgainAboutAvatar') === 'true')
    }
  }
}
</script>
