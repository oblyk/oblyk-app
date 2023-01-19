<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.organization.addNew') }}
        </h2>
        <organization-form submit-methode="post" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OrganizationForm from '~/components/organizations/forms/OrganizationForm'

export default {
  meta: { orphanRoute: true },
  components: { OrganizationForm },
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Enregistrer mon organisation'
      },
      en: {
        metaTitle: 'Register my organization'
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
