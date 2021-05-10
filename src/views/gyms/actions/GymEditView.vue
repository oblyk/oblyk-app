<template>
  <v-container v-if="gym">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">{{ $t('actions.edit') }} {{ gym.name }}</h2>
        <gym-form :gym="gym" method="put" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { GymConcern } from '@/concerns/GymConcern'
import { SessionConcern } from '@/concerns/SessionConcern'
import { ProtectedGymConcern } from '@/concerns/ProtectedGymConcern'
import GymForm from '@/components/gyms/forms/GymForm'

export default {
  name: 'GymEditView',
  components: { GymForm },
  mixins: [GymConcern, SessionConcern, ProtectedGymConcern],

  metaInfo () {
    return {
      title: this.$t('meta.generics.edit', { name: (this.gym || {}).name })
    }
  }
}
</script>
