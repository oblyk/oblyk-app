<template>
  <div>
    <v-container>
      <crag-sector-description :crag-sector="cragSector" />
    </v-container>
  </div>
</template>

<script>
import CragSectorDescription from '@/components/cragSectors/CragSectorDescription'

export default {
  name: 'CragSectorInfoView',
  components: { CragSectorDescription },
  props: {
    cragSector: Object
  }
}
</script>
