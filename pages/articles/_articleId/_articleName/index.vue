<template>
  <div v-if="$fetchState.pending">
    <v-skeleton-loader type="image, image" boilerplate />
    <v-container class="article-container">
      <v-skeleton-loader type="heading" class="mt-4 mb-10" />
      <v-skeleton-loader type="paragraph" />
      <v-skeleton-loader type="paragraph" class="mt-4" />
      <div class="text-right mt-10">
        <v-skeleton-loader type="text" width="80" class="d-inline-block" /><br>
        <v-skeleton-loader type="text" width="70" class="d-inline-block" /><br>
        <v-skeleton-loader type="text" width="100" class="d-inline-block" />
      </div>
    </v-container>
  </div>
  <div v-else>
    <article-head :article="article" />
    <v-container class="article-container">
      <section
        class="article-body mb-10 mt-4"
        v-html="article.body"
      />

      <!-- Footer, Crags, Guide book & About author -->
      <article-footer :article="article" />
      <article-crags :article="article" />
      <article-guide-book-papers :article="article" />
      <about-author-card :article="article" class="mt-5 mb-5" />

      <!-- Comments -->
      <h2>
        <v-icon left>
          {{ mdiForum }}
        </v-icon>
        {{ $t('components.comment.comments') }}
      </h2>
      <comment-list commentable-type="Article" :commentable-id="article.id" />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { mdiForum } from '@mdi/js'
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

  data () {
    return {
      mdiForum
    }
  },

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
  background: #fff;
  padding: 16px 45px;
  margin-top: -17px;
  position: relative;
  border-radius: 6px;
  box-shadow: 0 8px 15px -8px rgba(0, 0, 0, 0.15);
  .article-body {
    font-size: 1em;
    border-bottom: 2px dashed #f1f1f1;
    padding-bottom: 10px;
    margin-bottom: 30px !important;
    p {
      hyphens: auto;
      text-align: justify;
    }
    img {
      max-width: 100%;
      border-radius: 10px;
      -webkit-filter: drop-shadow(0 5px 11px rgba(0,0,0,0.02));
      filter: drop-shadow(0 5px 11px rgba(0,0,0,0.02));
    }
    p + img {
      margin-top: 15px;
    }
    h2 {
      font-size: 1.25em;
      margin-top: 50px;
      margin-bottom: 5px;
    }
    h4 {
      margin-top: 25px;
      margin-bottom: 10px;
    }
    h6 {
      line-height: 1.3;
    }
  }
}
@media screen and (max-width: 569px) {
  .article-header-title h1 {
    font-size: 2.3rem !important;
  }
  .article-container {
    border-radius: 0;
    box-shadow: none;
    padding: 8px 24px;
    .article-body {
      font-size: 0.95em;
    }
  }
}

@media screen and (max-width: 767px) {
  .article-header-title h1 {
    font-size: 2.5rem;
    line-height: 1.1;
    margin-bottom: 11px;
  }
}
</style>
