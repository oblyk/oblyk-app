<template>
  <page-header
    :title="$t('components.layout.appDrawer.guideBook.title')"
    back-to="/find/guide-books"
    :links="headerLinks"
  />
</template>
<script>
import { mdiMapLegend, mdiMapMarkerRadius, mdiOctagram } from '@mdi/js'
import PageHeader from '~/components/layouts/PageHeader.vue'

export default {
  name: 'GuideBookPaperPageHeader',
  components: { PageHeader },

  data () {
    return {
      headerLinks: [
        {
          to: '/maps/guide-book-papers',
          title: this.$t('components.map.title'),
          icon: mdiMapLegend
        },
        {
          to: '/guide-book-papers/find',
          title: this.$t('common.pages.find.crags.aroundCity.title'),
          icon: mdiMapMarkerRadius
        },
        {
          to: '/library',
          title: this.$t('common.pages.find.guideBooks.new.title'),
          icon: mdiOctagram
        }
      ]
    }
  }
}
</script>
