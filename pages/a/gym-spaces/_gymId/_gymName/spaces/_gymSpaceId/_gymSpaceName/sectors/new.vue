<template>
  <v-container v-if="gymSpace">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.gymSector.addNew') }}
        </h2>
        <p class="subtitle-2" v-html="$t('components.gymSector.addNewExplain')" />
        <p class="subtitle-2 mb-8">
          {{ $t('components.gymSector.explainGroupName') }}
        </p>
        <gym-sector-form
          :gym-space="gymSpace"
          submit-methode="post"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GymSpaceConcern } from '@/concerns/GymSpaceConcern'
import GymSectorForm from '@/components/gymSectors/forms/GymSectorForm'

export default {
  components: { GymSectorForm },
  mixins: [GymSpaceConcern],

  head () {
    return {
      title: this.$t('meta.gym.sector.new')
    }
  }
}
</script>
