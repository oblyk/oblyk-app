<template>
  <v-container v-if="guideBookPaper">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.changeCover') }}
        </h2>
        <guide-book-paper-cover-form
          :guide-book-paper="guideBookPaper"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GuideBookPaperConcern } from '~/concerns/GuideBookPaperConcern'
import GuideBookPaperCoverForm from '~/components/guideBookPapers/forms/GuideBookPaperCoverForm'

export default {
  meta: { orphanRoute: true },
  components: { GuideBookPaperCoverForm },
  mixins: [GuideBookPaperConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Changer la couverture de %{name}'
      },
      en: {
        metaTitle: 'Change cover of %{name}'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle', { name: this.guideBookPaper?.name })
    }
  }
}
</script>
