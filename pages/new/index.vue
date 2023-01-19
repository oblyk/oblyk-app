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

      <h2 class="mt-16">
        {{ $t('common.pages.enrichOblyk.lastActivity') }}
      </h2>
      <feed feed-api="OblykActivityApi" />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { mdiTerrain, mdiOfficeBuildingMarkerOutline } from '@mdi/js'
import AppFooter from '~/components/layouts/AppFooter'
import Feed from '~/components/feeds/Feed'

export default {
  components: { Feed, AppFooter },

  data () {
    return {
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
  }
}
</script>
