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
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      cragRoutesTitle: this.$t('meta.crag.routes.title', {
        name: this.crag?.name,
        region: this.crag?.regions
      }),
      cragRoutesDescription: this.$t('meta.crag.routes.description', {
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
