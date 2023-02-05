<template>
  <span
    v-if="note !== null"
    :title="noteLabel()"
    class="route-note"
  >
    <span v-if="note === 0">
      <v-icon :color="color" small>{{ mdiStarOutline }}</v-icon>
      <v-icon :color="color" small>{{ mdiStarOutline }}</v-icon>
      <v-icon :color="color" small>{{ mdiStarOutline }}</v-icon>
    </span>
    <span v-if="note === 1">
      <v-icon :color="color" small>{{ mdiStarHalfFull }}</v-icon>
      <v-icon :color="color" small>{{ mdiStarOutline }}</v-icon>
      <v-icon :color="color" small>{{ mdiStarOutline }}</v-icon>
    </span>
    <span v-if="note === 2">
      <v-icon :color="color" small>{{ mdiStar }}</v-icon>
      <v-icon :color="color" small>{{ mdiStarOutline }}</v-icon>
      <v-icon :color="color" small>{{ mdiStarOutline }}</v-icon>
    </span>
    <span v-if="note === 3">
      <v-icon :color="color" small>{{ mdiStar }}</v-icon>
      <v-icon :color="color" small>{{ mdiStarHalfFull }}</v-icon>
      <v-icon :color="color" small>{{ mdiStarOutline }}</v-icon>
    </span>
    <span v-if="note === 4">
      <v-icon :color="color" small>{{ mdiStar }}</v-icon>
      <v-icon :color="color" small>{{ mdiStar }}</v-icon>
      <v-icon :color="color" small>{{ mdiStarOutline }}</v-icon>
    </span>
    <span v-if="note === 5">
      <v-icon :color="color" small>{{ mdiStar }}</v-icon>
      <v-icon :color="color" small>{{ mdiStar }}</v-icon>
      <v-icon :color="color" small>{{ mdiStarHalfFull }}</v-icon>
    </span>
    <span v-if="note === 6">
      <v-icon :color="color" small>{{ mdiStar }}</v-icon>
      <v-icon :color="color" small>{{ mdiStar }}</v-icon>
      <v-icon :color="color" small>{{ mdiStar }}</v-icon>
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
    },
    color: {
      type: String,
      default: null
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
    vertical-align: middle;
  }
}
</style>
