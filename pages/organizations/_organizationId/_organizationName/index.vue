<template>
  <v-container
    v-if="organization"
    class="mt-lg-4"
  >
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
  components: { OrganizationDescription },
  props: {
    organization: {
      type: Object,
      required: true
    }
  }
}
</script>
