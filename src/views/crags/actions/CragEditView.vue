<template>
  <div>
    <spinner v-if="loadingCrag" />

    <v-container v-if="!loadingCrag">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('actions.edit') }} {{ crag.name }}
          </h2>
          <crag-form
            submit-methode="put"
            :crag="crag"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import CragForm from '@/components/crags/forms/CragForm'
import { CragConcern } from '@/concerns/CragConcern'
import Spinner from '@/components/layouts/Spiner'

export default {
  name: 'CragEditView',
  components: { Spinner, CragForm },
  mixins: [CragConcern]
}
</script>
