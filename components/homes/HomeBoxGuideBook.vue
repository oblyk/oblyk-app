<template>
  <v-row>
    <v-col align-self="center" cols="12" md="6" order-md="last">
      <h2 class="text-h5 mb-3 font-weight-bold">
        {{ $t('home.oblykAndGuide.title') }}
      </h2>
      <p v-html="$t('home.oblykAndGuide.body1')" />
      <p v-html="$t('home.oblykAndGuide.body2')" />
      <p class="text-right">
        <v-btn
          elevation="0"
          color="primary"
          to="/guide-books/features"
        >
          {{ $t('home.oblykAndGuide.action') }}
        </v-btn>
      </p>
    </v-col>
    <v-col align-self="center" cols="12" md="6">
      <v-img
        contain
        width="576"
        height="244"
        src="/svg/homes/guide-book.svg"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'HomeBoxGuideBook'
}
</script>
