<template>
  <v-row>
    <v-col align-self="center" cols="12" md="6" order-md="last">
      <h2 class="text-h5 mb-3 font-weight-bold">
        {{ $t('home.ascents.title') }}
      </h2>
      <p v-html="$t('home.ascents.body')" />
    </v-col>
    <v-col align-self="center" cols="12" md="6">
      <v-img
        contain
        width="576"
        height="290"
        src="/svg/homes/ascents-log.svg"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'HomeBoxAscentsLog'
}
</script>
