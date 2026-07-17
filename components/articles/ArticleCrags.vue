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
import OblykApi from '~/services/oblyk-api/OblykApi'

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
      new OblykApi(this.$axios, this.$auth)
        .get(`/articles/${this.article.id}/crags`)
        .then((resp) => {
          this.crags = resp.data
        })
    }
  }
}
</script>
