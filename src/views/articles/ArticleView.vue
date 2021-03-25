<template>
  <div v-if="article">
    <article-head :article="article" />
    <v-container class="common-page-container article-container">
      <section
        class="article-description mb-3"
        v-html="article.description"
      />
      <section
        class="article-body mb-10"
        v-html="article.body"
      />

      <!-- Footer, Crags, Guide book & About author -->
      <article-footer :article="article" />
      <article-crags :article="article" />
      <article-guide-book-papers :article="article" />
      <about-author-card :article="article" class="mt-5 mb-5" />

      <!-- Comments -->
      <h2 class="loved-by-king">
        <v-icon left>
          mdi-forum
        </v-icon>
        {{ $t('components.comment.comments') }}
      </h2>
      <comment-list commentable-type="Article" :commentable-id="article.id" />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { ArticleConcern } from '@/concerns/ArticleConcern'
import AppFooter from '@/components/layouts/AppFooter'
import ArticleHead from '@/components/articles/layouts/ArticleHead'
import ArticleFooter from '@/components/articles/layouts/ArticleFooter'
import CommentList from '@/components/comments/CommentList'
import ArticleApi from '@/services/oblyk-api/ArticleApi'
import AboutAuthorCard from '@/components/authors/AboutAuthorCard'
import ArticleCrags from '@/components/articles/ArticleCrags'
import ArticleGuideBookPapers from '@/components/articles/ArticleGuideBookPapers'

export default {
  name: 'ArticleView',
  mixins: [ArticleConcern],
  components: { ArticleGuideBookPapers, ArticleCrags, AboutAuthorCard, CommentList, ArticleFooter, ArticleHead, AppFooter },

  mounted () {
    setTimeout(() => {
      ArticleApi.view(this.article.id)
    }, 5000)
  }
}
</script>

<style lang="scss">
.article-container {
  .article-description {
    font-weight: bold;
  }
  .article-body {
    p {
      hyphens: auto;
      text-align: justify;
    }
    img {
      max-width: 100%;
    }
    h2 {
      margin-top: 25px;
      font-family: "Loved by the King", sans-serif;
    }
  }
}
</style>
