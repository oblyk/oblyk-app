<template>
  <v-container>
    <v-row>
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
    guideBookPaper: Object
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

  metaInfo () {
    return {
      title: this.guideBookPaperMetaTitle,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: this.guideBookPaperMetaDescription
        },
        {
          vmid: 'og-title',
          property: 'og:title',
          content: this.guideBookPaperMetaTitle
        },
        {
          vmid: 'og-description',
          property: 'og:description',
          content: this.guideBookPaperMetaDescription
        },
        {
          vmid: 'og-url',
          property: 'og:url',
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.guideBookPaper.path('crags')}`
        }
      ]
    }
  },

  beforeRouteEnter (to, from, next) {
    GuideBookPaperApi
      .crags(to.params.guideBookPaperId)
      .then(resp => {
        const crags = []
        for (const crag of resp.data) {
          crags.push(new Crag(crag))
        }
        next(vm => {
          vm.crags = crags
        })
      })
      .catch(err => {
        next(vm => vm.$root.$emit('alertFromApiError', err, 'guideBookPaper'))
      })
  },

  beforeRouteUpdate (to, from, next) {
    GuideBookPaperApi
      .crags(this.guideBookPaper.id)
      .then(resp => {
        for (const crag of resp.data) {
          this.crags.push(new Crag(crag))
        }
        next()
      })
      .catch(err => {
        this.$root.$emit('alertFromApiError', err, 'guideBookPaper')
        next()
      })
  }
}
</script>
