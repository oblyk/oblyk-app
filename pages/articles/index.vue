<template>
  <div>
    <v-container class="article-feed-container">
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
      <feed feed-api="Article" />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { mdiFountainPenTip } from '@mdi/js'
import Feed from '@/components/feeds/Feed'
import AppFooter from '@/components/layouts/AppFooter'

export default {
  components: { AppFooter, Feed },

  data () {
    return {
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

<style lang="scss" scoped>
.article-feed-container {
  max-width: 900px;
  min-height: calc(100vh - 420px);
}
</style>
