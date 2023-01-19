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
  meta: { orphanRoute: true },
  components: { AddCragInAreaForm },
  mixins: [AreaConcern],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Ajouter un site à %{name}'
      },
      en: {
        metaTitle: 'Add crag in %{name}'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle', { name: this.area?.name })
    }
  }
}
</script>
