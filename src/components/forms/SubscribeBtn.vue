<template>
  <v-btn
    class="subscribe-btn"
    v-if="isLoggedIn"
    :outlined="large"
    :icon="!large"
    :loading="requesting"
    :title="label()"
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
    subscribeId: [Number, String],
    incrementable: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: true
    },
    followedIcon: {
      type: String,
      default: 'mdi-star'
    },
    followedColor: {
      type: String,
      default: 'amber'
    },
    waitingFollowColor: {
      type: String,
      default: 'pink'
    },
    unfollowedIcon: {
      type: String,
      default: 'mdi-star-outline'
    },
    subscribeLabel: {
      type: String,
      default: 'actions.subscribe'
    },
    unsubscribeLabel: {
      type: String,
      default: 'actions.unsubscribe'
    },
    requestMadeLabel: {
      type: String,
      default: 'actions.cancelRequest'
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
      return ['subscribe', 'subscribeRequestMade'].includes(this.subscribedStatus())
    },

    subscribedStatus: function () {
      return this.iAmSubscribedToThis(this.subscribeType, this.subscribeId)
    },

    icon: function () {
      return this.subscribed() ? this.followedIcon : this.unfollowedIcon
    },

    color: function () {
      return this.subscribed() ? this.followedColor : ''
    },

    label: function () {
      if (this.subscribed()) {
        return this.subscribedStatus() === 'subscribe' ? this.$t(this.unsubscribeLabel) : this.$t(this.requestMadeLabel)
      } else {
        return this.$t(this.subscribeLabel)
      }
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
          this.$root.$emit('alertFromApiError', err, 'follow')
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
