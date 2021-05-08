<template>
  <v-container>
    <spinner v-if="loadingCrags" />
    <area-crags
      v-if="!loadingCrags"
      :crags="crags"
      :area="area"
    />
  </v-container>
</template>

<script>
import AreaApi from '@/services/oblyk-api/AreaApi'
import Crag from '@/models/Crag'
import Spinner from '@/components/layouts/Spiner'
import AreaCrags from '@/components/areas/AreaCrags'

export default {
  name: 'AreaCragsView',
  components: { AreaCrags, Spinner },
  props: {
    area: Object
  },

  data () {
    return {
      crags: [],
      loadingCrags: true,
      areaCragsMetaTitle: `${this.$t('meta.generics.crags')} ${this.$t('meta.crag.title', {
        name: (this.area || {}).name,
        region: (this.area || {}).region
      })}`,
      areaCragsMetaDescription: `${this.$t('meta.generics.crags')} ${this.$t('meta.crag.description', {
        name: (this.area || {}).name,
        region: (this.area || {}).region,
        city: (this.area || {}).city
      })}`
    }
  },

  metaInfo () {
    return {
      titleTemplate: this.areaCragsMetaTitle,
      meta: [
        {
          vmid: 'og-title',
          property: 'og:title',
          content: this.areaCragsMetaTitle
        },
        {
          vmid: 'description',
          name: 'description',
          content: this.areaCragsMetaDescription
        },
        {
          vmid: 'og-description',
          property: 'og:description',
          content: this.areaCragsMetaDescription
        },
        {
          vmid: 'og-url',
          property: 'og:url',
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.area.path('guide-books')}`
        }
      ]
    }
  },

  mounted () {
    this.getCrags()
  },

  methods: {
    getCrags: function () {
      this.crags = []
      this.loadingCrags = true
      AreaApi
        .crags(this.area.id)
        .then(resp => {
          for (const crag of resp.data) {
            this.crags.push(new Crag(crag))
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'area')
        })
        .finally(() => {
          this.loadingCrags = false
        })
    }
  }
}
</script>
