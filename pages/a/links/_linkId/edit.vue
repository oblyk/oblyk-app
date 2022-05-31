<template>
  <v-container>
    <spinner v-if="loadingLink" />

    <v-row v-if="!loadingLink" justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.edit') }} {{ link.name }}
        </h2>
        <link-form
          submit-methode="put"
          :link="link"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LinkForm from '~/components/links/forms/LinkForm'
import { LinkConcern } from '~/concerns/LinkConcern'
import Spinner from '~/components/layouts/Spiner'

export default {
  components: { Spinner, LinkForm },
  mixins: [LinkConcern],
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.generics.edit', { name: (this.link || {}).name })
    }
  }
}
</script>
