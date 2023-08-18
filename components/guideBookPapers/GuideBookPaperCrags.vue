<template>
  <div>
    <crags-table
      :crags-data="cragsData.crag_with_levels"
      :route-figures="cragsData.route_figures"
      :callback-function="removeCrag"
      :callback-icon="mdiDelete"
    />
    <client-only>
      <div
        v-if="$auth.loggedIn"
        class="mt-3 text-right pa-3"
      >
        <v-btn
          small
          text
          outlined
          :to="`${guideBookPaper.path}/add-crag`"
          color="primary"
        >
          <v-icon
            left
          >
            {{ mdiTerrain }}
          </v-icon>
          {{ $t('components.guideBookPaper.addCragInGuide') }}
        </v-btn>
      </div>
    </client-only>
  </div>
</template>

<script>
import { mdiDelete, mdiTerrain } from '@mdi/js'
import GuideBookPaperApi from '~/services/oblyk-api/GuideBookPaperApi'
import CragsTable from '~/components/crags/CragsTable'

export default {
  name: 'GuideBookPaperCrags',
  components: { CragsTable },
  props: {
    cragsData: {
      type: Object,
      required: true
    },
    guideBookPaper: {
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
        new GuideBookPaperApi(this.$axios, this.$auth)
          .removeCrag(this.guideBookPaper.id, crag.id)
          .then(() => {
            this.$router.go()
          })
          .catch((err) => {
            this.$root.$emit('alertFromApiError', err, 'guideBookPaper')
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.guide-book-paper-crags-list {
  .guide-book-paper-crag-card, .guide-book-paper-crag-action {
    display: inline-block;
  }
  .guide-book-paper-crag-card {
    width: calc(100% - 100px);
  }
  .guide-book-paper-crag-action {
    width: 90px;
    height: 100px;
    vertical-align: top;
    line-height: 80px;
  }
}
</style>
