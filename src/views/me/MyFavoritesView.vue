<template>
  <div>
    <spinner v-if="loadingMeUser" />

    <div v-if="!loadingMeUser">
      <user-tabs :user="meUser" />
      <spinner v-if="loadingSubscribes" />

      <v-container v-if="!loadingSubscribes">
        <div
          v-for="(subscribe, index) in subscribes"
          :key="`subscribe-${index}`"
        >
          <gym-small-card class="mb-2" v-if="subscribe.followable_type === 'Gym'" :gym="recordObject('Gym', subscribe.followable_object)" />
          <crag-small-card class="mb-2" v-if="subscribe.followable_type === 'Crag'" :crag="recordObject('Crag', subscribe.followable_object)" />
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import { MeUserConcern } from '@/concerns/MeUserConcern'
import Spinner from '@/components/layouts/Spiner'
import UserTabs from '@/components/users/layouts/UserTabs'
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import GymSmallCard from '@/components/gyms/GymSmallCard'
import Word from '@/models/Word'
import Gym from '@/models/Gym'
import Crag from '@/models/Crag'
import CragSmallCard from '@/components/crags/CragSmallCard'

export default {
  name: 'MyFavoritesView',
  components: {
    CragSmallCard,
    GymSmallCard,
    UserTabs,
    Spinner
  },
  mixins: [MeUserConcern],

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

    recordObject: function (type, data) {
      if (type === 'Word') {
        return new Word(data)
      } else if (type === 'Gym') {
        return new Gym(data)
      } else if (type === 'Crag') {
        return new Crag(data)
      }
    }
  }
}
</script>
