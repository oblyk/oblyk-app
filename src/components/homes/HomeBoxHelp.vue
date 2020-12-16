<template>
  <v-row>
    <v-col align-self="center" cols="md-6" order-md="last">
      <h2 class="loved-by-king">
        Nous soutenir
      </h2>
      <p>
        Sur Oblyk il n'y a aucune limitation, pas de compte premium, ni pub, ni lien ou article sponsorisé, tous est gratuit ! ; )
      </p>
      <p>
        Si tout est gratuit et qu'Oblyk ne perçoit aucun revenu, cela veut-il dire qu'Oblyk ne coûte rien à développer ?
      </p>
      <p>
        Malheureusement non, comme tout site internet, Oblyk doit être hébergé dans un datacenter et louer un nom de domaine pour pouvoir éxister sur la toile.
      </p>
      <p>
        Et ça par contre, ce n'est pas gratuit ...
      </p>
    </v-col>
    <v-col align-self="center" cols="md-6">
      <v-img :src="require('@/assets/svgs/homes/help.svg')" />
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'HomeBoxHelp'
}
</script>
