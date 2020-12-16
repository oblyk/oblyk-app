<template>
  <v-row>
    <v-col align-self="center" cols="md-6">
      <h2 class="loved-by-king">
        Check les infos des falaises
      </h2>
      <p>
        Oblyk est une grande base de donnée des falaises d'escalade de France et du monde constamment enrichie par
        la communauté, tu peux consulter celle-ci en utilisant la recherche ou en naviguant sur la carte des falaises.
      </p>
      <p class="text-right">
        <v-btn outlined color="primary" :to="{ name: 'CragMapPage' }">
          La carte des falaises
        </v-btn>
      </p>
    </v-col>
    <v-col align-self="center" cols="md-6">
      <v-img :src="require('@/assets/svgs/homes/crags-info.svg')" />
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'HomeBoxCragInfo'
}
</script>
