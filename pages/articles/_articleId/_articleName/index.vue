<template>
  <div v-if="article">
    <article-head :article="article" />
    <v-container class="article-container">
      <section
        class="article-description mb-8 mt-3"
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
import ArticleHead from '@/components/articles/layouts/ArticleHead'
import ArticleFooter from '@/components/articles/layouts/ArticleFooter'
import CommentList from '@/components/comments/CommentList'
import ArticleApi from '@/services/oblyk-api/ArticleApi'
import AboutAuthorCard from '@/components/authors/AboutAuthorCard'
import ArticleCrags from '@/components/articles/ArticleCrags'
import ArticleGuideBookPapers from '@/components/articles/ArticleGuideBookPapers'
import AppFooter from '@/components/layouts/AppFooter'

export default {
  name: 'ArticleView',
  components: {
    ArticleGuideBookPapers,
    ArticleCrags,
    AboutAuthorCard,
    CommentList,
    ArticleFooter,
    ArticleHead,
    AppFooter
  },
  mixins: [ArticleConcern],

  mounted () {
    this.$store.commit('layout/LAYOUT_PADDING', false)

    setTimeout(() => {
      new ArticleApi(this.$axios, this.$auth).view(this.article.id)
    }, 5000)
  }
}
</script>

<style lang="scss">
.article-container {
  max-width: 900px;
  min-height: calc(100vh - 420px);
  .article-description {
    font-size: 1.20em;
    font-weight: bold;
  }
  .article-body {
    font-size: 1.20em;
    p {
      hyphens: auto;
      text-align: justify;
    }
    img {
      max-width: 100%;
    }
    h2 {
      font-size: 1.6em;
      margin-top: 50px;
      margin-bottom: 5px;
      font-family: "Loved by the King", sans-serif;
    }
  }
}
</style>
