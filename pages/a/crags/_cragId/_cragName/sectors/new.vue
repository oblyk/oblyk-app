<template>
  <v-container v-if="crag">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.cragSector.newSector') }}
        </h2>
        <crag-sector-form
          :crag="crag"
          submit-methode="post"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CragSectorForm from '@/components/cragSectors/forms/CragSectorForm'
import { CragConcern } from '@/concerns/CragConcern'

export default {
  components: { CragSectorForm },
  mixins: [CragConcern],
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.cragSector.new')
    }
  }
}
</script>
