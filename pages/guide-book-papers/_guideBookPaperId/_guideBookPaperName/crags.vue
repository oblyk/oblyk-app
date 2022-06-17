<template>
  <v-container>
    <div
      v-if="$fetchState.pending"
      class="mt-2"
    >
      <div v-for="index in 3" :key="`crag-skeleton-${index}`">
        <v-skeleton-loader class="mb-3" type="list-item-avatar-two-line" />
      </div>
    </div>
    <v-row v-else>
      <v-col>
        <guide-book-paper-crags
          :guide-book-paper="guideBookPaper"
          :crags="crags"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import GuideBookPaperApi from '@/services/oblyk-api/GuideBookPaperApi'
import Crag from '@/models/Crag'
import GuideBookPaperCrags from '@/components/guideBookPapers/GuideBookPaperCrags'

export default {
  name: 'GuideBookPaperCragsView',
  components: {
    GuideBookPaperCrags
  },
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      crags: [],
      guideBookPaperMetaTitle: `
      ${this.$t('meta.generics.crags')}
      ${this.$t('meta.guideBookPaper.title', {
        name: (this.guideBookPaper || {}).name
      })}`,
      guideBookPaperMetaDescription: `
      ${this.$t('meta.generics.crags')}
      ${this.$t('meta.guideBookPaper.description', {
        name: (this.guideBookPaper || {}).name
      })}`
    }
  },

  async fetch () {
    await new GuideBookPaperApi(
      this.$axios,
      this.$store
    ).crags(
      this.$route.params.guideBookPaperId
    ).then((resp) => {
      for (const crag of resp.data) {
        this.crags.push(new Crag({ attributes: crag }))
      }
    })
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
