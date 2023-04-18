<template>
  <div>
    <spinner v-if="loadingGymSector" />

    <v-container v-if="gymSpace && !loadingGymSector">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('actions.edit') }}
            {{ gymSector.name }}
          </h2>
          <p class="subtitle-2" v-html="$t('components.gymSector.addNewExplain')" />
          <gym-sector-form
            :gym-space="gymSpace"
            :gym-sector="gymSector"
            submit-methode="put"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { GymSpaceConcern } from '@/concerns/GymSpaceConcern'
import Spinner from '@/components/layouts/Spiner'
import GymSectorForm from '@/components/gymSectors/forms/GymSectorForm'
import { GymSectorConcern } from '@/concerns/GymSectorConcern'

export default {
  meta: { orphanRoute: true },
  components: { GymSectorForm, Spinner },
  mixins: [GymSpaceConcern, GymSectorConcern],

  head () {
    return {
      title: this.$t('actions.editName', { name: this.gymSector?.name })
    }
  }
}
</script>
