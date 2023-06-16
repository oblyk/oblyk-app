<template>
  <div
    v-if="crag"
    class="app-height"
  >
    <client-only>
      <crag-map-edit-form :crag="crag" />
    </client-only>
  </div>
</template>

<script>
import { CragConcern } from '~/concerns/CragConcern'
const CragMapEditForm = () => import('~/components/crags/forms/CragMapEditForm')

export default {
  components: { CragMapEditForm },
  meta: { orphanRoute: true },
  mixins: [CragConcern],
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('actions.editName', { name: this.crag?.name })
    }
  }
}
</script>
