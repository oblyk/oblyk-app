import { DateHelpers } from '@/mixins/DateHelpers'
import Article from '@/models/Article'
import store from '@/store'

export const ArticleConcern = {
  mixins: [DateHelpers],

  data () {
    return {
      article: null
    }
  },

  computed: {
    articleMetaImage: function () {
      if (this.article) {
        return this.article.coverUrl()
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/img/images/oblyk-og-image.jpg`
      }
    },
    articleMetaUrl: function () {
      if (this.article) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.article.path()}`
      }
    },
    articleMetaPublishTime: function () {
      if (this.article) {
        return this.isoDate(this.article.published_at)
      }
    },
    articleMetaAuthor: function () {
      if (this.article) {
        return this.article.author.name
      }
    }
  },

  metaInfo () {
    return {
      title: (this.article || {}).name,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: (this.article || {}).description
        },
        {
          vmid: 'og-title',
          property: 'og:title',
          content: (this.article || {}).name
        },
        {
          vmid: 'og-type',
          property: 'og:type',
          content: 'article'
        },
        {
          vmid: 'og-description',
          property: 'og:description',
          content: (this.article || {}).description
        },
        {
          vmid: 'og-image',
          property: 'og:image',
          content: this.articleMetaImage
        },
        {
          vmid: 'og-url',
          property: 'og:url',
          content: this.articleMetaUrl
        },
        {
          vmid: 'article-published-time',
          property: 'article:published_time',
          content: this.articleMetaPublishTime
        },
        {
          vmid: 'article-published-author',
          property: 'article:author',
          content: this.articleMetaAuthor
        },
        {
          vmid: 'article-section',
          property: 'article:section',
          content: 'Sport'
        },
        {
          vmid: 'article-tag',
          property: 'article:tag',
          content: 'Climbing'
        }
      ]
    }
  },

  beforeRouteEnter (to, from, next) {
    if (!to.params.articleId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new Article()
        .find(to.params.articleId)
        .then(resp => {
          next(vm => {
            vm.article = resp
          })
        })
        .catch(err => {
          next(vm => vm.$root.$emit('alertFromApiError', err, 'article'))
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.articleId) {
      next()
    } else if (from.params.articleId === to.params.articleId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new Article()
        .find(to.params.articleId)
        .then(resp => {
          this.article = resp
          next()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'article')
          next()
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  }
}
