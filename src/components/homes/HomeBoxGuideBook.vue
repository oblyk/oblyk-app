<template>
  <v-row>
    <v-col align-self="center" cols="md-6">
      <h2 class="loved-by-king">
        {{ $t('home.oblykAndGuide.title') }}
      </h2>
      <p v-html="$t('home.oblykAndGuide.body1')" />
      <p v-html="$t('home.oblykAndGuide.body2')" />
    </v-col>
    <v-col align-self="center" cols="md-6">
      <v-img :src="require('@/assets/svgs/homes/guide-book.svg')" />
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'HomeBoxGuideBook'
}
</script>
