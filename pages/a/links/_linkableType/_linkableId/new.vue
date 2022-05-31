<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.addLink') }}
        </h2>
        <link-form
          submit-methode="post"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LinkForm from '~/components/links/forms/LinkForm'

export default {
  components: { LinkForm },
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.link.new')
    }
  }
}
</script>
