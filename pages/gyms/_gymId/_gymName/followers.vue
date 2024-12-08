<template>
  <div v-if="gym">
    <spinner v-if="loadingFollowers" />

    <div v-if="!loadingFollowers">
      <v-row>
        <v-col
          v-for="(user, index) in followers"
          :key="`user-${index}`"
          class="col-12 col-md-6 col-lg-4 py-0"
        >
          <user-small-card
            small
            class="mb-2"
            :user="user"
          />
        </v-col>
      </v-row>

      <loading-more
        :get-function="getFollowers"
        :no-more-data="noMoreDataToLoad"
        :loading-more="loadingMoreData"
      />

      <p
        v-if="followers.length === 0 && !loadingFollowers"
        class="text-center text--disabled mt-5 mb-5"
      >
        {{ $t('components.gym.followersEmpty', { name: gym.name }) }}
      </p>
    </div>
  </div>
</template>

<script>
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import Spinner from '~/components/layouts/Spiner'
import UserSmallCard from '~/components/users/UserSmallCard'
import LoadingMore from '~/components/layouts/LoadingMore'
import FollowApi from '~/services/oblyk-api/FollowApi'
import User from '~/models/User'

export default {
  components: {
    LoadingMore,
    UserSmallCard,
    Spinner
  },
  mixins: [LoadingMoreHelpers],
  props: {
    gym: {
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
        metaDescription: "Voir les grimpeurs et grimpeuses abonné·es à la salle d'escalade %{name}"
      },
      en: {
        metaTitle: 'The subscribers of %{name}',
        metaDescription: 'See the climbers subscribed to %{name} climbing gym'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle', { name: this.gym?.name }),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('metaDescription', { name: this.gym?.name }) },
        { hid: 'og:title', property: 'og:title', content: this.$t('metaTitle', { name: this.gym?.name }) },
        { hid: 'og:description', property: 'og:description', content: this.$t('metaDescription', { name: this.gym?.name }) }
      ]
    }
  },

  mounted () {
    this.getFollowers()
  },

  methods: {
    getFollowers () {
      this.moreIsBeingLoaded()
      new FollowApi(this.$axios, this.$auth)
        .followers('Gym', this.gym.id, this.page)
        .then((resp) => {
          for (const follower of resp.data) {
            this.followers.push(new User({ attributes: follower }))
          }
          this.successLoadingMore(resp)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gym')
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loadingFollowers = false
          this.finallyMoreIsLoaded()
        })
    }
  }
}
</script>
