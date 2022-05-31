<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.edit') }}
          {{ organization.name }}
        </h2>
        <organization-form :organization="organization" submit-methode="put" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OrganizationForm from '@/components/organizations/forms/OrganizationForm'
import { OrganizationConcern } from '@/concerns/OrganizationConcern'

export default {
  components: { OrganizationForm },
  mixins: [OrganizationConcern],
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.generics.edit', { name: (this.organization || {}).name })
    }
  }
}
</script>
