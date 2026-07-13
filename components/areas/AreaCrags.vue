<template>
  <div>
    <crags-table
      :crags-data="cragsData.crag_with_levels"
      :route-figures="cragsData.route_figures"
      :callback-function="removeCrag"
      :callback-icon="mdiDelete"
    />

    <client-only>
      <div v-if="$auth.loggedIn" class="mt-3 text-right">
        <v-btn
          text
          outlined
          :to="`${area.app_path}/add-crag`"
          color="primary"
        >
          <v-icon
            left
          >
            {{ mdiTerrain }}
          </v-icon>
          {{ $t('components.area.addCragInArea') }}
        </v-btn>
      </div>
    </client-only>
  </div>
</template>

<script>
import { mdiDelete, mdiTerrain } from '@mdi/js'
import OblykApi from '~/services/oblyk-api/OblykApi'
import CragsTable from '~/components/crags/CragsTable'

export default {
  name: 'AreaCrags',
  components: { CragsTable },
  props: {
    cragsData: {
      type: Object,
      default: null
    },
    area: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiDelete,
      mdiTerrain
    }
  },

  methods: {
    removeCrag (crag) {
      if (confirm(this.$t('actions.areYouSur'))) {
        new OblykApi(this.$axios, this.$auth)
          .delete(
            `/public/areas/${this.area.id}/remove_crag`,
            { area: { crag_id: crag.id } }
          )
          .then(() => {
            this.$router.go(0)
          })
          .catch((err) => {
            this.$root.$emit('alertFromApiError', err, 'area')
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.area-crags-list {
  .area-crag-card, .area-crag-action {
    display: inline-block;
  }
  .area-crag-card {
    width: calc(100% - 100px);
  }
  .area-crag-action {
    width: 90px;
    height: 100px;
    vertical-align: top;
    line-height: 80px;
  }
}
</style>
