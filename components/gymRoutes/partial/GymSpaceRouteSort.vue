<template>
  <v-select
    v-model="sort"
    :items="items"
    item-text="text"
    item-value="value"
    outlined
    dense
    hide-details
    :prepend-inner-icon="mdiSortAscending"
    @input="change"
  />
</template>

<script>
import { mdiSortAscending } from '@mdi/js'

export default {
  name: 'GymSpaceRouteSort',
  props: {
    value: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      items: [
        { text: this.$t('components.gymRoute.sorts.opened_at'), value: 'opened_at' },
        { text: this.$t('components.gymRoute.sorts.sector'), value: 'sector' },
        { text: this.$t('components.gymRoute.sorts.grade'), value: 'grade' },
        { text: this.$t('components.gymRoute.sorts.level'), value: 'level' }
      ],
      sort: this.value,

      mdiSortAscending
    }
  },

  watch: {
    value () {
      this.sort = this.value
    }
  },

  methods: {
    change () {
      this.$emit('input', this.sort)
    }
  }
}
</script>
