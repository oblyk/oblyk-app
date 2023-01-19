<template>
  <v-card class="full-height">
    <guide-book-paper-place-of-sale :guide-book-paper="guideBookPaper" />
  </v-card>
</template>

<script>
import GuideBookPaperPlaceOfSale from '@/components/guideBookPapers/GuideBookPaperPlaceOfSales'

export default {
  components: {
    GuideBookPaperPlaceOfSale
  },
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "Les points de vente de %{name}, topo d'escalade",
        metaDescription: "Voir les points de vente du topo d'escalade %{name}."
      },
      en: {
        metaTitle: 'Points of sale of %{name}, climbing guide book',
        metaDescription: 'See the Points of sale of %{name} climbing guide book'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle', { name: this.guideBookPaper.name }),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('metaDescription', { name: this.guideBookPaper.name })
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('metaTitle', { name: this.guideBookPaper.name })
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.$t('metaDescription', { name: this.guideBookPaper.name })
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.guideBookPaper.path}/points-of-sales`
        }
      ]
    }
  }
}
</script>
