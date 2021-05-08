<template>
  <v-row>
    <v-col align-self="center" cols="md-6">
      <h3 class="loved-by-king">
        {{ $t('home.crags.title') }}
      </h3>
      <p v-html="$t('home.crags.body')" />
      <p class="text-right">
        <v-btn outlined color="primary" to="/maps/crags">
          {{ $t('home.crags.action') }}
        </v-btn>
      </p>
    </v-col>
    <v-col align-self="center" cols="md-6">
      <v-img src="/img/svg/homes/crags-info.svg" />
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'HomeBoxCragInfo'
}
</script>
