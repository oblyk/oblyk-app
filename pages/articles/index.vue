<template>
  <div>
    <v-container style="max-width: 900px; min-height: calc(100vh - 420px);">
      <client-only>
        <div
          v-if="$auth.loggedIn && $auth.user.super_admin"
          class="text-right mt-3"
        >
          <v-btn
            to="/articles/new"
            color="primary"
          >
            <v-icon left>
              {{ mdiFountainPenTip }}
            </v-icon>
            {{ $t('actions.writeAnArticle') }}
          </v-btn>
        </div>
      </client-only>
      <v-skeleton-loader
        v-if="$fetchState.pending"
        type="card-avatar"
      />
      <div v-else>
        <article-card
          v-for="(article, articleIndex) in articles"
          :key="`article-index-${articleIndex}`"
          :article="article"
          class="mb-2"
        />
      </div>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { mdiFountainPenTip } from '@mdi/js'
import OblykApi from '~/services/oblyk-api/OblykApi'
import AppFooter from '@/components/layouts/AppFooter'
import ArticleCard from '~/components/articles/ArticleCard'

export default {
  components: { ArticleCard, AppFooter },

  data () {
    return {
      articles: [],

      mdiFountainPenTip
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "Les actualités d'Oblyk",
        metaDescription: "Voir toutes les actualités d'Oblyk, la communauté de grimpeur"
      },
      en: {
        metaTitle: 'Oblyk news',
        metaDescription: 'View all Oblyk news, the climbing community'
      }
    }
  },

  async fetch () {
    await new OblykApi(this.$axios, this.$auth)
      .get('/articles')
      .then((resp) => {
        this.articles = resp.data
      })
  },

  head () {
    return {
      title: this.$t('metaTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('metaDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('metaTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('metaDescription') },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/img/images/oblyk-og-image.jpg` }
      ]
    }
  }
}
</script>
