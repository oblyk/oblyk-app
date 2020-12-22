<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">Ajouter un nouvel espace</h2>
        <p class="subtitle-2">
          Un <cite>"espace"</cite> et une grande zone d'une salle qui peut contenir plusieurs secteurs.
          exemple : "Espace de voie", "Espace de bloc", "Pan", etc.<br>
          À vous de trouver la meilleurs division pour votre salle.
        </p>
        <gym-space-form />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import GymSpaceForm from '@/components/gymSpaces/forms/GymSpaceForm'
export default {
  name: 'GymSpaceNewView',
  components: { GymSpaceForm }
}
</script>
