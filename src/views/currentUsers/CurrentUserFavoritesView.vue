<template>
  <div>
    <spinner v-if="loadingCurrentUser" />

    <div v-if="!loadingCurrentUser">
      <user-tabs :user="currentUser" />
      <user-favorite-tabs :user="currentUser" />
      <v-container>
        <router-view :user="currentUser" />
      </v-container>
    </div>
  </div>
</template>

<script>
import { CurrentUserConcern } from '@/concerns/CurrentUserConcern'
import Spinner from '@/components/layouts/Spiner'
import UserTabs from '@/components/users/layouts/CurrentUserTabs'
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import Gym from '@/models/Gym'
import Crag from '@/models/Crag'
import UserFavoriteTabs from '@/components/users/layouts/UserFavoriteTabs'

export default {
  name: 'CurrentUserFavoritesView',
  mixins: [CurrentUserConcern],
  components: {
    UserFavoriteTabs,
    UserTabs,
    Spinner
  },

  data () {
    return {
      loadingGyms: true,
      loadingCrags: true,
      gyms: [],
      crags: []
    }
  },

  mounted () {
    this.getFavoriteGyms()
    this.getFavoriteCrags()
  },

  methods: {
    getFavoriteGyms: function () {
      this.loadingGyms = true
      CurrentUserApi
        .favoriteGyms()
        .then(resp => {
          for (const gym of resp.data) {
            this.gyms = new Gym(gym)
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'user')
        })
        .finally(() => {
          this.loadingGyms = false
        })
    },

    getFavoriteCrags: function () {
      this.loadingCrags = true
      CurrentUserApi
        .favoriteCrags()
        .then(resp => {
          for (const crag of resp.data) {
            this.crags = new Crag(crag)
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'user')
        })
        .finally(() => {
          this.loadingCrags = false
        })
    }
  }
}
</script>
