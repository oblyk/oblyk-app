<template>
  <v-container>
    <v-skeleton-loader
      v-if="!guideBookPaper"
      type="article"
    />
    <div v-else>
      <v-skeleton-loader
        v-if="loadingPublication"
        type="article"
      />

      <publication-form
        v-if="publication"
        publishable-type="GuideBookPaper"
        :publishable="guideBookPaper"
        :publication="publication"
      />
    </div>
  </v-container>
</template>

<script>
import PublicationForm from '~/components/publications/forms/PublicationForm'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  components: { PublicationForm },
  middleware: ['auth'],
  scrollToTop: true,

  props: {
    guideBookPaper: {
      type: Object,
      required: true
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Éditer la publication'
      },
      en: {
        metaTitle: 'Edit publication'
      }
    }
  },

  data () {
    return {
      loadingPublication: false,
      publication: null
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  mounted () {
    this.getPublication()
  },

  methods: {
    getPublication () {
      this.loadingPublication = true
      new OblykApi(this.$axios, this.$auth)
        .get(`/publications/${this.$route.params.publicationId}`)
        .then((resp) => {
          this.publication = resp.data
        })
        .finally(() => {
          this.loadingPublication = false
        })
    }
  }
}
</script>
