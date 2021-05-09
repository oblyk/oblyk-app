<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <link-list :linkable-id="guideBookPaper.id" linkable-type="GuideBookPaper" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LinkList from '@/components/links/LinkList'

export default {
  name: 'GuideBookPaperLinkView',
  components: { LinkList },
  props: {
    guideBookPaper: Object
  },

  data () {
    return {
      guideBookPaperMetaTitle: `
      ${this.$t('meta.generics.links')}
      ${this.$t('meta.guideBookPaper.title', {
        name: (this.guideBookPaper || {}).name
      })}`,
      guideBookPaperMetaDescription: `
      ${this.$t('meta.generics.links')}
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
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.guideBookPaper.path('links')}`
        }
      ]
    }
  }
}
</script>
