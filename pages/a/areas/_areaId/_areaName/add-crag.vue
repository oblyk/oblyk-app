<template>
  <v-container v-if="area">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h1 class="mb-4">
          {{ $t('components.area.addCragInArea') }}
        </h1>
        <add-crag-in-area-form
          :area="area"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { AreaConcern } from '@/concerns/AreaConcern'
import AddCragInAreaForm from '@/components/areas/forms/AddCragInAreaForm'

export default {
  components: { AddCragInAreaForm },
  mixins: [AreaConcern],

  head () {
    return {
      title: this.$t('meta.area.addCrag', { name: (this.area || {}).name })
    }
  }
}
</script>
