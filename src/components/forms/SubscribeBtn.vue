<template>
  <v-btn
    class="subscribe-btn"
    v-if="isLoggedIn"
    :outlined="large"
    :icon="!large"
    :loading="requesting"
    @click.prevent="changeSubscription()"
  >
    <v-icon
      :left="large"
      :color="color()"
    >
      {{ icon() }}
    </v-icon>
    <span v-if="large">
      {{ label() }}
    </span>
  </v-btn>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import FollowApi from '@/services/oblyk-api/FollowApi'
import store from '@/store'

export default {
  name: 'SubscribeBtn',
  mixins: [SessionConcern],
  props: {
    subscribeType: String,
    subscribeId: Number,
    incrementable: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      requesting: false
    }
  },

  created () {
    if (this.subscribed() && this.incrementable) {
      FollowApi.increment(this.subscribeType, this.subscribeId)
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

<style>
.subscribe-btn {
  font-family: "Roboto", sans-serif;
}
</style>
