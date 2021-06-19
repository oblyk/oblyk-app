<template>
  <v-row>
    <v-col align-self="center" sm="12" md="6">
      <h3 class="loved-by-king">
        {{ $t('home.oblykAndGuide.title') }}
      </h3>
      <p v-html="$t('home.oblykAndGuide.body1')" />
      <p v-html="$t('home.oblykAndGuide.body2')" />
    </v-col>
    <v-col align-self="center" sm="12" md="6">
      <v-img src="/img/svg/homes/guide-book.svg" />
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'HomeBoxGuideBook'
}
</script>
