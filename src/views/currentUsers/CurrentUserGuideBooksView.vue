<template>
  <div>
    <spinner v-if="loadingCurrentUser" />

    <div v-if="!loadingCurrentUser">
      <spinner v-if="loadingSubscribes" />

      <v-container v-if="!loadingSubscribes">
        <guide-book-store-header
          :figures="figures"
          :current-user="currentUser"
        />
        <v-row class="mt-3">
          <v-col cols="12" md="6">
            <v-text-field
              :label="$t('components.guideBookPaper.titleFilter')"
              hide-details
              v-model="filtre"
              placeholder="céüse, verdons, etc."
              outlined
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-checkbox
              class="mt-3"
              v-model="showMissingInformation"
              :label="$t('components.guideBookPaper.showMissingInformation')"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="6" md="4" lg="3"
            v-for="(guideBook, index) in filteredGuideBooks"
            :key="`guide-book-${index}`"
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
import { CurrentUserConcern } from '@/concerns/CurrentUserConcern'
import Spinner from '@/components/layouts/Spiner'
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import GuideBookPaper from '@/models/GuideBookPaper'
import GuideBookPaperCoverCard from '@/components/guideBookPapers/GuideBookPaperCoverCard'
import GuideBookStoreHeader from '@/components/guideBookPapers/GuideBookStoreHeader'
import { TextHelpers } from '@/mixins/TextHelpers'

export default {
  name: 'CurrentUserGuideBooksView',
  components: { GuideBookStoreHeader, GuideBookPaperCoverCard, Spinner },
  mixins: [CurrentUserConcern, TextHelpers],

  metaInfo () {
    return {
      title: this.$t('meta.currentUser.guideBook')
    }
  },

  data () {
    return {
      loadingSubscribes: true,
      subscribes: [],
      showMissingInformation: false,
      figures: {},
      filtre: ''
    }
  },

  computed: {
    filteredGuideBooks: function () {
      const guideBooks = []
      for (const subscribe of this.subscribes) {
        const guideBook = this.recordObject(subscribe.followable_object)
        const guideName = this.removeAccented(guideBook.name.toLowerCase())
        const query = this.removeAccented(this.filtre.toLowerCase())
        if (this.filtre === '' || guideName.indexOf(query) !== -1) {
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
    getSubscribes: function () {
      this.loadingSubscribes = true
      CurrentUserApi
        .library()
        .then(resp => {
          this.subscribes = resp.data
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'user')
        })
        .finally(() => {
          this.loadingSubscribes = false
        })
    },

    getLibraryFigures: function () {
      CurrentUserApi
        .libraryFigures()
        .then(resp => {
          this.figures = resp.data
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'user')
        })
    },

    recordObject: function (data) {
      return new GuideBookPaper(data)
    }
  }
}
</script>
