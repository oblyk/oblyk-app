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
import { SessionConcern } from '@/concerns/SessionConcern'
import AddGuideBookBtn from '@/components/crags/forms/AddGuideBookBtn'
import GuideList from '@/components/crags/GuideList'

export default {
  name: 'CragGuideBooksView',
  components: { GuideList, AddGuideBookBtn },
  mixins: [SessionConcern],
  props: {
    crag: {
      type: Object,
      required: true
    }
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

  head () {
    return {
      titleTemplate: this.cragGuidesMetaTitle,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.cragGuidesMetaTitle
        },
        {
          hid: 'description',
          name: 'description',
          content: this.cragGuidesMetaDescription
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.cragGuidesMetaDescription
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.crag.path}/guide-books`
        }
      ]
    }
  }
}
</script>
