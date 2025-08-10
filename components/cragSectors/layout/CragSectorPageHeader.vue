<template>
  <page-header
    :title="cragSector.name"
    :back-to="$route.path === cragSector.path ? `${cragSector.Crag.path}/routes` : cragSector.path"
    :links="headerLinks"
  >
    <template #title>
      <h1>
        <cite class="font-weight-regular">
          {{ $t('components.cragSector.sector') }}
        </cite>
        {{ cragSector.name }}
      </h1>
    </template>
  </page-header>
</template>
<script>
import PageHeader from '~/components/layouts/PageHeader'

export default {
  name: 'CragSectorPageHeader',
  components: { PageHeader },
  props: {
    cragSector: {
      type: Object,
      required: true
    }
  },

  computed: {
    headerLinks () {
      return [
        {
          to: this.cragSector.path,
          title: this.$t('components.crag.tabs.info')
        },
        {
          to: `${this.cragSector.path}/photos`,
          title: this.$t('components.crag.tabs.media'),
          badge: this.cragSector.photo_count > 0 ? this.cragSector.photo_count : null
        },
        {
          to: `${this.cragSector.path}/maps`,
          title: this.$t('components.crag.tabs.map')
        }
      ]
    }
  }
}

</script>
