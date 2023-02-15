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
    },
    gym: {
      type: Object,
      default: null
    },
    gymSpace: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      sort: this.value,

      mdiSortAscending
    }
  },

  computed: {
    items () {
      const sortableItems = [
        { text: this.$t('components.gymRoute.sorts.opened_at'), value: 'opened_at' },
        { text: this.$t('components.gymRoute.sorts.sector'), value: 'sector' }
      ]
      const sortsAvailable = this.gymSpace ? this.gymSpace.sorts_available : this.gym.sorts_available

      if (sortsAvailable.difficulty_by_grade) {
        sortableItems.push({ text: this.$t('components.gymRoute.sorts.grade'), value: 'grade' })
      }
      if (sortsAvailable.difficulty_by_level) {
        sortableItems.push({ text: this.$t('components.gymRoute.sorts.level'), value: 'level' })
      }
      if (sortsAvailable.difficulty_by_point) {
        sortableItems.push({ text: this.$t('components.gymRoute.sorts.point'), value: 'point' })
      }
      return sortableItems
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
