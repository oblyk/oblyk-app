<template>
  <div>
    <v-container>
      <h1 class="guide-features-h1 text-center">
        {{ $t('common.pages.guideBookFeature.title') }}
      </h1>

      <p class="mt-10 mb-5" v-html="$t('common.pages.guideBookFeature.intro')" />

      <v-row class="guide-presentation-row">
        <v-col align-self="center" cols="12" md="6" class="pa-10">
          <h2 class="mb-4">
            {{ $t('common.pages.guideBookFeature.features.information.title') }}
          </h2>
          <p v-html="$t('common.pages.guideBookFeature.features.information.body')" />
          <p class="text-right">
            <nuxt-link
              to="/library"
              class="v-btn"
            >
              {{ $t('common.pages.guideBookFeature.features.information.action') }}
            </nuxt-link>
          </p>
        </v-col>
        <v-col align-self="center" cols="12" md="6" order-md="last">
          <v-sheet rounded class="pa-3" elevation="24">
            <v-img
              contain
              alt="couverture du topo de la Drôme provençal"
              src="/images/escalade-en-drome-provencal.webp"
              @click="openModal('/images/escalade-en-drome-provencal.webp')"
            />
          </v-sheet>
        </v-col>
      </v-row>

      <v-row class="guide-presentation-row">
        <v-col align-self="center" cols="12" md="6" order-md="last" class="pa-10">
          <h2 class="mb-4">
            {{ $t('common.pages.guideBookFeature.features.find.title') }}
          </h2>
          <p v-html="$t('common.pages.guideBookFeature.features.find.body')" />
          <p class="text-right">
            <nuxt-link
              to="/guide-book-papers/find"
              class="v-btn"
            >
              {{ $t('common.pages.guideBookFeature.features.find.action') }}
            </nuxt-link>
          </p>
        </v-col>
        <v-col align-self="center" cols="12" md="6">
          <v-sheet rounded class="pa-3" elevation="24">
            <v-img
              contain
              alt="Les topos autour de grenoble"
              src="/images/topo-autour-de-grenoble.webp"
              @click="openModal('/images/topo-autour-de-grenoble.webp')"
            />
          </v-sheet>
        </v-col>
      </v-row>

      <v-row class="guide-presentation-row">
        <v-col align-self="center" cols="12" md="6" class="pa-10">
          <h2 class="mb-4">
            {{ $t('common.pages.guideBookFeature.features.alternative.title') }}
          </h2>
          <p class="mb-2" v-html="$t('common.pages.guideBookFeature.features.alternative.body1')" />
          <p class="mb-2" v-html="$t('common.pages.guideBookFeature.features.alternative.body2')" />
          <p class="mb-2">
            <strong>1.</strong>
            {{ $t('common.pages.guideBookFeature.features.alternative.body3') }}
          </p>
          <div>
            <v-alert
              text
              :icon="mdiHandCoin"
              color="green"
            >
              {{ $t('components.guideBookPaper.fundingStatusExplain.contributes_to_financing') }}
            </v-alert>
            <v-alert
              text
              :icon="mdiCurrencyUsdOff"
              color="red"
            >
              {{ $t('components.guideBookPaper.fundingStatusExplain.not_contributes_to_financing') }}
            </v-alert>
          </div>
          <p>
            <strong>2.</strong>
            {{ $t('common.pages.guideBookFeature.features.alternative.body4') }}
          </p>
        </v-col>
        <v-col align-self="center" cols="12" md="6" order-md="last">
          <v-sheet rounded class="pa-3" elevation="24">
            <v-img
              contain
              alt="Les alternatives au topo Avignon Soleil"
              src="/images/alternative.webp"
              @click="openModal('/images/alternative.webp')"
            />
          </v-sheet>
        </v-col>
      </v-row>

      <v-row class="guide-presentation-row">
        <v-col align-self="center" cols="12" md="6" order-md="last" class="pa-10">
          <h2 class="mb-4">
            {{ $t('common.pages.guideBookFeature.features.myLibrary.title') }}
          </h2>
          <p v-html="$t('common.pages.guideBookFeature.features.myLibrary.body1')" />
          <p v-html="$t('common.pages.guideBookFeature.features.myLibrary.body2')" />
        </v-col>
        <v-col align-self="center" cols="12" md="6">
          <v-sheet rounded class="pa-3" elevation="24">
            <v-img
              contain
              alt="Exemple d'un topothèque"
              src="/images/topotheque.webp"
              @click="openModal('/images/topotheque.webp')"
            />
          </v-sheet>
        </v-col>
      </v-row>

      <v-row class="guide-presentation-row">
        <v-col align-self="center" cols="12" md="6" class="pa-10">
          <h2 class="mb-4">
            {{ $t('common.pages.guideBookFeature.features.new.title') }}
          </h2>
          <p v-html="$t('common.pages.guideBookFeature.features.new.body1')" />
          <p v-html="$t('common.pages.guideBookFeature.features.new.body2')" />
        </v-col>
        <v-col align-self="center" cols="12" md="6" order-md="last">
          <v-sheet rounded class="pa-3" elevation="24">
            <v-img
              contain
              alt="Présentation de la nouvelle version de Briançon Climbing"
              src="/images/nouvelle-version.webp"
              @click="openModal('/images/nouvelle-version.webp')"
            />
          </v-sheet>
        </v-col>
      </v-row>

      <other-features no-this-feature="/guide-books/features" />

      <!-- Images dialogue -->
      <v-dialog v-model="imageModal" width="1200">
        <v-img contain alt="capture de oblyk.net" :src="imageSrc" />
      </v-dialog>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { mdiHandCoin, mdiCurrencyUsdOff } from '@mdi/js'
import AppFooter from '~/components/layouts/AppFooter'
import OtherFeatures from '~/components/globals/OtherFeatures'

export default {
  components: { OtherFeatures, AppFooter },
  data () {
    return {
      mdiHandCoin,
      mdiCurrencyUsdOff,
      imageModal: false,
      imageSrc: ''
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "Topos d'escalades et fonctionnalités",
        metaDescription: "Oblyk propose de nombreux outils permettant de trouver les topos, connaître les sites d'escalade qu'ils présentent, avoir une topothèque numérique, etc."
      },
      en: {
        metaTitle: 'Climbing guides and features',
        metaDescription: 'Oblyk offers many tools for finding guides, knowing the climbing crags they present, having a digital topo library, etc.'
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
  },

  methods: {
    openModal (src) {
      this.imageSrc = src
      this.imageModal = true
    }
  }
}
</script>
<style lang="scss">
.guide-features-h1 {
  font-size: 3em;
  margin-top: 1em;
  margin-bottom: 1.5em;
}
.guide-presentation-row {
  margin-top: 5em;
  margin-bottom: 8em !important;
}
</style>
