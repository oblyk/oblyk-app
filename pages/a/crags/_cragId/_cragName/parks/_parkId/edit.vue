<template>
  <v-container v-if="park">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.edit') }}
        </h2>
        <park-form
          :crag="park.crag"
          :park="park"
          submit-methode="put"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ParkConcern } from '~/concerns/ParkConcern'
import ParkForm from '~/components/parks/forms/ParkForm'

export default {
  components: { ParkForm },
  mixins: [ParkConcern],
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.park.edit')
    }
  }
}
</script>
