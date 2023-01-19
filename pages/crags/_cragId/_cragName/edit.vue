<template>
  <div>
    <v-container v-if="crag">
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
import CragForm from '~/components/crags/forms/CragForm'
import { CragConcern } from '~/concerns/CragConcern'

export default {
  meta: { orphanRoute: true },
  components: { CragForm },
  mixins: [CragConcern],
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('actions.editName', { name: this.crag?.name })
    }
  }
}
</script>
