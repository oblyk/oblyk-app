<template>
  <v-btn
    :icon="!label"
    :small="small"
    :color="copyIconColors[iconStatus]"
    @click="copyToken"
  >
    <v-icon small>
      {{ copyIcons[iconStatus] }}
    </v-icon>
    <span v-if="label" v-text="label" />
  </v-btn>
</template>

<script>
import { mdiAlertOutline, mdiCheck, mdiContentCopy } from '@mdi/js'

export default {
  name: 'CopyBtn',
  props: {
    message: {
      type: String,
      required: true
    },
    small: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      iconStatus: 'default',
      copyIconColors: {
        default: null,
        success: 'green',
        failed: 'red'
      },
      copyIcons: {
        default: mdiContentCopy,
        success: mdiCheck,
        failed: mdiAlertOutline
      }
    }
  },

  methods: {
    copyToken () {
      navigator.clipboard.writeText(this.message).then(
        () => { this.iconStatus = 'success' },
        () => { this.iconStatus = 'failed' }
      )
      setTimeout(() => { this.iconStatus = 'default' }, 3000)
    }
  }
}
</script>
