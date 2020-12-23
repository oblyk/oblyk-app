<template>
  <div>
    <spinner v-if="loadingGymSpace"/>

    <v-container v-if="!loadingGymSpace">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('actions.edit')}}
            "{{ gymSpace.name }}"
          </h2>
          <gym-space-form
            :gym-space="gymSpace"
            :gym-id="$route.params.gymId"
            submit-methode="put"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import GymSpaceForm from '@/components/gymSpaces/forms/GymSpaceForm'
import { GymSpaceConcern } from '@/concerns/GymSpaceConcern'
import Spinner from '@/components/layouts/Spiner'
export default {
  name: 'GymSpaceEditView',
  mixins: [GymSpaceConcern],
  components: { Spinner, GymSpaceForm }
}
</script>
