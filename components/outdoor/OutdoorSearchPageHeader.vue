<template>
  <page-header
    :title="title"
    back-to="/outdoor"
    :links="headerLinks"
  />
</template>

<script>
import { mdiTerrain, mdiBookshelf, mdiSourceBranch } from '@mdi/js'
import PageHeader from '~/components/layouts/PageHeader'

export default {
  name: 'OutdoorSearchPageHeader',
  components: { PageHeader },
  props: {
    title: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      headerLinks: [
        {
          to: '/outdoor/search/crags',
          title: this.$t('home.figures.crags'),
          icon: mdiTerrain
        },
        {
          to: '/outdoor/search/guide-books',
          title: this.$t('home.figures.guides'),
          icon: mdiBookshelf
        },
        {
          to: '/outdoor/search/crag-routes',
          title: this.$t('home.figures.routes'),
          icon: mdiSourceBranch
        }
      ]
    }
  }
}
</script>
