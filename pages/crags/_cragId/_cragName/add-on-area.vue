<template>
  <div>
    <v-container v-if="crag">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('components.crag.addThisCragInArea') }}
          </h2>
          <add-area-on-crag-form :crag="crag" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { CragConcern } from '~/concerns/CragConcern'
import AddAreaOnCragForm from '~/components/areas/forms/AddAreaOnCragForm'

export default {
  meta: { orphanRoute: true },
  components: { AddAreaOnCragForm },
  mixins: [CragConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Ajouter %{name} à une zone'
      },
      en: {
        metaTitle: 'Add %{name} in area'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle', { name: this.crag?.name })
    }
  }
}
</script>
