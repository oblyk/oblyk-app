<template>
  <div>
    <spinner v-if="loadingCrags" />

    <v-container v-if="!loadingCrags">
      <v-row>
        <v-col>
          <div
            v-for="crag in crags"
            :key="crag.id"
          >
            <crag-small-card :crag="crag" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Spinner from '@/components/layouts/Spiner'
import GuideBookPaperApi from '@/services/oblyk-api/GuideBookPaperApi'
import Crag from '@/models/Crag'
import CragSmallCard from '@/components/crags/CragSmallCard'

export default {
  name: 'GuideBookPaperCragsView',
  components: { CragSmallCard, Spinner },
  props: {
    guideBookPaper: Object
  },

  data () {
    return {
      crags: [],
      loadingCrags: true
    }
  },

  mounted () {
    this.getCrags()
  },

  methods: {
    getCrags: function () {
      GuideBookPaperApi
        .crags(this.guideBookPaper.id)
        .then(resp => {
          for (const crag of resp.data) {
            this.crags.push(new Crag(crag))
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'crag')
        }).then(() => {
          this.loadingCrags = false
        })
    }
  }
}
</script>
