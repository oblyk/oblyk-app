<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.addAlert') }}
        </h2>
        <alert-form
          submit-methode="post"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AlertForm from '~/components/alerts/forms/AlertForm'

export default {
  components: { AlertForm },
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.alert.new')
    }
  }
}
</script>
