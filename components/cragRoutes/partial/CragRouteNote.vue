<template>
  <span v-if="route.note" class="route-note">
    <note :note="route.note" />
    <span
      :title="`${route.note_count} ${$t('components.note.votes')}`"
      class="text--disabled number-of-note"
    >
      ({{ route.note_count }})
    </span>
  </span>
</template>

<script>
import Note from '@/components/notes/Note'

export default {
  name: 'CragRouteNote',
  components: { Note },
  props: {
    route: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.route-note {
  .number-of-note {
    vertical-align: text-top;
    font-size: 0.7em;
  }
}
</style>
