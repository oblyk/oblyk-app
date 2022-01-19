<template>
  <v-container v-if="crag">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.addPark') }}
        </h2>
        <park-form
          :crag="crag"
          submit-methode="post"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { CragConcern } from '@/concerns/CragConcern'
import ParkForm from '@/components/parks/forms/ParkForm'

export default {
  name: 'ParkNewView',
  components: { ParkForm },
  mixins: [CragConcern],

  head () {
    return {
      title: this.$t('meta.park.new')
    }
  }
}
</script>
