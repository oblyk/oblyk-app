<template>
  <div>
    <guide-list :crag="crag" />
    <client-only>
      <div
        v-if="$auth.loggedIn"
        class="mt-3"
      >
        <add-guide-book-btn :crag="crag" />
      </div>
    </client-only>
  </div>
</template>

<script>
import AddGuideBookBtn from '@/components/crags/forms/AddGuideBookBtn'
import GuideList from '@/components/crags/GuideList'

export default {
  name: 'CragGuideBooksView',
  components: { GuideList, AddGuideBookBtn },
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      cragGuidesMetaTitle: this.$t('metaTitle', {
        name: (this.crag || {}).name,
        region: (this.crag || {}).region
      }),
      cragGuidesMetaDescription: this.$t('metaDescription', {
        name: (this.crag || {}).name,
        region: (this.crag || {}).region,
        city: (this.crag || {}).city
      })
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Les topos de %{name}, escalade en %{region}',
        metaDescription: "Les topos de %{name} : site d'escalade à %{city} en %{region}"
      },
      en: {
        metaTitle: 'Climbing guide book of %{name}, climb in %{region}',
        metaDescription: 'Climbing guide book of %{name} : climbing crag in %{city} in %{region}'
      }
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
