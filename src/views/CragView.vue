<template>
  <div v-if="crag">
    <crag-head :crag="crag" />
    <crag-tabs :crag="crag" />
    <router-view :crag="crag" />
  </div>
</template>
<script>
import { CragConcern } from '@/concerns/CragConcern'
import CragHead from '@/components/crags/layouts/CragHead'
import CragTabs from '@/components/crags/layouts/CragTabs'

export default {
  name: 'CragView',
  components: { CragTabs, CragHead },
  mixins: [CragConcern]
}
</script>
