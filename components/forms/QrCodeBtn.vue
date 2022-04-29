<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        aria-label="display a qrcode to scan gps coordinates"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon
          small
        >
          {{ mdiQrcodeScan }}
        </v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline">
        {{ value }}
      </v-card-title>

      <v-card-text>
        <vue-qrcode class="qr-code-canvas" :value="value" :options="{ width: 200 }" />
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          @click="dialog = false"
        >
          {{ $t('actions.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiQrcodeScan } from '@mdi/js'
const VueQrcode = () => import('@chenfengyuan/vue-qrcode')

export default {
  name: 'QrCodeBtn',

  components: {
    VueQrcode
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      mdiQrcodeScan,
      dialog: false
    }
  }
}
</script>

<style lang="scss" scoped>
.qr-code-canvas {
  margin-right: auto;
  margin-left: auto;
  display: block;
}
</style>
