<template>
  <v-row>
    <v-col align-self="center" cols="md-6">
      <h2 class="loved-by-king">
        {{ $t('home.partner.title') }}
      </h2>
      <p v-html="$t('home.partner.body')" />
      <p class="text-right">
        <v-btn outlined color="primary" to="/about/partner-search">
          {{ $t('home.partner.action') }}
        </v-btn>
      </p>
    </v-col>
    <v-col align-self="center" cols="md-6">
      <v-img src="/img/svg/homes/partner.svg" />
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'HomeBoxPartner'
}
</script>
