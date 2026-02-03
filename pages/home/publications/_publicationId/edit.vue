<template>
  <v-container>
    <h3 class="mb-4">
      <v-icon color="primary" left>
        {{ mdiPen }}
      </v-icon>
      {{ $t('components.publication.shareSomething') }}
    </h3>
    <v-skeleton-loader
      v-if="!currentUser"
      type="article"
    />
    <div v-else>
      <v-skeleton-loader
        v-if="loadingPublication"
        type="article"
      />

      <publication-form
        v-if="publication"
        publishable-type="User"
        :publishable="currentUser"
        :publication="publication"
      />
    </div>
  </v-container>
</template>

<script>
import { mdiPen } from '@mdi/js'
import { CurrentUserConcern } from '~/concerns/CurrentUserConcern'
import PublicationForm from '~/components/publications/forms/PublicationForm'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  components: { PublicationForm },
  mixins: [CurrentUserConcern],
  scrollToTop: true,

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
      publication: null,

      mdiPen
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
