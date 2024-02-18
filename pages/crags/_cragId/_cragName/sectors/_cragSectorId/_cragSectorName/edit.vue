<template>
  <v-container v-if="!$fetchState.pending">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.edit') }}
          {{ cragSector.name }}
        </h2>
        <crag-sector-form
          :crag="cragSector.crag"
          :crag-sector="cragSector"
          submit-methode="put"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CragSectorForm from '~/components/cragSectors/forms/CragSectorForm'
import { CragSectorConcern } from '~/concerns/CragSectorConcern'

export default {
  meta: { orphanRoute: true },
  components: { CragSectorForm },
  mixins: [CragSectorConcern],
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('actions.editName', { name: this.cragSector?.name })
    }
  }
}
</script>
