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

  computed: {
    userMetaTitle: function () {
      return this.$t('meta.user.subscribe.title', { name: (this.user || {}).first_name })
    },
    userMetaDescription: function () {
      return this.$t('meta.user.subscribe.description', { name: (this.user || {}).first_name })
    },
    userMetaUrl: function () {
      if (this.user) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.user.path('subscribes')}`
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
