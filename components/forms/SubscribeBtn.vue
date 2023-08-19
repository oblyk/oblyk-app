<template>
  <client-only v-if="$auth.loggedIn">
    <v-btn
      class="subscribe-btn"
      :block="block"
      :outlined="large || outlined"
      :icon="!large"
      :loading="requesting"
      :title="label()"
      :text="typeText"
      :color="textColor"
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
  </client-only>
</template>

<script>
import { mdiStar, mdiStarOutline } from '@mdi/js'
import FollowApi from '~/services/oblyk-api/FollowApi'

export default {
  name: 'SubscribeBtn',
  props: {
    subscribeType: {
      type: String,
      required: true
    },
    subscribeId: {
      type: [Number, String],
      required: true
    },
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
      default: mdiStar
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
      default: mdiStarOutline
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
    },
    typeText: {
      type: Boolean,
      default: false
    },
    textColor: {
      type: String,
      default: ''
    },
    block: {
      type: Boolean,
      required: false
    },
    outlined: {
      type: Boolean,
      required: false
    }
  },

  data () {
    return {
      requesting: false,

      mdiStar,
      mdiStarOutline
    }
  },

  mounted () {
    if (this.$auth.loggedIn) {
      if (this.subscribed() && this.incrementable) {
        new FollowApi(this.$axios, this.$auth).increment(this.subscribeType, this.subscribeId)
      }
    }
  },

  methods: {
    subscribed () {
      return ['subscribe', 'subscribeRequestMade'].includes(this.subscribedStatus())
    },

    subscribedStatus () {
      let IAmSubscribed = 'unsubscribe'
      for (const subscribe of this.$auth.user.subscribes) {
        if (subscribe.followable_type === this.subscribeType && subscribe.followable_id === this.subscribeId) {
          IAmSubscribed = subscribe.accepted ? 'subscribe' : 'subscribeRequestMade'
        }
      }
      return IAmSubscribed
    },

    icon () {
      return this.subscribed() ? this.followedIcon : this.unfollowedIcon
    },

    color () {
      return this.subscribed() ? this.followedColor : ''
    },

    label () {
      if (this.subscribed()) {
        return this.subscribedStatus() === 'subscribe' ? this.$t(this.unsubscribeLabel) : this.$t(this.requestMadeLabel)
      } else {
        return this.$t(this.subscribeLabel)
      }
    },

    changeSubscription () {
      if (this.subscribed()) {
        if (!confirm(this.$t('actions.areYouSur').toString())) {
          return false
        }
      }

      this.requesting = true

      const data = {
        followable_id: this.subscribeId,
        followable_type: this.subscribeType
      }

      const promise = (this.subscribed()) ? new FollowApi(this.$axios, this.$auth).delete(data) : new FollowApi(this.$axios, this.$auth).create(data)

      promise
        .then(() => {
          this.$auth.fetchUser()
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
