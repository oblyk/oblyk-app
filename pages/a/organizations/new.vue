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
  components: { OrganizationForm },
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.organization.new')
    }
  }
}
</script>
