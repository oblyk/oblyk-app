<template>
  <v-container v-if="guideBookPaper">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h1 class="mb-4">
          {{ $t('components.guideBookPaper.addCragInGuide') }}
        </h1>

        <add-crag-in-guide-book-form
          :guide-book-paper="guideBookPaper"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GuideBookPaperConcern } from '~/concerns/GuideBookPaperConcern'
import AddCragInGuideBookForm from '~/components/guideBookPaperCrags/forms/AddCragInGuideBookForm'

export default {
  meta: { orphanRoute: true },
  components: { AddCragInGuideBookForm },
  mixins: [GuideBookPaperConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Ajouter un site à %{name}'
      },
      en: {
        metaTitle: 'Add crag in %{name}'
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
