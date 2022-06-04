<template>
  <v-row>
    <v-col align-self="center" cols="12" md="6" order-md="last">
      <h3>
        {{ $t('home.ascents.title') }}
      </h3>
      <p v-html="$t('home.ascents.body')" />
    </v-col>
    <v-col align-self="center" cols="12" md="6">
      <v-img
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
