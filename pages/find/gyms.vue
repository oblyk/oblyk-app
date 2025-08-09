<template>
  <div>
    <page-header
      :title="$t('common.pages.find.gyms.title')"
      back-to="/indoor"
    />
    <v-container>
      <h1 class="text-center mt-7 mb-1">
        {{ $t('common.pages.find.gyms.title') }}
      </h1>
      <p class="mb-12 text-center text--disabled" v-html="$t('common.pages.find.gyms.intro')" />

      <v-row>
        <!-- Crags map -->
        <v-col cols="12" md="6" lg="4" offset-lg="2">
          <v-hover>
            <template #default="{ hover }">
              <v-card
                class="rounded-lg smooth-elevation"
                to="/maps/gyms"
                :elevation="hover ? 20 : 0"
              >
                <v-img
                  src="/images/gym-map.jpg"
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
                  {{ $t('common.pages.find.gyms.map.title') }}
                </h2>
                <v-card-text class="pt-1">
                  <p class="text-center">
                    {{ $t('common.pages.find.gyms.map.explain') }}
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
                  {{ $t('common.pages.find.gyms.aroundCity.title') }}
                </h2>
                <v-card-text class="pt-1">
                  <p class="text-center">
                    {{ $t('common.pages.find.gyms.aroundCity.explain') }}
                  </p>
                </v-card-text>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
      <find-something-else exclude="gyms" />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { mdiMap, mdiMagnifyExpand, mdiMapMarkerRadius } from '@mdi/js'
import AppFooter from '~/components/layouts/AppFooter'
import FindSomethingElse from '~/components/find/FindSomethingElse'
import PageHeader from '~/components/layouts/PageHeader'

export default {
  components: { PageHeader, FindSomethingElse, AppFooter },
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
        metaTitle: "Trouver une salle d'escalade",
        metaDescription: "Trouver une salle d'escalade autour de votre ville grâce à la carte des salle d'escalade ou en recherchant autour d'un lieux"
      },
      en: {
        metaTitle: 'Find a climbing gym',
        metaDescription: 'Find a climbing gym around your city with the climbing gym map or by searching around a location'
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
