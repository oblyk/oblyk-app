<template>
  <div>
    <h4 class="mb-2">
      {{ $t('components.otherFeatures.title') }}
    </h4>
    <v-row>
      <v-col v-if="noThisFeature !== '/guide-books/features'">
        <nuxt-link
          to="/guide-books/features"
          class="v-btn v-btn--outlined v-size--x-large v-btn--block"
        >
          {{ $t('components.otherFeatures.links.guide') }}
        </nuxt-link>
      </v-col>
      <v-col v-if="noThisFeature !== '/about/partner-search'">
        <nuxt-link
          to="/about/partner-search"
          class="v-btn v-btn--outlined v-size--x-large v-btn--block"
        >
          {{ $t('components.otherFeatures.links.partner') }}
        </nuxt-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'OtherFeatures',
  props: {
    noThisFeature: {
      type: String,
      required: true
    }
  }
}
</script>
