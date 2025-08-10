<template>
  <page-header
    :title="crag.name"
    :back-to="backTo || '/outdoor'"
    :links="headerLinks"
  />
</template>
<script>
import PageHeader from '~/components/layouts/PageHeader'

export default {
  name: 'CragPageHeader',
  components: { PageHeader },
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  computed: {
    headerLinks () {
      const mediaCount = this.crag.all_photos_count + this.crag.all_videos_count
      const guidesCount = this.crag.guide_books.paper_count + this.crag.guide_books.web_count + this.crag.guide_books.pdf_count
      return [
        {
          to: this.crag.path,
          title: this.$t('components.crag.tabs.info')
        },
        {
          to: `${this.crag.path}/routes`,
          title: this.$t('components.crag.tabs.routes'),
          badge: this.crag.routes_figures.route_count > 0 ? this.crag.routes_figures.route_count : null
        },
        {
          to: `${this.crag.path}/photos`,
          title: this.$t('components.crag.tabs.media'),
          badge: mediaCount > 0 ? mediaCount : null
        },
        {
          to: `${this.crag.path}/links`,
          title: this.$t('components.crag.tabs.links'),
          badge: this.crag.link_count > 0 ? this.crag.link_count : null
        },
        {
          to: `${this.crag.path}/guide-books`,
          title: this.$t('components.crag.tabs.guideBooks'),
          badge: guidesCount > 0 ? guidesCount : null
        },
        {
          to: `${this.crag.path}/maps`,
          title: this.$t('components.crag.tabs.map')
        }
      ]
    },

    backTo () {
      return this.$store.getters['oblykEnvironment/getPreviousHubs'](this.$route.path, this.crag.path)
    }
  }
}

</script>
