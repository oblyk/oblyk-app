<template>
  <v-row>
    <v-col align-self="center" cols="12" md="6">
      <h2 class="text-h5 mb-3 font-weight-bold">
        {{ $t('home.crags.title') }}
      </h2>
      <p v-html="$t('home.crags.body')" />
      <p class="text-right">
        <v-btn
          elevation="0"
          color="primary"
          to="/find/crags"
        >
          {{ $t('home.crags.action') }}
        </v-btn>
      </p>
    </v-col>
    <v-col align-self="center" cols="12" md="6">
      <v-img
        contain
        width="576"
        height="285"
        src="/svg/homes/crags-info.svg"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'HomeBoxCragInfo'
}
</script>
