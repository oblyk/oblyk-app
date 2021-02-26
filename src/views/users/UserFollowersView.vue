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
