<template>
  <div>
    <div
      v-if="!loadingWaitingFollowers && waitingFollowers.length > 0"
      class="mb-6"
    >
      <p class="mb-0">
        {{ $tc('components.user.waitingFollowers', waitingFollowers.length, { count: waitingFollowers.length } )}}
      </p>
      <v-row>
        <v-col
          class="col-sm-12 col-md-6"
          v-for="(waitingFollower, index) in waitingFollowers"
          :key="`waitingFollower-${index}`"
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
          class="col-sm-12 col-md-6 col-lg-3"
          v-for="(follower, index) in followers"
          :key="`follower-${index}`"
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
import { LoadingMoreHelpers } from '@/mixins/LoadingMoreHelpers'
import User from '@/models/User'
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import UserSmallCard from '@/components/users/UserSmallCard'
import Spinner from '@/components/layouts/Spiner'
import LoadingMore from '@/components/layouts/LoadingMore'
import UserAcceptSubscribesCard from '@/components/users/UserAcceptSubscribesCard'

export default {
  name: 'CurrentUserFollowersView',
  mixins: [LoadingMoreHelpers],
  components: { UserAcceptSubscribesCard, LoadingMore, Spinner, UserSmallCard },
  props: {
    user: Object
  },

  metaInfo () {
    return {
      title: this.$t('meta.currentUser.followers')
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

  mounted () {
    this.getSubscribes()
    this.getWaitingSubscribes()
  },

  methods: {
    getSubscribes: function () {
      this.moreIsBeingLoaded()
      CurrentUserApi
        .followers(this.page)
        .then(resp => {
          for (const follower of resp.data) {
            this.followers.push(follower)
          }
          this.successLoadingMore(resp)
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'user')
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loadingFollowers = false
          this.finallyMoreIsLoaded()
        })
    },

    getWaitingSubscribes: function () {
      this.loadingWaitingFollowers = true
      CurrentUserApi
        .waitingFollowers()
        .then(resp => {
          this.waitingFollowers = resp.data
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'user')
        })
        .finally(() => {
          this.loadingWaitingFollowers = false
        })
    },

    waitingCallback: function (change) {
      this.getWaitingSubscribes()
      if (change === 'accept') {
        this.loadingFollowers = true
        this.followers = []
        this.resetLoadMorePageNumber()
        this.getSubscribes()
      }
    },

    recordObject: function (data) {
      return new User(data)
    }
  }
}
</script>
