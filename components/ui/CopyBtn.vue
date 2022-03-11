<template>
  <v-btn
    v-clipboard:copy="message"
    v-clipboard:success="onCopy"
    v-clipboard:error="onError"
    icon
    :small="small"
  >
    <v-icon small>
      {{ mdiContentCopy }}
    </v-icon>
  </v-btn>
</template>

<script>
import { mdiContentCopy } from '@mdi/js'

export default {
  name: 'CopyBtn',
  props: {
    message: String,
    small: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      mdiContentCopy
    }
  },

  methods: {
    onCopy () {
      this.$root.$emit('alertSimpleSuccess', this.$t('actions.valueCopied', { value: this.message }))
    },

    onError () {
      this.$root.$emit('alertSimpleError', this.$t('actions.errorHasOccurred'))
    }
  }
}
</script>
