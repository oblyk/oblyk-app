<template>
  <div>
    <v-container>
      <h1 class="text-center mt-7 mb-1">
        {{ $t('common.pages.find.crags.title') }}
      </h1>
      <p class="mb-12 text-center text--disabled" v-html="$t('common.pages.find.crags.intro')" />

      <v-row>
        <!-- Crags map -->
        <v-col cols="12" md="6" lg="4">
          <v-hover>
            <template #default="{ hover }">
              <v-card
                class="rounded-lg smooth-elevation"
                to="/maps/crags"
                :elevation="hover ? 20 : 0"
              >
                <v-img
                  src="/images/crag-map.jpg"
                  alt="extait d'une carte"
                  max-height="300"
                >
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-btn
                      class="mx-2"
                      fab
                      x-large
                      elevation="24"
                      color="rgba(255,255,255,0.3)"
                      dark
                    >
                      <v-icon
                        color="rgba(0,0,0,0.65)"
                        x-large
                      >
                        {{ mdiMap }}
                      </v-icon>
                    </v-btn>
                  </v-row>
                </v-img>
                <h2 class="text-center mt-2 pb-0 text-h6">
                  {{ $t('common.pages.find.crags.map.title') }}
                </h2>
                <v-card-text class="pt-1">
                  <p class="text-center">
                    {{ $t('common.pages.find.crags.map.explain') }}
                  </p>
                </v-card-text>
              </v-card>
            </template>
          </v-hover>
        </v-col>

        <!-- Around city -->
        <v-col cols="12" md="6" lg="4">
          <v-hover>
            <template #default="{ hover }">
              <v-card
                class="rounded-lg smooth-elevation"
                to="/escalade-en/france"
                :elevation="hover ? 20 : 0"
              >
                <v-img
                  src="/images/around-city.jpg"
                  max-height="300"
                  alt="ville d'Albarracín"
                >
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-btn
                      class="mx-2"
                      fab
                      x-large
                      elevation="24"
                      color="rgba(255,255,255,0.3)"
                      dark
                    >
                      <v-icon
                        color="rgba(0,0,0,0.65)"
                        x-large
                      >
                        {{ mdiMapMarkerRadius }}
                      </v-icon>
                    </v-btn>
                  </v-row>
                </v-img>
                <h2 class="text-center mt-2 pb-0 text-h6">
                  {{ $t('common.pages.find.crags.aroundCity.title') }}
                </h2>
                <v-card-text class="pt-1">
                  <p class="text-center">
                    {{ $t('common.pages.find.crags.aroundCity.explain') }}
                  </p>
                </v-card-text>
              </v-card>
            </template>
          </v-hover>
        </v-col>

        <!-- Advanced search -->
        <v-col cols="12" md="6" lg="4">
          <v-hover>
            <template #default="{ hover }">
              <v-card
                class="rounded-lg smooth-elevation"
                to="/crags/search"
                :elevation="hover ? 20 : 0"
              >
                <v-img
                  src="/images/advanced-search.jpg"
                  max-height="300"
                  alt="Haut d'une page de topo avec des informations sur l'orientation"
                >
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-btn
                      class="mx-2"
                      fab
                      x-large
                      elevation="24"
                      color="rgba(255,255,255,0.3)"
                    >
                      <v-icon
                        color="rgba(0,0,0,0.65)"
                        x-large
                      >
                        {{ mdiMagnifyExpand }}
                      </v-icon>
                    </v-btn>
                  </v-row>
                </v-img>
                <h2 class="text-center mt-2 pb-0 text-h6">
                  {{ $t('common.pages.find.crags.advancedSearch.title') }}
                </h2>
                <v-card-text class="pt-1">
                  <p class="text-center">
                    {{ $t('common.pages.find.crags.advancedSearch.explain') }}
                  </p>
                </v-card-text>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
      <find-something-else exclude="crags" />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { mdiMap, mdiMagnifyExpand, mdiMapMarkerRadius } from '@mdi/js'
import AppFooter from '~/components/layouts/AppFooter'
import FindSomethingElse from '~/components/find/FindSomethingElse'

export default {
  components: { FindSomethingElse, AppFooter },
  data () {
    return {
      mdiMap,
      mdiMagnifyExpand,
      mdiMapMarkerRadius
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "Trouver un site d'escalade",
        metaDescription: "Trouver le site d'escalade que vous cherchez avec la carte des falaises du monde, ou autour d'une ville ou selon des critères bien particulier grâce à nos outils de recherche."
      },
      en: {
        metaTitle: 'Find a climbing site',
        metaDescription: "Find the climbing crag you are looking for with the map of the world's crags, or around a city or according to specific criteria with our search tools."
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('metaDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('metaTitle') },
        { hid: 'og-description', property: 'og:description', content: this.$t('metaDescription') }
      ]
    }
  }
}
</script>
