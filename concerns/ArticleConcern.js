import { DateHelpers } from '@/mixins/DateHelpers'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import OblykApi from '~/services/oblyk-api/OblykApi'

export const ArticleConcern = {
  mixins: [DateHelpers, ImageVariantHelpers],

  data () {
    return {
      article: null
    }
  },

  computed: {
    articleMetaImage () {
      if (this.article) {
        return this.imageVariant(this.article.attachments.cover, { fit: 'scale-down', width: 1920, height: 1920 })
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg`
      }
    },
    articleMetaUrl () {
      if (this.article) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.article.app_path}`
      }
    },
    articleMetaPublishTime () {
      if (this.article) {
        return this.isoDate(this.article.published_at)
      }
    },
    articleMetaAuthor () {
      if (this.article) {
        return this.article.author.name
      }
    }
  },

  head () {
    return {
      title: this.article?.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article?.description
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.article?.name
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.article?.description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.articleMetaImage
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.articleMetaUrl
        },
        {
          hid: 'article-published-time',
          property: 'article:published_time',
          content: this.articleMetaPublishTime
        },
        {
          hid: 'article-published-author',
          property: 'article:author',
          content: this.articleMetaAuthor
        },
        {
          hid: 'article-section',
          property: 'article:section',
          content: 'Sport'
        },
        {
          hid: 'article-tag',
          property: 'article:tag',
          content: 'Climbing'
        }
      ],
      link: [
        { rel: 'preload', href: this.articleMetaImage, as: 'image' }
      ]
    }
  },

  async fetch () {
    await new OblykApi(this.$axios, this.$auth)
      .get(`/articles/${this.$route.params.articleId}`)
      .then((resp) => {
        this.article = resp.data
      })
  }
}
