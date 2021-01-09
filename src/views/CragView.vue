<template>
  <div>
    <div v-if="!loadingCrag">
      <crag-head :crag="crag" />
      <crag-tabs :crag="crag" />
      <router-view></router-view>
    </div>
    <spinner v-if="loadingCrag" />
  </div>
</template>
<script>
import { CragConcern } from '@/concerns/CragConcern'
import CragHead from '@/components/crags/layouts/CragHead'
import Spinner from '@/components/layouts/Spiner'
import CragTabs from '@/components/crags/layouts/CragTabs'

export default {
  name: 'CragView',
  components: { CragTabs, Spinner, CragHead },
  mixins: [CragConcern],
  watch: {
    '$route.params.cragId': 'getCrag'
  }
}
</script>
