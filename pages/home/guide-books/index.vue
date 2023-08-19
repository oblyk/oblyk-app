<template>
  <div>
    <spinner v-if="!currentUser" />

    <div v-else>
      <spinner v-if="loadingSubscribes" />

      <v-container v-if="!loadingSubscribes">
        <guide-book-store-header
          :figures="figures"
          :current-user="currentUser"
        />
        <v-row class="mt-3">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="filtre"
              :label="$t('components.guideBookPaper.titleFilter')"
              hide-details
              placeholder="céüse, verdons, etc."
              outlined
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-checkbox
              v-model="showMissingInformation"
              class="mt-3"
              :label="$t('components.guideBookPaper.showMissingInformation')"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="(guideBook, index) in filteredGuideBooks"
            :key="`guide-book-${index}`"
            sm="6"
            md="4"
            lg="3"
          >
            <guide-book-paper-cover-card
              :show-missing-information="showMissingInformation"
              :guide-book-paper="guideBook"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { CurrentUserConcern } from '~/concerns/CurrentUserConcern'
import { TextHelpers } from '~/mixins/TextHelpers'
import Spinner from '~/components/layouts/Spiner.vue'
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
import GuideBookPaper from '~/models/GuideBookPaper'
import GuideBookPaperCoverCard from '~/components/guideBookPapers/GuideBookPaperCoverCard.vue'
import GuideBookStoreHeader from '~/components/guideBookPapers/GuideBookStoreHeader.vue'

export default {
  components: { GuideBookStoreHeader, GuideBookPaperCoverCard, Spinner },
  mixins: [CurrentUserConcern, TextHelpers],

  data () {
    return {
      loadingSubscribes: true,
      subscribes: [],
      showMissingInformation: false,
      figures: {},
      filtre: ''
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Topothèque'
      },
      en: {
        metaTitle: 'Library'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  computed: {
    filteredGuideBooks () {
      const guideBooks = []
      for (const subscribe of this.subscribes) {
        const guideBook = this.recordObject(subscribe.followable_object)
        const guideName = this.removeAccented(guideBook.name.toLowerCase())
        const query = this.removeAccented(this.filtre.toLowerCase())
        if (this.filtre === '' || guideName.includes(query)) {
          guideBooks.push(guideBook)
        }
      }
      return guideBooks
    }
  },

  mounted () {
    this.getSubscribes()
    this.getLibraryFigures()
  },

  methods: {
    getSubscribes () {
      this.loadingSubscribes = true
      new CurrentUserApi(this.$axios, this.$auth)
        .library()
        .then((resp) => {
          this.subscribes = resp.data
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'user')
        })
        .finally(() => {
          this.loadingSubscribes = false
        })
    },

    getLibraryFigures () {
      new CurrentUserApi(this.$axios, this.$auth)
        .libraryFigures()
        .then((resp) => {
          this.figures = resp.data
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'user')
        })
    },

    recordObject (data) {
      return new GuideBookPaper({ attributes: data })
    }
  }
}
</script>
