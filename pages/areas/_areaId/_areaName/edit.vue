<template>
  <div>
    <page-header
      :title="area?.name || '...'"
      :back-to="area?.path"
    />
    <v-container v-if="area">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('actions.edit') }}
            {{ area.name }}
          </h2>
          <area-form
            :area="area"
            submit-methode="put"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { AreaConcern } from '~/concerns/AreaConcern'
import AreaForm from '~/components/areas/forms/AreaForm'
import PageHeader from '~/components/layouts/PageHeader'

export default {
  meta: { orphanRoute: true },
  components: { PageHeader, AreaForm },
  mixins: [AreaConcern],

  head () {
    return {
      title: this.$t('actions.editName', { name: this.area?.name })
    }
  }
}
</script>
