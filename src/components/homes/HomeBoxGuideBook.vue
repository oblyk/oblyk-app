<template>
  <v-row>
    <v-col align-self="center" cols="md-6">
      <h2 class="loved-by-king">
        Oblyk et les topos
      </h2>
      <p>
        Vous pourriez vous demander si Oblyk peut remplacer les topos papier et par extension nuire au développement des sites d'escalade ?
        Sachez que nous nous sommes beaucoup posé cette question aussi. Et la réponse est non, Oblyk ne peut pas remplacer un topo !
        Les topos contiennent des informations indispensables que nous ne permettons pas d'ajouter sur oblyk
      </p>
      <p>
        Acheter un topo, c'est soutenir des passionnés qui donnent énormément pour maintenir, développer, nettoyer les sites d'escalade sur lesquels vous allez grimper gratuitement.
      </p>
    </v-col>
    <v-col align-self="center" cols="md-6">
      <v-img :src="require('@/assets/svgs/homes/guide-book.svg')" />
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'HomeBoxGuideBook'
}
</script>
