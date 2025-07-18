<template>
  <div>
    <page-header
      :title="$t('components.crag.newCrag')"
      back-to="/outdoor"
    />
    <v-container>
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('components.crag.newCrag') }}
          </h2>
          <crag-form submit-methode="post" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CragForm from '~/components/crags/forms/CragForm'
import PageHeader from '~/components/layouts/PageHeader.vue'

export default {
  meta: { orphanRoute: true },
  components: { PageHeader, CragForm },
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Ajouter une falaise'
      },
      en: {
        metaTitle: 'Create new crag'
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
