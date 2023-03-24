<template>
  <div>
    <spinner v-if="loadingSubscribes" />

    <div v-if="!loadingSubscribes">
      <v-row>
        <v-col
          v-for="(subscribe, index) in subscribes"
          :key="`subscribe-${index}`"
          class="col-sm-12 col-md-6 col-lg-3"
        >
          <user-small-card
            :user="recordObject(subscribe.followable_object)"
            :small="true"
          />
        </v-col>
      </v-row>

      <loading-more
        :get-function="getSubscribes"
        :no-more-data="noMoreDataToLoad"
        :loading-more="loadingMoreData"
      />

      <!-- No subscribes -->
      <p
        v-if="subscribes.length === 0"
        class="text-center text--disabled mt-5 mb-5"
      >
        {{ $t('components.user.subscribesEmpty', { name: user.first_name }) }}
      </p>
    </div>
  </div>
</template>

<script>
import { CurrentUserConcern } from '~/concerns/CurrentUserConcern'
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
import User from '~/models/User'
import UserSmallCard from '~/components/users/UserSmallCard.vue'
import Spinner from '~/components/layouts/Spiner.vue'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import LoadingMore from '~/components/layouts/LoadingMore.vue'

export default {
  components: {
    LoadingMore,
    Spinner,
    UserSmallCard
  },
  mixins: [CurrentUserConcern, LoadingMoreHelpers],
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
        metaTitle: 'Mes abonnées'
      },
      en: {
        metaTitle: 'My followers'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  mounted () {
    this.getSubscribes()
  },

  methods: {
    getSubscribes () {
      this.moreIsBeingLoaded()
      new CurrentUserApi(this.$axios, this.$auth)
        .subscribes(this.page)
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
    },

    recordObject (data) {
      return new User({ attributes: data })
    }
  }
}
</script>
