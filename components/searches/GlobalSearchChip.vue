<template>
  <v-chip
    v-if="arrayResults.length > 0"
    outlined
    class="mr-2"
    @click="callback(titleKey)"
  >
    <v-icon left>
      {{ icon }}
    </v-icon>
    {{ $tc(`components.search.count.${titleKey}`, arrayResults.length, { count: arrayResults.length }) }}
  </v-chip>
</template>

<script>
export default {
  name: 'GlobalSearchChip',
  props: {
    arrayResult: {
      type: Array,
      required: true
    },
    titleKey: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    callback: {
      type: Function,
      required: true
    }
  }
}
</script>
