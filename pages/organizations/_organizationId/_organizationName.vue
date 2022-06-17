<template>
  <div v-if="organization">
    <nuxt-child :organization="organization" />
    <app-footer />
  </div>
</template>

<script>
import { OrganizationConcern } from '@/concerns/OrganizationConcern'
import AppFooter from '@/components/layouts/AppFooter'

export default {
  components: { AppFooter },
  mixins: [OrganizationConcern]
}
</script>
