<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon
          small
        >
          mdi-qrcode-scan
        </v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline">
        {{ value }}
      </v-card-title>

      <v-card-text>
        <qrcode class="qr-code-canvas" :value="value" :options="{ width: 200 }" />
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
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
export default {
  name: 'QrCodeBtn',
  props: {
    value: String
  },

  data () {
    return {
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
