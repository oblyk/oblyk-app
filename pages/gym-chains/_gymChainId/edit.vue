<template>
  <v-container v-if="gymChain">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.edit') }} {{ gymChain.name }}
        </h2>
        <gym-chain-form :gym-chain="gymChain" submit-methode="put" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GymChainConcern } from '~/concerns/GymChainConcern'
import GymChainForm from '~/components/gymChains/forms/GymChainForm'

export default {
  meta: { orphanRoute: true },
  components: { GymChainForm },
  mixins: [GymChainConcern],
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('actions.editName', { name: this.gymChain?.name })
    }
  }
}
</script>
