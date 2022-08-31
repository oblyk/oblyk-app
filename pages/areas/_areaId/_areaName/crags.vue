<template>
  <div>
    <v-skeleton-loader
      v-if="loadingCrags"
      class="mb-3"
      type="text, text, text"
    />
    <area-crags
      v-if="!loadingCrags"
      :crags-data="crags"
      :area="area"
    />
  </div>
</template>

<script>
import AreaApi from '@/services/oblyk-api/AreaApi'
import AreaCrags from '@/components/areas/AreaCrags'

export default {
  components: { AreaCrags },
  props: {
    area: { type: Object, required: true }
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

  head () {
    return {
      titleTemplate: this.areaCragsMetaTitle,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.areaCragsMetaTitle
        },
        {
          hid: 'description',
          name: 'description',
          content: this.areaCragsMetaDescription
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.areaCragsMetaDescription
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.area.path}/crags`
        }
      ]
    }
  },

  mounted () {
    this.getCrags()
  },

  methods: {
    getCrags () {
      this.crags = []
      this.loadingCrags = true
      new AreaApi(this.$axios, this.$auth)
        .cragsFigures(this.area.id)
        .then((resp) => {
          this.crags = resp.data
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'area')
        })
        .finally(() => {
          this.loadingCrags = false
        })
    }
  }
}
</script>
