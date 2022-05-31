<template>
  <v-container v-if="area">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.edit') }}
          {{ area.name }}
        </h2>
        <area-form
          :area="area"
          submit-methode="put"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { AreaConcern } from '@/concerns/AreaConcern'
import AreaForm from '@/components/areas/forms/AreaForm'

export default {
  components: { AreaForm },
  mixins: [AreaConcern],

  head () {
    return {
      title: this.$t('meta.generics.edit', { name: (this.area || {}).name })
    }
  }
}
</script>
