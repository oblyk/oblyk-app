<template>
  <v-row>
    <v-col align-self="center" cols="12" md="6" order-md="last">
      <h3 class="text-h5 mb-3 font-weight-bold">
        {{ $t('home.developer.title') }}
      </h3>
      <p v-html="$t('home.developer.body1')" />
      <p v-html="$t('home.developer.body2')" />
      <p v-html="$t('home.developer.body3')" />
      <p class="text-right">
        <v-btn outlined color="primary" to="/api-and-developers">
          {{ $t('home.developer.action') }}
        </v-btn>
      </p>
    </v-col>
    <v-col align-self="center" cols="12" md="6">
      <v-img
        width="576"
        height="249"
        src="/svg/support-us.svg"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'HomeBoxDeveloper'
}
</script>
