<template>
  <v-container fluid v-if="organization">
    <v-row>
      <v-col class="pa-2">
        <organization-description :organization="organization" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OrganizationDescription from '@/components/organizations/OrganizationDescription'
export default {
  name: 'OrganizationInfoView',
  components: { OrganizationDescription },
  props: {
    organization: Object
  }
}
</script>
