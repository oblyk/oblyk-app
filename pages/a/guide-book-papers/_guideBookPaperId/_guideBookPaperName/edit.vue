<template>
  <v-container v-if="guideBookPaper">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4 text-truncate">
          {{ $t('actions.edit') }}
          {{ guideBookPaper.name }}
        </h2>
        <guide-book-paper-form
          :guide-book-paper="guideBookPaper"
          submit-methode="put"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GuideBookPaperConcern } from '~/concerns/GuideBookPaperConcern'
import GuideBookPaperForm from '~/components/guideBookPapers/forms/GuideBookPaperForm'

export default {
  components: { GuideBookPaperForm },
  mixins: [GuideBookPaperConcern],
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.generics.edit', { name: (this.guideBookPaper || {}).name })
    }
  }
}
</script>
