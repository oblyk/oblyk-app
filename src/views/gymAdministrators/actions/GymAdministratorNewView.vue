<template>
  <v-container>
    <spinner v-if="loadingGym"/>

    <v-row v-if="!loadingGym" justify="center">
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
import GymAdministratorForm from '@/components/gymAdministrators/forms/gymAdministratorForm'
import { GymConcern } from '@/concerns/GymConcern'
import Spinner from '@/components/layouts/Spiner'

export default {
  name: 'GymAdministratorNewView',
  components: { Spinner, GymAdministratorForm },
  mixins: [GymConcern]
}
</script>
