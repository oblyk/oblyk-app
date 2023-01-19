<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.area.new') }}
        </h2>
        <area-form
          submit-methode="post"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AreaForm from '@/components/areas/forms/AreaForm'

export default {
  meta: { orphanRoute: true },
  components: { AreaForm },
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Créer un groupe de site'
      },
      en: {
        metaTitle: 'Create crags group'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  }
}
</script>
