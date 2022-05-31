<template>
  <v-container v-if="gym">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.addMember') }}
        </h2>

        <gym-administrator-form
          :gym="gym"
          submit-methode="post"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GymConcern } from '~/concerns/GymConcern'
import GymAdministratorForm from '~/components/gymAdministrators/forms/gymAdministratorForm'

export default {
  components: { GymAdministratorForm },
  mixins: [GymConcern],
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.gym.administrators')
    }
  }
}
</script>
