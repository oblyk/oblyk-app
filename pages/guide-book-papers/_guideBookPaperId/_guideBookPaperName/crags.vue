<template>
  <div>
    <div
      v-if="$fetchState.pending"
      class="mt-2"
    >
      <div v-for="index in 3" :key="`crag-skeleton-${index}`">
        <v-skeleton-loader class="mb-3" type="list-item-avatar-two-line" />
      </div>
    </div>
    <guide-book-paper-crags
      v-else
      :crags-data="crags"
      :guide-book-paper="guideBookPaper"
    />
  </div>
</template>
<script>
import GuideBookPaperApi from '@/services/oblyk-api/GuideBookPaperApi'
import GuideBookPaperCrags from '~/components/guideBookPapers/GuideBookPaperCrags'

export default {
  name: 'GuideBookPaperCragsView',
  components: { GuideBookPaperCrags },
  scrollToTop: true,
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      crags: [],
      guideBookPaperMetaTitle: this.$t('metaTitle', {
        name: this.guideBookPaper?.name
      }),
      guideBookPaperMetaDescription: this.$t('metaDescription', {
        name: this.guideBookPaper?.name
      })
    }
  },

  async fetch () {
    await new GuideBookPaperApi(
      this.$axios,
      this.$store
    ).cragsFigures(
      this.$route.params.guideBookPaperId
    ).then((resp) => {
      this.crags = resp.data
    })
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "Les falaises de %{name}, topo d'escalade",
        metaDescription: "Voir les falaises du topo d'escalade %{name}."
      },
      en: {
        metaTitle: 'Crags of %{name}, climbing guide book',
        metaDescription: 'See the crags of %{name} climbing guide book'
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
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.guideBookPaper.path}/crags`
        }
      ]
    }
  }
}
</script>
