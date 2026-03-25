<template>
  <div>
    <v-container>
      <h1 class="text-center mt-7 mb-1">
        {{ $t('common.pages.enrichOblyk.title') }}
      </h1>
      <p class="mb-12 text-center text--disabled" v-html="$t('common.pages.enrichOblyk.intro')" />
      <v-row>
        <v-col cols="6" md="3" offset-md="3">
          <v-card to="/crags/new">
            <v-card-text class="text-center">
              <v-icon x-large>
                {{ mdiTerrain }}
              </v-icon>
              <p class="mb-0 mt-2">
                {{ $t('actions.addCrag') }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6" md="3">
          <v-card to="/gyms/new">
            <v-card-text class="text-center">
              <v-icon x-large>
                {{ mdiOfficeBuildingMarkerOutline }}
              </v-icon>
              <p class="mb-0 mt-2">
                {{ $t('actions.addGym') }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <h2 class="mb-4 text-center mt-16">
        {{ $t('common.pages.enrichOblyk.lastActivity') }}
      </h2>
      <div style="max-width: 430px" class="mx-auto">
        <publication-card
          v-for="(publication, publicationIndex) in publications"
          :key="`publication-index-${publicationIndex}`"
          :publication="publication"
          class="mb-3"
        />
        <loading-more
          :get-function="getContributions"
          :loading-more="loadingMoreData"
          :no-more-data="noMoreDataToLoad"
        >
          <template #customSkeleton>
            <v-sheet
              v-for="skeletonIndex in 2"
              :key="`skeleton-index-${skeletonIndex}`"
              class="pt-2 rounded mb-3"
            >
              <v-skeleton-loader type="list-item-avatar" class="mb-3" />
              <v-skeleton-loader type="paragraph" class="mx-3 rounded-0" />
              <v-skeleton-loader type="actions" />
            </v-sheet>
          </template>
        </loading-more>
      </div>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { mdiTerrain, mdiOfficeBuildingMarkerOutline } from '@mdi/js'
import AppFooter from '~/components/layouts/AppFooter'
import OblykApi from '~/services/oblyk-api/OblykApi'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import PublicationCard from '~/components/publications/PublicationCard.vue'
import LoadingMore from '~/components/layouts/LoadingMore.vue'

export default {
  components: { LoadingMore, PublicationCard, AppFooter },
  mixins: [LoadingMoreHelpers],

  data () {
    return {
      loadingPublication: false,
      publications: [],

      mdiTerrain,
      mdiOfficeBuildingMarkerOutline
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Enrichir Oblyk'
      },
      en: {
        metaTitle: 'Enrich Oblyk'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  mounted () {
    this.getContributions()
  },

  methods: {
    getContributions () {
      this.moreIsBeingLoaded()
      new OblykApi(this.$axios, this.$auth)
        .get('/last_contributions', { page: this.page, per_page: 5 })
        .then((resp) => {
          for (const publication of resp.data) {
            this.publications.push(publication)
          }
          this.successLoadingMore(resp, 5)
        })
        .catch(() => {
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loadingPublications = false
          this.finallyMoreIsLoaded()
        })
    }
  }
}
</script>
