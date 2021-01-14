<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left>
        mdi-store
      </v-icon>
      {{ $t('components.guideBookPaper.pointOfSale') }}
    </v-card-title>
    <v-card-text>
      ...
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'GuideBookPaperBuy',
  props: {
    guideBookPaper: Object
  }
}
</script>
