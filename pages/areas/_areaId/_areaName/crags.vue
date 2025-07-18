<template>
  <div>
    <skeleton-loader-page-head v-if="$fetchState.pending" />
    <div v-else>
      <area-page-header :area="area" />
      <v-container class="area-container">
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
      </v-container>
    </div>
  </div>
</template>

<script>
import { AreaConcern } from '~/concerns/AreaConcern'
import AreaApi from '@/services/oblyk-api/AreaApi'
import AreaCrags from '@/components/areas/AreaCrags'
import AreaPageHeader from '~/components/areas/layouts/AreaPageHeader.vue'
import SkeletonLoaderPageHead from '~/components/layouts/SkeletonLoaderPageHead.vue'

export default {
  components: { SkeletonLoaderPageHead, AreaPageHeader, AreaCrags },
  mixins: [AreaConcern],

  data () {
    return {
      crags: [],
      loadingCrags: true,
      areaCragsMetaTitle: this.$t('metaTitle', {
        name: this.area?.name,
        region: this.area?.region
      }),
      areaCragsMetaDescription: this.$t('metaDescription', {
        name: this.area?.name,
        region: this.area?.region,
        city: this.area?.city
      })
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "Les falaises de %{name}, Groupe de sites d'escalade",
        metaDescription: "Voir les falaises du groupe de sites d'escalade de %{name}, quels spots de grimpe il présente ou encore quelle variété de cotations on y trouve"
      },
      en: {
        metaTitle: 'Crags of %{name}, climbing crags group',
        metaDescription: 'See the crags of the group of climbing sites of %{name}, what kind of climbing spots it offers or what variety of grades can be found there'
      }
    }
  },

  head () {
    return {
      titleTemplate: this.areaCragsMetaTitle,
      meta: [
        { hid: 'og:title', property: 'og:title', content: this.areaCragsMetaTitle },
        { hid: 'description', name: 'description', content: this.areaCragsMetaDescription },
        { hid: 'og:description', property: 'og:description', content: this.areaCragsMetaDescription },
        { hid: 'og:url', property: 'og:url', content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.area?.path}/crags` }
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
        .cragsFigures(this.$route.params.areaId)
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
