<template>
  <div v-if="organization">
    <router-view :organization="organization" />
    <app-footer />
  </div>
</template>
<script>
import { OrganizationConcern } from '@/concerns/OrganizationConcern'
const AppFooter = () => import('@/components/layouts/AppFooter')

export default {
  name: 'OrganizationView',
  components: { AppFooter },
  mixins: [OrganizationConcern]
}
</script>
