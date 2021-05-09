<template>
  <div>
    <spinner v-if="loadingSubscribes" />

    <div v-if="!loadingSubscribes">
      <div
        v-for="(subscribe, index) in subscribes"
        :key="`subscribe-${index}`"
      >
        <user-small-card
          class="mb-2"
          :user="recordObject(subscribe.followable_object)"
          :small="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { CurrentUserConcern } from '@/concerns/CurrentUserConcern'
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import User from '@/models/User'
import UserSmallCard from '@/components/users/UserSmallCard'
import Spinner from '@/components/layouts/Spiner'

export default {
  name: 'CurrentUserSubscribesViewView',
  components: { Spinner, UserSmallCard },
  mixins: [CurrentUserConcern],
  props: {
    user: Object
  },

  metaInfo () {
    return {
      title: this.$t('meta.currentUser.subscribes')
    }
  },

  data () {
    return {
      loadingSubscribes: true,
      subscribes: []
    }
  },

  mounted () {
    this.getSubscribes()
  },

  methods: {
    getSubscribes: function () {
      this.loadingSubscribes = true
      CurrentUserApi
        .subscribes()
        .then(resp => {
          this.subscribes = resp.data
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'user')
        })
        .finally(() => {
          this.loadingSubscribes = false
        })
    },

    recordObject: function (data) {
      return new User(data)
    }
  }
}
</script>
