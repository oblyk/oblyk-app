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
    arrayResults: Array,
    titleKey: String,
    icon: String,
    callback: Function
  }
}
</script>
