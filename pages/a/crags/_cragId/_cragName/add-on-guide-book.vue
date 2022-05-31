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
  components: { AddGuideBookOnCragForm },
  mixins: [CragConcern],
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.crag.addGuideBook', { name: (this.crag || {}).name })
    }
  }
}
</script>
