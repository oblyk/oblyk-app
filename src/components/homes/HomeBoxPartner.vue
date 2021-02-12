<template>
  <v-row>
    <v-col align-self="center" cols="md-6">
      <h2 class="loved-by-king">
        {{ $t('home.partner.title') }}
      </h2>
      <p v-html="$t('home.partner.body')" />
    </v-col>
    <v-col align-self="center" cols="md-6">
      <v-img :src="require('@/assets/svgs/homes/partner.svg')" />
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'HomeBoxPartner'
}
</script>
