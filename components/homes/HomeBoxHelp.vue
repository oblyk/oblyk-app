<template>
  <v-row>
    <v-col align-self="center" cols="12" md="6" order-md="last">
      <h3>
        {{ $t('home.supportUs.title') }}
      </h3>
      <p v-html="$t('home.supportUs.body1')" />
      <p v-html="$t('home.supportUs.body2')" />
      <p v-html="$t('home.supportUs.body3')" />
      <p class="text-right">
        <v-btn outlined color="primary" to="/support-us">
          {{ $t('home.supportUs.action') }}
        </v-btn>
      </p>
    </v-col>
    <v-col align-self="center" cols="12" md="6">
      <v-img
        width="576"
        height="254"
        src="/svg/homes/help.svg"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'HomeBoxHelp'
}
</script>
