<template>
  <div>
    <v-container
      v-if="loadingGlossary"
      style="max-width: 700px;"
    >
      <v-skeleton-loader
        class="mx-auto mb-3"
        type="list-item-three-line"
      />
    </v-container>

    <v-container
      v-else
      style="max-width: 700px;"
    >
      <v-row>
        <v-col>
          <h1>
            {{ $t('components.word.title') }}
          </h1>

          <!-- Search -->
          <word-search-form />

          <!-- add new word -->
          <client-only>
            <div class="text-right">
              <v-btn
                v-if="$auth.loggedIn"
                text
                small
                color="primary"
                to="/words/new"
              >
                {{ $t('components.word.addNew') }}
              </v-btn>
            </div>
          </client-only>

          <!-- Glossary list -->
          <div
            v-for="(word, wordIndex) in glossary"
            :key="`word-index-${wordIndex}`"
          >
            <p
              v-if="wordIndex === 0 || (glossary[wordIndex - 1].name.charAt(0).toUpperCase() !== word.name.charAt(0).toUpperCase())"
            >
              <v-alert
                dense
                text
                class="d-inline-block mb-0 mt-3"
              >
                {{ word.name.charAt(0).toUpperCase() }}
              </v-alert>
            </p>

            <word-card
              :word="word"
              class="mb-4"
            />
          </div>

          <loading-more
            :get-function="getGlossary"
            :loading-more="loadingMoreData"
            :no-more-data="noMoreDataToLoad"
            skeleton-type="list-item-three-line"
          />
        </v-col>
      </v-row>
    </v-container>
    <app-footer v-if="noMoreDataToLoad" />
  </div>
</template>

<script>
import { LoadingMoreHelpers } from '@/mixins/LoadingMoreHelpers'
import WordCard from '@/components/words/WordCard'
import LoadingMore from '@/components/layouts/LoadingMore'
import AppFooter from '@/components/layouts/AppFooter'
import OblykApi from '~/services/oblyk-api/OblykApi'
import WordSearchForm from '~/components/words/forms/WordSearchForm.vue'

export default {
  components: { WordSearchForm, AppFooter, LoadingMore, WordCard },
  mixins: [LoadingMoreHelpers],

  data () {
    return {
      glossary: [],
      loadingGlossary: true,
      searching: false,
      words: []
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "Lexique des terms d'escalade",
        metaDescription: "Le lexique communautaire des termes de l'escalade pour décoder le parler grimpeur·euse"
      },
      en: {
        metaTitle: 'Glossary of climbing terms',
        metaDescription: "The community lexicon of climbing terms to decode the climber's language"
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
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg` }
      ]
    }
  },

  created () {
    this.getGlossary()
  },

  methods: {
    getGlossary () {
      this.moreIsBeingLoaded()
      new OblykApi(this.$axios, this.$auth)
        .get('/public/words', { page: this.page })
        .then((resp) => {
          for (const word of resp.data) {
            this.glossary.push(word)
          }
          this.successLoadingMore(resp)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'word')
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loadingGlossary = false
          this.finallyMoreIsLoaded()
        })
    }
  }
}
</script>
