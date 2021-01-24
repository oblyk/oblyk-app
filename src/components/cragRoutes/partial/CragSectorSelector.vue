<template>
  <div>
    <spinner v-if="loadingCragSectors" :full-height="false" />
    <v-select
      v-if="!loadingCragSectors"
      v-model="cragSectorId"
      :items="cragSectors"
      hide-details
      item-value="id"
      item-text="name"
      prepend-inner-icon="mdi-texture-box"
      :label="$t('components.cragSector.sectors')"
      outlined
      @change="onChange()"
    />
  </div>
</template>

<script>
import CragSectorApi from '@/services/oblyk-api/CragSectorApi'
import Spinner from '@/components/layouts/Spiner'
import CragSector from '@/models/CragSector'

export default {
  name: 'CragSectorSelector',
  components: { Spinner },
  props: {
    crag: Object,
    cragSector: Object
  },

  data () {
    return {
      cragSectorId: (this.cragSector || {}).id || 0,
      loadingCragSectors: true,
      cragSectors: []
    }
  },

  mounted () {
    this.getCragSectors()
  },

  methods: {
    getCragSectors: function () {
      this.loadingCragSectors = true
      const cragId = this.crag ? this.crag.id : this.cragSector.id

      this.cragSectors = [
        {
          name: this.$t('components.cragSector.allSectors'), id: 0
        }
      ]
      CragSectorApi
        .all(cragId)
        .then(resp => {
          for (const sector of resp.data) {
            this.cragSectors.push(new CragSector(sector))
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'cragSector')
        })
        .finally(() => {
          this.loadingCragSectors = false
        })
    },

    onChange: function () {
      if (this.cragSectorId === 0) {
        if (this.crag) {
          this.router.push(this.crag.path())
        } else {
          this.$router.push((this.cragSector.Crag.path()))
        }
      } else {
        for (const sector of this.cragSectors) {
          if (sector.id === this.cragSectorId) {
            this.$router.push(sector.path())
          }
        }
      }
    }
  }
}
</script>
