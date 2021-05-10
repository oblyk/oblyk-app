<template>
  <v-container>
    <spinner v-if="loadingFollowers" />

    <div v-if="!loadingFollowers">
      <div
        v-for="(follower, index) in followers"
        :key="`follower-${index}`"
      >
        <user-small-card class="mb-2" :user="recordObject(follower)" />
      </div>
      <p
        v-if="followers.length === 0"
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

export default {
  name: 'UserFollowersView',
  components: { Spinner, UserSmallCard },
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
      this.loadingFollowers = true
      UserApi
        .followers(this.user.uuid)
        .then(resp => {
          this.followers = resp.data
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'user')
        })
        .finally(() => {
          this.loadingFollowers = false
        })
    },

    recordObject: function (data) {
      return new User(data)
    }
  }
}
</script>
