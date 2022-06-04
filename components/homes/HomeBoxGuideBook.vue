<template>
  <v-row>
    <v-col align-self="center" cols="12" md="6">
      <h3>
        {{ $t('home.oblykAndGuide.title') }}
      </h3>
      <p v-html="$t('home.oblykAndGuide.body1')" />
      <p v-html="$t('home.oblykAndGuide.body2')" />
      <p class="text-right">
        <v-btn outlined color="primary" to="/guide-books/features">
          {{ $t('home.oblykAndGuide.action') }}
        </v-btn>
      </p>
    </v-col>
    <v-col align-self="center" cols="12" md="6">
      <v-img
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
