<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.gymSpace.addNew') }}
        </h2>
        <p class="subtitle-2 mb-8" v-html="$t('components.gymSpace.explain')" />
        <gym-space-form
          :gym-id="$route.params.gymId"
          submit-methode="post"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GymSpaceForm from '@/components/gymSpaces/forms/GymSpaceForm'
export default {
  components: { GymSpaceForm },

  head () {
    return {
      title: this.$t('meta.gym.space.new')
    }
  }
}
</script>
