<template>
  <v-select
    v-model="sort"
    :items="items"
    item-text="text"
    item-value="value"
    prepend-icon="mdi-sort-ascending"
    @input="change"
  ></v-select>
</template>
<script>
export default {
  name: 'GymSpaceRouteSort',
  props: {
    value: String
  },

  data () {
    return {
      sort: 'opened_at',
      items: [
        { text: this.$t('components.gymRoute.sorts.opened_at'), value: 'opened_at' },
        { text: this.$t('components.gymRoute.sorts.sector'), value: 'sector' },
        { text: this.$t('components.gymRoute.sorts.grade'), value: 'grade' }
      ]
    }
  },

  created () {
    this.sort = this.value || 'opened_at'
  },

  methods: {
    change: function () {
      this.$emit('input', this.sort)
    }
  }
}
</script>
