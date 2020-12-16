<template>
  <v-row>
    <v-col align-self="center" cols="md-6" order-md="last">
      <h2 class="loved-by-king">
        Tiens un carnet de croix
      </h2>
      <p>
        Bon pour la mémoire, la progression et la motivation, tenir un carnet de croix à beaucoup d'avantages.
        Oblyk te permet de le faire facilement, tu pourras ensuite visualiser ta progression grâce à de nombreuses façons d'analyser et d'afficher ton carnet de croix.
      </p>
    </v-col>
    <v-col align-self="center" cols="md-6">
      <v-img :src="require('@/assets/svgs/homes/ascents-log.svg')" />
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'HomeBoxAscentsLog'
}
</script>
