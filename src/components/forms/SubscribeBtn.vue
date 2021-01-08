<template>
  <v-btn
    v-if="isLoggedIn"
    outlined
  >
    <v-icon
      left
      :color="color()"
    >
      {{ icon() }}
    </v-icon>
    {{ label() }}
  </v-btn>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'

export default {
  name: 'SubscribeBtn',
  mixins: [SessionConcern],
  props: {
    subscribeType: String,
    subscribeId: Number
  },

  methods: {
    subscribed: function () {
      return this.iAmSubscribedToThis(this.subscribeType, this.subscribeId)
    },

    icon: function () {
      return this.subscribed() ? 'mdi-star' : 'mdi-star-outline'
    },

    color: function () {
      return this.subscribed() ? 'amber' : ''
    },

    label: function () {
      return this.subscribed() ? this.$t('actions.unsubscribe') : this.$t('actions.subscribe')
    }
  }
}
</script>
