<template>
  <v-container v-if="gymChain">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.changeLogo') }}
        </h2>
        <gym-chain-image-form
          :gym-chain="gymChain"
          upload-type="logo"
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
        metaTitle: 'Changer le logo'
      },
      en: {
        metaTitle: 'Edit logo'
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
