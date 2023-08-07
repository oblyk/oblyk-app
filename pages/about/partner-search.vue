<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="text-center mt-5">
        {{ $t('common.pages.partner.title') }}
      </h1>
      <h4 class="subtitle-1 text-center">
        {{ $t('common.pages.partner.howIsWork') }}
      </h4>
      <p class="text-center mt-10 mb-10">
        {{ $t('common.pages.partner.explain') }}
      </p>

      <div
        v-if="!isLoggedIn"
        class="mb-10"
      >
        <p class="text-center font-weight-bold">
          {{ $t('common.pages.partner.connect') }}
        </p>
        <p class="text-center">
          <v-btn
            outlined
            color="primary"
            to="/sign-up"
          >
            {{ $t('actions.signUp') }}
          </v-btn>
        </p>
      </div>

      <partner-figures />

      <!-- Profile -->
      <v-row class="about-partner-row mt-16">
        <v-col class="col-12 col-md-6" order-md="last">
          <p class="font-weight-bold">
            {{ $t('common.pages.partner.steps.configuration.title') }}
          </p>
          <p v-html="$t('common.pages.partner.steps.configuration.body')" />
          <p v-if="isLoggedIn" class="text-right">
            <v-btn outlined color="primary" to="/home/settings/partner">
              <v-icon left>
                {{ mdiHuman }}
              </v-icon>
              {{ $t('common.pages.partner.steps.configuration.action') }}
            </v-btn>
          </p>
        </v-col>
        <v-col class="col-12 col-md-6">
          <v-img src="/svg/partner-configuration.svg" />
        </v-col>
      </v-row>

      <!-- Location -->
      <v-row class="about-partner-row">
        <v-col class="col-12 col-md-6">
          <p class="font-weight-bold">
            {{ $t('common.pages.partner.steps.location.title') }}
          </p>
          <p v-html="$t('common.pages.partner.steps.location.body')" />
          <p v-if="isLoggedIn" class="text-right">
            <v-btn outlined color="primary" to="/home/settings/partner">
              <v-icon left>
                {{ mdiMapMarkerRadius }}
              </v-icon>
              {{ $t('common.pages.partner.steps.location.action') }}
            </v-btn>
          </p>
        </v-col>
        <v-col class="col-12 col-md-6">
          <v-img src="/svg/partner-location.svg" />
        </v-col>
      </v-row>

      <!-- Map Climbers -->
      <v-row class="about-partner-row">
        <v-col class="col-12 col-md-6" order-md="last">
          <p class="font-weight-bold">
            {{ $t('common.pages.partner.steps.climberMap.title') }}
          </p>
          <p v-html="$t('common.pages.partner.steps.climberMap.body')" />
          <p class="text-right">
            <v-btn outlined color="primary" to="/maps/climbers">
              <v-icon left>
                {{ mdiMap }}
              </v-icon>
              {{ $t('common.pages.partner.steps.climberMap.action') }}
            </v-btn>
          </p>
        </v-col>
        <v-col class="col-12 col-md-6">
          <v-img src="/svg/partner-climber-map.svg" />
        </v-col>
      </v-row>

      <!-- Messenger -->
      <v-row class="about-partner-row">
        <v-col class="col-12 col-md-6">
          <p class="font-weight-bold">
            {{ $t('common.pages.partner.steps.contact.title') }}
          </p>
          <p v-html="$t('common.pages.partner.steps.contact.body')" />
          <p v-if="isLoggedIn" class="text-right">
            <v-btn outlined color="primary" to="/home/messenger">
              <v-icon left>
                {{ mdiForum }}
              </v-icon>
              {{ $t('common.pages.partner.steps.contact.action') }}
            </v-btn>
          </p>
        </v-col>
        <v-col class="col-12 col-md-6">
          <v-img src="/svg/partner-contact.svg" />
        </v-col>
      </v-row>

      <other-features no-this-feature="/about/partner-search" />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { mdiHuman, mdiMapMarkerRadius, mdiMap, mdiForum } from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'
import PartnerFigures from '@/components/partners/PartnerFigures'
import AppFooter from '@/components/layouts/AppFooter'
import OtherFeatures from '~/components/globals/OtherFeatures'

export default {
  components: { OtherFeatures, PartnerFigures, AppFooter },
  mixins: [SessionConcern],

  data () {
    return {
      mdiHuman,
      mdiMapMarkerRadius,
      mdiMap,
      mdiForum
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "Recherche de partenaire d'escalade, comment ça marche ?",
        metaDescription: "La recherche de partenaire d'escalade te permet de trouver des grimpeur·euse·s autours de toi qui cherche aussi des gens pour grimper. Comment ça fonctionne ?"
      },
      en: {
        metaTitle: 'Search for a climbing partner, how does it work?',
        metaDescription: 'The climbing partner search allows you to find climbers around you who are also looking for people to climb with. How does it work?'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('metaDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('metaTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('metaDescription') },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg` }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.about-partner-row {
  margin-bottom: 7em;
}
</style>
