<template>
  <div>
    <v-container v-if="crag">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('components.crag.addThisCragInGuideBook') }}
          </h2>
          <add-guide-book-on-crag-form :crag="crag" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { CragConcern } from '~/concerns/CragConcern'
import AddGuideBookOnCragForm from '~/components/guideBookPaperCrags/forms/AddGuideBookOnCragForm'

export default {
  meta: { orphanRoute: true },
  components: { AddGuideBookOnCragForm },
  mixins: [CragConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Ajouter un topo à %{name}'
      },
      en: {
        metaTitle: 'Add paper guide at %{name}'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle', { name: this.crag?.name })
    }
  }
}
</script>
