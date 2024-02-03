<template>
  <v-container v-if="gymChain">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.changeBanner') }}
        </h2>
        <gym-chain-image-form
          :gym-chain="gymChain"
          upload-type="banner"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GymChainConcern } from '~/concerns/GymChainConcern'
import GymChainImageForm from '~/components/gymChains/forms/GymChainImageForm'

export default {
  meta: { orphanRoute: true },
  components: { GymChainImageForm },
  mixins: [GymChainConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Changer le bandeau'
      },
      en: {
        metaTitle: 'Edit banner'
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
