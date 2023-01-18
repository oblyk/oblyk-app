<template>
  <v-row>
    <v-col>
      <link-list :linkable-id="guideBookPaper.id" linkable-type="GuideBookPaper" />
    </v-col>
  </v-row>
</template>

<script>
import LinkList from '@/components/links/LinkList'

export default {
  name: 'GuideBookPaperLinkView',
  components: { LinkList },
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      guideBookPaperMetaTitle: this.$t('metaTitle', {
        name: this.guideBookPaper?.name
      }),
      guideBookPaperMetaDescription: this.$t('metaDescription', {
        name: this.guideBookPaper?.name
      })
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "Les liens de %{name}, topo d'escalade",
        metaDescription: "Voir les liens du topo d'escalade %{name}."
      },
      en: {
        metaTitle: 'Links of %{name}, climbing guide book',
        metaDescription: 'See the links of %{name} climbing guide book'
      }
    }
  },

  head () {
    return {
      title: this.guideBookPaperMetaTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.guideBookPaperMetaDescription
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.guideBookPaperMetaTitle
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.guideBookPaperMetaDescription
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.guideBookPaper.path}/links`
        }
      ]
    }
  }
}
</script>
