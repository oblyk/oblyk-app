<template>
  <div>
    <crag-routes :crag="crag" />
    <client-only>
      <crag-route-drawer />
    </client-only>
  </div>
</template>

<script>
import CragRoutes from '~/components/cragRoutes/CragRoutes'
const CragRouteDrawer = () => import('~/components/cragRoutes/CragRouteDrawer')

export default {
  components: { CragRouteDrawer, CragRoutes },
  scrollToTop: true,
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "Les voies de %{name}, site d'escalade en %{region}",
        metaDescription: "Retrouvez toutes les voies et blocs du site d'escalade de %{name}, les cotations et les avis des grimpeurs"
      },
      en: {
        metaTitle: 'The routes of %{name}, climbing site in %{region}',
        metaDescription: "Find all the routes and boulders of the %{name} climbing site, the quotations and the climbers' opinions"
      }
    }
  },

  data () {
    return {
      cragRoutesTitle: this.$t('metaTitle', {
        name: this.crag?.name,
        region: this.crag?.regions
      }),
      cragRoutesDescription: this.$t('metaDescription', {
        name: this.crag?.name
      })
    }
  },

  head () {
    return {
      titleTemplate: this.cragRoutesTitle,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.cragRoutesTitle
        },
        {
          hid: 'description',
          name: 'description',
          content: this.cragRoutesDescription
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.cragRoutesDescription
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.crag.path}/routes`
        }
      ]
    }
  }
}
</script>
