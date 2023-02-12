<template>
  <v-row>
    <v-col align-self="center" cols="12" md="6">
      <h3 class="text-h5 mb-3 font-weight-bold">
        {{ $t('home.indoor.title') }}
        <v-chip
          dark
          color="blue"
        >
          <v-icon small left>
            {{ mdiFlask }}
          </v-icon>
          Beta
        </v-chip>
      </h3>
      <p v-html="$t('home.indoor.body')" />
      <p v-html="$t('home.indoor.body2')" />
      <p class="text-right">
        <v-btn outlined color="primary" to="/about/indoor">
          {{ $t('home.indoor.action') }}
        </v-btn>
      </p>
    </v-col>
    <v-col align-self="center" cols="12" md="6">
      <v-img
        contain
        width="576"
        height="268"
        src="/svg/homes/indoor-home.svg"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mdiFlask } from '@mdi/js'

export default {
  name: 'HomeBoxIndoor',

  data () {
    return {
      mdiFlask
    }
  }
}
</script>
