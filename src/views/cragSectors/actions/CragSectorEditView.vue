<template>
  <v-container v-if="crag && cragSector">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.edit') }}
          {{ cragSector.name }}
        </h2>
        <crag-sector-form
          :crag="crag"
          :crag-sector="cragSector"
          submit-methode="put"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CragSectorForm from '@/components/cragSectors/forms/CragSectorForm'
import { CragConcern } from '@/concerns/CragConcern'
import { CragSectorConcern } from '@/concerns/CragSectorConcern'

export default {
  name: 'CragSectorEditView',
  components: { CragSectorForm },
  mixins: [CragConcern, CragSectorConcern],

  metaInfo () {
    return {
      title: this.$t('meta.generics.edit', { name: (this.cragSector || {}).name })
    }
  }
}
</script>
