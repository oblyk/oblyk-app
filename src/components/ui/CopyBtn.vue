<template>
  <v-btn
    icon
    :small="small"
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
    message: String,
    small: {
      type: Boolean,
      default: true
    }
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
