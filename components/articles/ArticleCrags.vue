<template>
  <div v-if="crags.length > 0">
    <h2 class="mb-2">
      <v-icon left>
        {{ mdiTerrain }}
      </v-icon>
      {{ $t('components.article.cragList') }}
    </h2>
    <crag-small-card
      v-for="crag in crags"
      :key="crag.id"
      class="mb-2"
      :crag="crag"
    />
  </div>
</template>

<script>
import { mdiTerrain } from '@mdi/js'
import CragSmallCard from '@/components/crags/CragSmallCard'
import ArticleApi from '~/services/oblyk-api/ArticleApi'
import Crag from '@/models/Crag'

export default {
  name: 'ArticleCrags',
  components: { CragSmallCard },
  props: {
    article: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiTerrain,
      crags: []
    }
  },

  mounted () {
    this.getArticleCrags()
  },

  methods: {
    getArticleCrags () {
      new ArticleApi(this.$axios, this.$auth)
        .crags(this.article.id)
        .then((resp) => {
          for (const crag of resp.data) {
            this.crags.push(new Crag({ attributes: crag }))
          }
        })
    }
  }
}
</script>
