<template>
  <v-container v-if="crag && park">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.edit') }}
        </h2>
        <park-form
          :crag="crag"
          :park="park"
          submit-methode="put"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { CragConcern } from '@/concerns/CragConcern'
import { ParkConcern } from '@/concerns/ParkConcern'
import ParkForm from '@/components/parks/forms/ParkForm'

export default {
  name: 'ParkEditView',
  components: { ParkForm },
  mixins: [CragConcern, ParkConcern]
}
</script>
