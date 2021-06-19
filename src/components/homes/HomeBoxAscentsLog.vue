<template>
  <v-row>
    <v-col align-self="center" sm="12" md="6" order-md="last">
      <h3 class="loved-by-king">
        {{ $t('home.ascents.title') }}
      </h3>
      <p v-html="$t('home.ascents.body')" />
    </v-col>
    <v-col align-self="center" sm="12" md="6">
      <v-img src="/img/svg/homes/ascents-log.svg" />
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'HomeBoxAscentsLog'
}
</script>
