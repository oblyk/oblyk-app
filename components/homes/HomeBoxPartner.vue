<template>
  <v-row>
    <v-col align-self="center" cols="12" md="6">
      <h2 class="text-h5 mb-3 font-weight-bold">
        {{ $t('home.partner.title') }}
      </h2>
      <p v-html="$t('home.partner.body')" />
      <p class="text-right">
        <v-btn
          elevation="0"
          color="primary"
          to="/about/partner-search"
        >
          {{ $t('home.partner.action') }}
        </v-btn>
      </p>
    </v-col>
    <v-col align-self="center" cols="12" md="6">
      <v-img
        contain
        width="576"
        height="268"
        src="/svg/homes/partner.svg"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'HomeBoxPartner'
}
</script>
