<template>
  <span
    v-if="note"
    :title="noteLabel()"
    class="route-note"
  >
    <span v-if="note === 0">
      <v-icon small>{{ mdiStarOutline }}</v-icon>
      <v-icon small>{{ mdiStarOutline }}</v-icon>
      <v-icon small>{{ mdiStarOutline }}</v-icon>
    </span>
    <span v-if="note === 1">
      <v-icon small>{{ mdiStarHalfFull }}</v-icon>
      <v-icon small>{{ mdiStarOutline }}</v-icon>
      <v-icon small>{{ mdiStarOutline }}</v-icon>
    </span>
    <span v-if="note === 2">
      <v-icon small>{{ mdiStar }}</v-icon>
      <v-icon small>{{ mdiStarOutline }}</v-icon>
      <v-icon small>{{ mdiStarOutline }}</v-icon>
    </span>
    <span v-if="note === 3">
      <v-icon small>{{ mdiStar }}</v-icon>
      <v-icon small>{{ mdiStarHalfFull }}</v-icon>
      <v-icon small>{{ mdiStarOutline }}</v-icon>
    </span>
    <span v-if="note === 4">
      <v-icon small>{{ mdiStar }}</v-icon>
      <v-icon small>{{ mdiStar }}</v-icon>
      <v-icon small>{{ mdiStarOutline }}</v-icon>
    </span>
    <span v-if="note === 5">
      <v-icon small>{{ mdiStar }}</v-icon>
      <v-icon small>{{ mdiStar }}</v-icon>
      <v-icon small>{{ mdiStarHalfFull }}</v-icon>
    </span>
    <span v-if="note === 6">
      <v-icon small>{{ mdiStar }}</v-icon>
      <v-icon small>{{ mdiStar }}</v-icon>
      <v-icon small>{{ mdiStar }}</v-icon>
    </span>
  </span>
</template>

<script>
import { mdiStarOutline, mdiStarHalfFull, mdiStar } from '@mdi/js'
import Note from '@/models/Note'

export default {
  name: 'Note',
  props: {
    note: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
      mdiStarOutline,
      mdiStarHalfFull,
      mdiStar
    }
  },

  methods: {
    noteLabel () {
      const noteText = new Note().valueToText(this.note)
      return this.$t(`models.note.${noteText}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.route-note {
  .v-icon {
    vertical-align: baseline;
  }
}
</style>
