<template>
  <div>
    <v-container>
      <h1 class="text-center mt-7 mb-1">
        {{ $t('common.pages.find.guideBooks.title') }}
      </h1>
      <p class="mb-12 text-center text--disabled" v-html="$t('common.pages.find.guideBooks.intro')" />

      <v-row>
        <!-- Around city -->
        <v-col cols="12" md="6" lg="4">
          <v-hover>
            <template #default="{ hover }">
              <v-card
                class="rounded-lg smooth-elevation"
                to="/guide-book-papers/find"
                :elevation="hover ? 20 : 0"
              >
                <v-img
                  src="/images/around-city.jpg"
                  alt="ville d'Albarracín"
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
                        {{ mdiMapMarkerRadius }}
                      </v-icon>
                    </v-btn>
                  </v-row>
                </v-img>
                <h2 class="text-center mt-2 pb-0 text-h6">
                  {{ $t('common.pages.find.guideBooks.aroundCity.title') }}
                </h2>
                <v-card-text class="pt-1">
                  <p class="text-center">
                    {{ $t('common.pages.find.guideBooks.aroundCity.explain') }}
                  </p>
                </v-card-text>
              </v-card>
            </template>
          </v-hover>
        </v-col>

        <!-- New guide books -->
        <v-col cols="12" md="6" lg="4">
          <v-hover>
            <template #default="{ hover }">
              <v-card
                class="rounded-lg smooth-elevation"
                to="/library"
                :elevation="hover ? 20 : 0"
              >
                <v-img
                  src="/images/new-guide-book.jpg"
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
                        {{ mdiAlertDecagram }}
                      </v-icon>
                    </v-btn>
                  </v-row>
                </v-img>
                <h2 class="text-center mt-2 pb-0 text-h6">
                  {{ $t('common.pages.find.guideBooks.new.title') }}
                </h2>
                <v-card-text class="pt-1">
                  <p class="text-center">
                    {{ $t('common.pages.find.guideBooks.new.explain') }}
                  </p>
                </v-card-text>
              </v-card>
            </template>
          </v-hover>
        </v-col>

        <!-- Guide books features -->
        <v-col cols="12" md="6" lg="4">
          <v-hover>
            <template #default="{ hover }">
              <v-card
                class="rounded-lg smooth-elevation"
                to="/guide-books/features"
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
                        {{ mdiTools }}
                      </v-icon>
                    </v-btn>
                  </v-row>
                </v-img>
                <h2 class="text-center mt-2 pb-0 text-h6">
                  {{ $t('common.pages.find.guideBooks.andMore.title') }}
                </h2>
                <v-card-text class="pt-1">
                  <p class="text-center">
                    {{ $t('common.pages.find.guideBooks.andMore.explain') }}
                  </p>
                </v-card-text>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
      <find-something-else exclude="guide-books" />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { mdiTools, mdiMapMarkerRadius, mdiAlertDecagram } from '@mdi/js'
import AppFooter from '~/components/layouts/AppFooter'
import FindSomethingElse from '~/components/find/FindSomethingElse'

export default {
  components: { FindSomethingElse, AppFooter },
  data () {
    return {
      mdiTools,
      mdiMapMarkerRadius,
      mdiAlertDecagram
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "Trouver le topo d'escalade que vous cherchez",
        metaDescription: "Chercher un topo d'escalade autour d'une ville, consulté les dernières nouveauté, fait votre topothèque, etc."
      },
      en: {
        metaTitle: 'Find the climbing guidebook you are looking for',
        metaDescription: 'Search for a climbing guide book around a city, check the latest news, make your own guidebook library, etc.'
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
