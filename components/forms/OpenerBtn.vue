<template>
  <v-sheet
    class="py-2 px-3 mb-1 rounded-sm activable-v-sheet"
    :class="openerList.includes(opener.value) ? '--active' : '--inactive'"
    @click="emit"
  >
    <p class="mb-0 text-truncate">
      {{ opener.text }}
    </p>
  </v-sheet>
</template>

<script>
export default {
  name: 'OpenerBtn',
  props: {
    opener: {
      type: Object,
      required: true
    },
    openerList: {
      type: Array,
      required: true
    }
  },
  methods: {
    emit () {
      this.$emit('input', this.opener.value)
    }
  }
}
</script>
