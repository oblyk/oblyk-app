<template>
  <v-container v-if="guideBookWeb">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4 text-truncate">
          {{ $t('actions.edit') }}
          {{ guideBookWeb.name }}
        </h2>
        <guide-book-web-form
          :guide-book-web="guideBookWeb"
          submit-methode="put"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GuideBookWebConcern } from '~/concerns/GuideBookWebConcern'
import GuideBookWebForm from '~/components/guideBookWebs/forms/GuideBookWebForm'

export default {
  components: { GuideBookWebForm },
  mixins: [GuideBookWebConcern],
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.guideBookWeb.edit')
    }
  }
}
</script>
