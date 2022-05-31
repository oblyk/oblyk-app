<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.area.new') }}
        </h2>
        <area-form
          submit-methode="post"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AreaForm from '@/components/areas/forms/AreaForm'

export default {
  components: { AreaForm },
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.area.new')
    }
  }
}
</script>
