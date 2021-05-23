<template>
  <v-container>
    <spinner v-if="loadingSubscribes" />

    <div v-if="!loadingSubscribes">
      <v-row>
        <v-col
          class="col-12 col-md-6 col-lg-4"
          v-for="(subscribe, index) in subscribes"
          :key="`subscribe-${index}`"
        >
            <gym-small-card v-if="subscribe.followable_type === 'Gym'" :gym="recordObject('Gym', subscribe.followable_object)" />
            <crag-small-card v-if="subscribe.followable_type === 'Crag'" :crag="recordObject('Crag', subscribe.followable_object)" />
            <guide-book-paper-small-card v-if="subscribe.followable_type === 'GuideBookPaper'" :guide-book-paper="recordObject('GuideBookPaper', subscribe.followable_object)" />
            <user-small-card v-if="subscribe.followable_type === 'User'" :user="recordObject('User', subscribe.followable_object)" />
        </v-col>
      </v-row>

      <loading-more
        :get-function="getSubscribes"
        :no-more-data="noMoreDataToLoad"
        :loading-more="loadingMoreData"
      />
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
import LoadingMore from '@/components/layouts/LoadingMore'
import { LoadingMoreHelpers } from '@/mixins/LoadingMoreHelpers'

export default {
  name: 'UserSubscribesView',
  mixins: [LoadingMoreHelpers],
  components: {
    LoadingMore,
    UserSmallCard,
    GuideBookPaperSmallCard,
    Spinner,
    CragSmallCard,
    GymSmallCard
  },
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
      this.moreIsBeingLoaded()
      UserApi
        .subscribes(this.user.uuid, this.page)
        .then(resp => {
          for (const subscribe of resp.data) {
            this.subscribes.push(subscribe)
          }
          this.successLoadingMore(resp)
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'user')
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loadingSubscribes = false
          this.finallyMoreIsLoaded()
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
