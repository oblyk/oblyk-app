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

      <!-- Footer & About author -->
      <article-footer :article="article" />
      <about-author-card :article="article" class="mt-5 mb-5" />

      <!-- Comments -->
      <p class="font-weight-bold">
        <v-icon left small>
          mdi-forum
        </v-icon>
        {{ $t('components.comment.comments') }}
      </p>
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

export default {
  name: 'ArticleView',
  mixins: [ArticleConcern],
  components: { AboutAuthorCard, CommentList, ArticleFooter, ArticleHead, AppFooter },

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
    h2 {
      margin-top: 25px;
      font-family: "Loved by the King", sans-serif;
    }
  }
}
</style>
