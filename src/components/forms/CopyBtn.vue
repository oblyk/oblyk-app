<template>
  <v-btn
    icon
    small
    v-clipboard:copy="message"
    v-clipboard:success="onCopy"
    v-clipboard:error="onError"
  >
    <v-icon small>mdi-content-copy</v-icon>
  </v-btn>
</template>
<script>
export default {
  name: 'CopyBtn',
  props: {
    message: String
  },

  methods: {
    onCopy: function () {
      this.$root.$emit('alertSimpleSuccess', this.$t('actions.valueCopied', { value: this.message }))
    },

    onError: function () {
      this.$root.$emit('alertSimpleError', this.$t('actions.errorHasOccurred'))
    }
  }
}
</script>
