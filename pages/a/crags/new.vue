<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.crag.newCrag') }}
        </h2>
        <crag-form
          submit-methode="post"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CragForm from '~/components/crags/forms/CragForm'

export default {
  components: { CragForm },
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.crag.new')
    }
  }
}
</script>
