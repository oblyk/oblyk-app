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
import { SessionConcern } from '~/concerns/SessionConcern'
import { GuideBookPaperConcern } from '~/concerns/GuideBookPaperConcern'
import GuideBookPaperCoverForm from '~/components/guideBookPapers/forms/GuideBookPaperCoverForm'

export default {
  components: { GuideBookPaperCoverForm },
  mixins: [GuideBookPaperConcern, SessionConcern],
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.guideBookPaper.cover', { name: (this.guideBookPaper || {}).name })
    }
  }
}
</script>
