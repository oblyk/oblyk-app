<template>
  <v-container v-if="cragRoute && crag">
    <v-row justify="center">
      <v-col class="crag-route-form">
        <h2 class="mb-4">
          {{ $t('actions.edit') }}
          {{ cragRoute.name }}
        </h2>
        <crag-route-form
          :crag-route="cragRoute"
          :crag="crag"
          submit-methode="put"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { CragRouteConcern } from '@/concerns/CragRouteConcern'
import { CragConcern } from '@/concerns/CragConcern'
import CragRouteForm from '@/components/cragRoutes/forms/CragRouteForm'

export default {
  name: 'CragRouteEditView',
  mixins: [CragRouteConcern, CragConcern],
  components: { CragRouteForm }
}
</script>

<style lang="scss" scoped>
.crag-route-form {
  max-width: 750px;
}
</style>
