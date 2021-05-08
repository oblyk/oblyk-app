<template>
  <v-container>
    <guide-list :crag="crag" />
    <div
      v-if="isLoggedIn"
      class="mt-3"
    >
      <add-guide-book-btn :crag="crag" />
    </div>
  </v-container>
</template>

<script>
import AddGuideBookBtn from '@/components/crags/forms/AddGuideBookBtn'

import GuideList from '@/components/crags/GuideList'
import { SessionConcern } from '@/concerns/SessionConcern'
export default {
  name: 'CragGuideBooksView',
  components: { GuideList, AddGuideBookBtn },
  mixins: [SessionConcern],
  props: {
    crag: Object
  },

  data () {
    return {
      cragGuidesMetaTitle: `${this.$t('meta.generics.guideBooks')} ${this.$t('meta.crag.title', {
        name: (this.crag || {}).name,
        region: (this.crag || {}).region
      })}`,
      cragGuidesMetaDescription: `${this.$t('meta.generics.guideBooks')} ${this.$t('meta.crag.description', {
        name: (this.crag || {}).name,
        region: (this.crag || {}).region,
        city: (this.crag || {}).city
      })}`
    }
  },

  metaInfo () {
    return {
      titleTemplate: this.cragGuidesMetaTitle,
      meta: [
        {
          vmid: 'og-title',
          property: 'og:title',
          content: this.cragGuidesMetaTitle
        },
        {
          vmid: 'description',
          name: 'description',
          content: this.cragGuidesMetaDescription
        },
        {
          vmid: 'og-description',
          property: 'og:description',
          content: this.cragGuidesMetaDescription
        },
        {
          vmid: 'og-url',
          property: 'og:url',
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.crag.path('guide-books')}`
        }
      ]
    }
  }
}
</script>
