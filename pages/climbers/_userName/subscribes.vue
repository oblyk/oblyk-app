<template>
  <div class="mt-5">
    <spinner v-if="loadingSubscribes" />

    <div v-if="!loadingSubscribes">
      <v-row>
        <v-col
          v-for="(subscribe, index) in subscribes"
          :key="`subscribe-${index}`"
          class="col-12 col-md-6 col-lg-4"
        >
          <gym-small-card
            v-if="subscribe.followable_type === 'Gym'"
            :gym="recordToObject('Gym', subscribe.followable_object)"
          />

          <crag-small-card
            v-if="subscribe.followable_type === 'Crag'"
            :crag="recordToObject('Crag', subscribe.followable_object)"
          />

          <guide-book-paper-small-card
            v-if="subscribe.followable_type === 'GuideBookPaper'"
            :guide-book-paper="recordToObject('GuideBookPaper', subscribe.followable_object)"
          />

          <user-small-card
            v-if="subscribe.followable_type === 'User'"
            :user="recordToObject('User', subscribe.followable_object)"
          />
        </v-col>
      </v-row>

      <loading-more
        :get-function="getSubscribes"
        :no-more-data="noMoreDataToLoad"
        :loading-more="loadingMoreData"
      />
    </div>
  </div>
</template>

<script>
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import { RecordToObjectHelpers } from '~/mixins/RecordToObjectHelpers'
import UserApi from '~/services/oblyk-api/UserApi'
import GymSmallCard from '~/components/gyms/GymSmallCard.vue'
import CragSmallCard from '~/components/crags/CragSmallCard.vue'
import Spinner from '~/components/layouts/Spiner.vue'
import GuideBookPaperSmallCard from '~/components/guideBookPapers/GuideBookPaperSmallCard.vue'
import UserSmallCard from '~/components/users/UserSmallCard.vue'
import LoadingMore from '~/components/layouts/LoadingMore.vue'

export default {
  components: {
    LoadingMore,
    UserSmallCard,
    GuideBookPaperSmallCard,
    Spinner,
    CragSmallCard,
    GymSmallCard
  },
  mixins: [LoadingMoreHelpers, RecordToObjectHelpers],
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingSubscribes: true,
      subscribes: []
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Abonnement de %{name}',
        metaDescription: 'Voir les abonnements aux falaises, salles, et autre grimpeur·euse de %{name}'
      },
      en: {
        metaTitle: 'Subscribe of %{name}',
        metaDescription: 'View memberships to cliffs, gyms, and other climbers in %{name}'
      }
    }
  },

  head () {
    return {
      title: this.userMetaTitle,
      meta: [
        { hid: 'description', name: 'description', content: this.userMetaDescription },
        { hid: 'og:title', property: 'og:title', content: this.userMetaTitle },
        { hid: 'og:description', property: 'og:description', content: this.userMetaDescription },
        { hid: 'og:url', property: 'og:url', content: this.userMetaUrl }
      ]
    }
  },

  computed: {
    userMetaTitle () {
      return this.$t('metaTitle', { name: (this.user || {}).first_name })
    },
    userMetaDescription () {
      return this.$t('metaDescription', { name: (this.user || {}).first_name })
    },
    userMetaUrl () {
      if (this.user) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.user.path}/subscribes`
      }
      return ''
    }
  },

  mounted () {
    this.getSubscribes()
  },

  methods: {
    getSubscribes () {
      this.moreIsBeingLoaded()
      new UserApi(this.$axios, this.$auth)
        .subscribes(this.user.uuid, this.page)
        .then((resp) => {
          for (const subscribe of resp.data) {
            this.subscribes.push(subscribe)
          }
          this.successLoadingMore(resp)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'user')
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loadingSubscribes = false
          this.finallyMoreIsLoaded()
        })
    }
  }
}
</script>
