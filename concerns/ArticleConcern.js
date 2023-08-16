import { DateHelpers } from '@/mixins/DateHelpers'
import Article from '@/models/Article'

export const ArticleConcern = {
  mixins: [DateHelpers],

  data () {
    return {
      article: null
    }
  },

  computed: {
    articleMetaImage () {
      if (this.article) {
        return this.article.coverUrl
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg`
      }
    },
    articleMetaUrl () {
      if (this.article) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.article.path}`
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
      title: (this.article || {}).name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: (this.article || {}).description
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: (this.article || {}).name
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: (this.article || {}).description
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
    this.article = await new Article({
      axios: this.$axios,
      auth: this.$auth
    })._find(
      this.$route.params.articleId
    )
  }
}
