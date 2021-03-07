<template>
  <div>
    <spinner v-if="!alert" />
    <v-container v-if="alert">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('components.alert.editAlert') }}
          </h2>
          <alert-form
            :alert="alert"
            submit-methode="put"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { AlertConcern } from '@/concerns/AlertConcern'
import Spinner from '@/components/layouts/Spiner'
import AlertForm from '@/components/alerts/forms/AlertForm'

export default {
  name: 'AlertEditView',
  mixins: [AlertConcern],
  components: { AlertForm, Spinner }
}
</script>
