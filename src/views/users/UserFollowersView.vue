<template>
  <v-container>
    <spinner v-if="loadingFollowers" />

    <div v-if="!loadingFollowers">
      <v-row>
        <v-col
          class="col-12 col-md-6 col-lg-4"
          v-for="(follower, index) in followers"
          :key="`follower-${index}`"
        >
          <user-small-card class="mb-2" :user="recordObject(follower)" />
        </v-col>
      </v-row>

      <loading-more
        :get-function="getSubscribes"
        :no-more-data="noMoreDataToLoad"
        :loading-more="loadingMoreData"
      />

      <p
        v-if="followers.length === 0 && !loadingFollowers"
        class="text-center text--disabled mt-5 mb-5"
      >
        {{ $t('components.user.followersEmpty', { name: user.first_name }) }}
      </p>
    </div>
  </v-container>
</template>

<script>
import UserApi from '@/services/oblyk-api/UserApi'
import User from '@/models/User'
import UserSmallCard from '@/components/users/UserSmallCard'
import Spinner from '@/components/layouts/Spiner'
import LoadingMore from '@/components/layouts/LoadingMore'
import { LoadingMoreHelpers } from '@/mixins/LoadingMoreHelpers'

export default {
  name: 'UserFollowersView',
  mixins: [LoadingMoreHelpers],
  components: { LoadingMore, Spinner, UserSmallCard },
  props: {
    user: Object
  },

  computed: {
    userMetaTitle: function () {
      return this.$t('meta.user.follower.title', { name: (this.user || {}).first_name })
    },
    userMetaDescription: function () {
      return this.$t('meta.user.follower.description', { name: (this.user || {}).first_name })
    },
    userMetaUrl: function () {
      if (this.user) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.user.path('followers')}`
      }
      return ''
    }
  },

  metaInfo () {
    return {
      title: this.userMetaTitle,
      meta: [
        { vmid: 'description', name: 'description', content: this.userMetaDescription },
        { vmid: 'og-title', property: 'og:title', content: this.userMetaTitle },
        { vmid: 'og-description', property: 'og:description', content: this.userMetaDescription },
        { vmid: 'og-url', property: 'og:url', content: this.userMetaUrl }
      ]
    }
  },

  data () {
    return {
      loadingFollowers: true,
      followers: []
    }
  },

  mounted () {
    this.getSubscribes()
  },

  methods: {
    getSubscribes: function () {
      this.moreIsBeingLoaded()
      UserApi
        .followers(this.user.uuid, this.page)
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

    recordObject: function (data) {
      return new User(data)
    }
  }
}
</script>
