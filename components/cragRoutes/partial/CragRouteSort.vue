<template>
  <v-select
    v-model="routeSort"
    :items="sortItems"
    item-text="text"
    item-value="value"
    :prepend-inner-icon="mdiSortAscending"
    outlined
    hide-details
    :label="$t('components.cragRoute.sortRouteLabel')"
    @change="onChange()"
  />
</template>

<script>
import { mdiSortAscending } from '@mdi/js'
export default {
  name: 'CragRouteSort',
  props: {
    value: String
  },

  data () {
    return {
      mdiSortAscending,
      routeSort: this.value || 'difficulty_desc',
      sortItems: [
        { text: this.$t('components.cragRoute.sort.difficulty_desc'), value: 'difficulty_desc' },
        { text: this.$t('components.cragRoute.sort.difficulty_asc'), value: 'difficulty_asc' },
        { text: this.$t('components.cragRoute.sort.name'), value: 'name' },
        { text: this.$t('components.cragRoute.sort.note'), value: 'note' }
      ]
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.routeSort)
    }
  }
}
</script>
