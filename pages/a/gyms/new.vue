<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.gym.addNew') }}
        </h2>
        <gym-form submit-methode="post" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GymForm from '~/components/gyms/forms/GymForm'

export default {
  components: { GymForm },
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.gym.new')
    }
  }
}
</script>
