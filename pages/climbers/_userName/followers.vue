<template>
  <div class="mt-5">
    <spinner v-if="loadingFollowers" />

    <div v-if="!loadingFollowers">
      <v-row>
        <v-col
          v-for="(follower, index) in followers"
          :key="`follower-${index}`"
          class="col-12 col-md-6 col-lg-4"
        >
          <user-small-card class="mb-2" :user="userToObject(follower)" />
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
  </div>
</template>

<script>
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import UserApi from '~/services/oblyk-api/UserApi'
import UserSmallCard from '~/components/users/UserSmallCard'
import Spinner from '~/components/layouts/Spiner'
import LoadingMore from '~/components/layouts/LoadingMore'
import User from '~/models/User'

export default {
  components: { LoadingMore, Spinner, UserSmallCard },
  mixins: [LoadingMoreHelpers],
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingFollowers: true,
      followers: []
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Les abonnés de %{name}',
        metaDescription: 'Voir les grimpeur·euse·s abonnées à %{name}, grimpeur·euse de la communauté Oblyk'
      },
      en: {
        metaTitle: 'The subscribers of %{name}',
        metaDescription: 'See the climbers subscribed to %{name}, climber of the community Oblyk'
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
      return this.$t('metaTitle', { name: this.user?.first_name })
    },
    userMetaDescription () {
      return this.$t('metaDescription', { name: this.user?.first_name })
    },
    userMetaUrl () {
      if (this.user) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.user?.path}/followers`
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
        .followers(this.user.uuid, this.page)
        .then((resp) => {
          for (const follower of resp.data) {
            this.followers.push(follower)
          }
          this.successLoadingMore(resp)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'user')
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loadingFollowers = false
          this.finallyMoreIsLoaded()
        })
    },

    userToObject (user) {
      return new User({ attributes: user })
    }
  }
}
</script>
