<template>
  <div>
    <v-container>
      <h1 class="text-center mt-7 mb-1">
        {{ $t('common.pages.find.climbers.title') }}
      </h1>
      <p class="mb-12 text-center text--disabled" v-html="$t('common.pages.find.climbers.intro')" />

      <v-row>
        <!-- Crags map -->
        <v-col cols="12" md="6" lg="4" offset-lg="2">
          <v-hover>
            <template #default="{ hover }">
              <v-card
                class="rounded-xl smooth-elevation"
                to="/maps/climbers"
                :elevation="hover ? 20 : 2"
              >
                <v-img
                  src="/images/climbers-map.jpg"
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
                  {{ $t('common.pages.find.climbers.map.title') }}
                </h2>
                <v-card-text class="pt-1">
                  <p class="text-center">
                    {{ $t('common.pages.find.climbers.map.explain') }}
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
                class="rounded-xl smooth-elevation"
                to="/about/partner-search"
                :elevation="hover ? 20 : 2"
              >
                <v-img
                  src="/images/climbers-how-it-works.jpg"
                  max-height="300"
                  alt="des grimpeurs qui font une parade"
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
                        {{ mdiHelpCircle }}
                      </v-icon>
                    </v-btn>
                  </v-row>
                </v-img>
                <h2 class="text-center mt-2 pb-0 text-h6">
                  {{ $t('common.pages.find.climbers.howItWorks.title') }}
                </h2>
                <v-card-text class="pt-1">
                  <p class="text-center">
                    {{ $t('common.pages.find.climbers.howItWorks.explain') }}
                  </p>
                </v-card-text>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
      <find-something-else exclude="climbers" />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { mdiMap, mdiHelpCircle } from '@mdi/js'
import AppFooter from '~/components/layouts/AppFooter'
import FindSomethingElse from '~/components/find/FindSomethingElse'

export default {
  components: { FindSomethingElse, AppFooter },
  data () {
    return {
      mdiMap,
      mdiHelpCircle
    }
  },

  head () {
    return {
      title: this.$t('meta.findClimbers.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('meta.findClimbers.description')
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('meta.findClimbers.title')
        },
        {
          hid: 'og-description',
          property: 'og:description',
          content: this.$t('meta.findClimbers.description')
        }
      ]
    }
  }
}
</script>
