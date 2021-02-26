<template>
  <v-container>
    <spinner v-if="loadingSubscribes" />

    <div v-if="!loadingSubscribes">
      <div
        v-for="(subscribe, index) in subscribes"
        :key="`subscribe-${index}`"
      >
        <gym-small-card class="mb-2" v-if="subscribe.followable_type === 'Gym'" :gym="recordObject('Gym', subscribe.followable_object)" />
        <crag-small-card class="mb-2" v-if="subscribe.followable_type === 'Crag'" :crag="recordObject('Crag', subscribe.followable_object)" />
        <guide-book-paper-small-card class="mb-2" v-if="subscribe.followable_type === 'GuideBookPaper'" :guide-book-paper="recordObject('GuideBookPaper', subscribe.followable_object)" />
        <user-small-card class="mb-2" v-if="subscribe.followable_type === 'User'" :user="recordObject('User', subscribe.followable_object)" />
      </div>
    </div>
  </v-container>
</template>

<script>
import Gym from '@/models/Gym'
import Crag from '@/models/Crag'
import UserApi from '@/services/oblyk-api/UserApi'
import GymSmallCard from '@/components/gyms/GymSmallCard'
import CragSmallCard from '@/components/crags/CragSmallCard'
import Spinner from '@/components/layouts/Spiner'
import GuideBookPaper from '@/models/GuideBookPaper'
import GuideBookPaperSmallCard from '@/components/guideBookPapers/GuideBookPaperSmallCard'
import User from '@/models/User'
import UserSmallCard from '@/components/users/UserSmallCard'

export default {
  name: 'UserSubscribesView',
  components: { UserSmallCard, GuideBookPaperSmallCard, Spinner, CragSmallCard, GymSmallCard },
  props: {
    user: Object
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
      UserApi
        .subscribes(this.user.uuid)
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
      if (type === 'Gym') {
        return new Gym(data)
      } else if (type === 'Crag') {
        return new Crag(data)
      } else if (type === 'GuideBookPaper') {
        return new GuideBookPaper(data)
      } else if (type === 'User') {
        return new User(data)
      }
    }
  }
}
</script>
