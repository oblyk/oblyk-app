<template>
  <v-row>
    <v-col align-self="center" cols="md-6">
      <h2 class="loved-by-king">
        Trouve un partenaire de grimpe
      </h2>
      <p>
        Tu arrives dans une nouvelle région, tu aimerais trouver quelqu'un avec qui grimper en falaise ou en salle ?
        Regarde du côté de notre carte des grimpeurs, peut-être que tu trouveras quelqu'un avec qui grimper.
      </p>
    </v-col>
    <v-col align-self="center" cols="md-6">
      <v-img :src="require('@/assets/svgs/homes/partner.svg')" />
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'HomeBoxPartner'
}
</script>
