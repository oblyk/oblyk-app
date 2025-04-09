<template>
  <div>
    <v-badge
      v-if="arrayResult.length > 0"
      inline
      :content="arrayResult.length"
    >
      {{ $t(titleKey) }}
    </v-badge>
    <span v-else>{{ $t(titleKey) }}</span>
  </div>
</template>

<script>
export default {
  name: 'GlobalSearchTabTitle',
  props: {
    arrayResult: {
      type: Array,
      required: true
    },
    titleKey: {
      type: String,
      required: true
    }
  }
}
</script>
