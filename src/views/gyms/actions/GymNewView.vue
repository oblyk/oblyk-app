<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">Ajouter une nouvelle salle</h2>
        <gym-form method="post" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import GymForm from '@/components/gyms/forms/GymForm'

export default {
  name: 'GymNewView',
  components: { GymForm }
}
</script>
