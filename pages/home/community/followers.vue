<template>
  <div>
    <div
      v-if="!loadingWaitingFollowers && waitingFollowers.length > 0"
      class="mb-6"
    >
      <p class="mb-0">
        {{ $tc('components.user.waitingFollowers', waitingFollowers.length, { count: waitingFollowers.length } ) }}
      </p>
      <v-row>
        <v-col
          v-for="(waitingFollower, index) in waitingFollowers"
          :key="`waitingFollower-${index}`"
          class="col-sm-12 col-md-6"
        >
          <user-accept-subscribes-card
            :user="recordObject(waitingFollower)"
            :callback="waitingCallback"
          />
        </v-col>
      </v-row>
    </div>

    <spinner v-if="loadingFollowers" />

    <div v-if="!loadingFollowers">
      <v-row>
        <v-col
          v-for="(follower, index) in followers"
          :key="`follower-${index}`"
          class="col-sm-12 col-md-6 col-lg-3"
        >
          <user-small-card
            :small="true"
            :user="recordObject(follower)"
          />
        </v-col>
      </v-row>

      <loading-more
        :get-function="getSubscribes"
        :no-more-data="noMoreDataToLoad"
        :loading-more="loadingMoreData"
      />

      <!-- No followers -->
      <p
        v-if="followers.length === 0"
        class="text-center text--disabled mt-5 mb-5"
      >
        {{ $t('components.user.followersEmpty', { name: user.first_name }) }}
      </p>
    </div>
  </div>
</template>

<script>
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import User from '~/models/User'
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
import UserSmallCard from '~/components/users/UserSmallCard.vue'
import Spinner from '~/components/layouts/Spiner.vue'
import LoadingMore from '~/components/layouts/LoadingMore.vue'
import UserAcceptSubscribesCard from '~/components/users/UserAcceptSubscribesCard.vue'

export default {
  components: {
    UserAcceptSubscribesCard,
    LoadingMore,
    Spinner,
    UserSmallCard
  },
  mixins: [LoadingMoreHelpers],
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingFollowers: true,
      followers: [],

      loadingWaitingFollowers: true,
      waitingFollowers: []
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Mes abonnées'
      },
      en: {
        metaTitle: 'My followers'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  mounted () {
    this.getSubscribes()
    this.getWaitingSubscribes()
  },

  methods: {
    getSubscribes () {
      this.moreIsBeingLoaded()
      new CurrentUserApi(this.$axios, this.$auth)
        .followers(this.page)
        .then((resp) => {
          for (const follower of resp.data) {
            this.followers.push(follower)
          }
          this.successLoadingMore(resp)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'user')
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loadingFollowers = false
          this.finallyMoreIsLoaded()
        })
    },

    getWaitingSubscribes () {
      this.loadingWaitingFollowers = true
      new CurrentUserApi(this.$axios, this.$auth)
        .waitingFollowers()
        .then((resp) => {
          this.waitingFollowers = resp.data
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'user')
        })
        .finally(() => {
          this.loadingWaitingFollowers = false
        })
    },

    waitingCallback (change) {
      this.getWaitingSubscribes()
      if (change === 'accept') {
        this.loadingFollowers = true
        this.followers = []
        this.resetLoadMorePageNumber()
        this.getSubscribes()
      }
    },

    recordObject (data) {
      return new User({ attributes: data })
    }
  }
}
</script>
