<template>
  <v-btn
    v-if="isLoggedIn"
    outlined
    :loading="requesting"
    @click="changeSubscription()"
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
import FollowApi from '@/services/oblyk-api/followApi'
import store from '@/store'

export default {
  name: 'SubscribeBtn',
  mixins: [SessionConcern],
  props: {
    subscribeType: String,
    subscribeId: Number
  },

  data () {
    return {
      requesting: false
    }
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
    },

    changeSubscription: function () {
      this.requesting = true

      const data = {
        followable_id: this.subscribeId,
        followable_type: this.subscribeType
      }

      const promise = (this.subscribed()) ? FollowApi.delete(data) : FollowApi.create(data)

      promise
        .then(resp => {
          console.log(resp)
          store.dispatch('auth/updateSubscribes', {
            subscribes: resp.data
          })
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => {
          this.requesting = false
        })
    }
  }
}
</script>
