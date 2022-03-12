<template>
  <div>
    <v-skeleton-loader
      v-if="loadingCragSectors"
      class="mx-auto"
      type="actions"
    />
    <v-select
      v-if="!loadingCragSectors"
      v-model="cragSectorId"
      :items="cragSectors"
      hide-details
      item-value="id"
      item-text="nameAndGap"
      :prepend-inner-icon="mdiTextureBox"
      :label="$t('components.cragSector.sectors')"
      outlined
      @change="onChange()"
    />
  </div>
</template>

<script>
import { mdiTextureBox } from '@mdi/js'
import CragSectorApi from '~/services/oblyk-api/CragSectorApi'
import CragSector from '@/models/CragSector'

export default {
  name: 'CragSectorSelector',
  props: {
    crag: {
      type: Object,
      default: null
    },
    cragSector: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      mdiTextureBox,
      cragSectorId: (this.cragSector || {}).id || 0,
      loadingCragSectors: true,
      cragSectors: []
    }
  },

  mounted () {
    this.getCragSectors()
  },

  methods: {
    getCragSectors () {
      this.loadingCragSectors = true
      const cragId = this.crag ? this.crag.id : this.cragSector.crag_id

      this.cragSectors = [
        {
          nameAndGap: this.$t('components.cragSector.allSectors'), id: 0
        }
      ]
      new CragSectorApi(this.$axios, this.$auth)
        .all(cragId)
        .then((resp) => {
          for (const sector of resp.data) {
            this.cragSectors.push(new CragSector({ attributes: sector }))
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'cragSector')
        })
        .finally(() => {
          this.loadingCragSectors = false
        })
    },

    onChange () {
      if (this.cragSectorId === 0) {
        if (this.crag) {
          this.router.push(this.crag.path)
        } else {
          this.$router.push((this.cragSector.Crag.path))
        }
      } else {
        for (const sector of this.cragSectors) {
          if (sector.id === this.cragSectorId) {
            this.$router.push(sector.path)
          }
        }
      }
    }
  }
}
</script>
