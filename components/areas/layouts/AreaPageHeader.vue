<template>
  <page-header
    :title="area.name"
    :back-to="area.path"
    :links="headerLinks"
  />
</template>
<script>
import PageHeader from '~/components/layouts/PageHeader.vue'

export default {
  name: 'AreaPageHeader',
  components: { PageHeader },
  props: {
    area: {
      type: Object,
      required: true
    }
  },

  computed: {
    headerLinks () {
      return [
        {
          to: this.area.path,
          title: this.$t('components.area.tabs.info')
        },
        {
          to: `${this.area.path}/crags`,
          title: this.$t('components.area.tabs.crags'),
          badge: this.area.crags_count > 0 ? this.area.crags_count : null
        },
        {
          to: `${this.area.path}/photos`,
          title: this.$t('components.area.tabs.photos')
        }
      ]
    }
  }
}

</script>
