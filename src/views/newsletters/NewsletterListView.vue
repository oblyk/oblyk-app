<template>
  <div>
    <v-container>
      <v-btn
        to="/newsletters/new"
        color="primary"
      >
        <v-icon left>mdi-email-plus</v-icon>
        {{ $t('actions.writeNewsletter') }}
      </v-btn>

      <spinner v-if="loadingNewsletter" />

      <div v-if="!loadingNewsletter">
        <div
          v-for="(newsletter, index) in newsletters"
          :key="`newsletter-${index}`"
        >
          <v-card
            class="mt-3"
            :to="newsletter.path()"
          >
            <v-card-title>
              {{ newsletter.name }}
            </v-card-title>
            <v-card-subtitle
              v-if="newsletter.sent"
            >
              {{ $t('date.sentAt', { date: humanizeDate(newsletter.sent_at) } ) }}
            </v-card-subtitle>
          </v-card>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { DateHelpers } from '@/mixins/DateHelpers'
import NewsletterApi from '@/services/oblyk-api/NewsletterApi'
import Newsletter from '@/models/Newsletter'
import Spinner from '@/components/layouts/Spiner'

export default {
  name: 'NewsletterListView',
  components: { Spinner },
  mixins: [DateHelpers],

  metaInfo () {
    return {
      title: this.$t('meta.newsletter.list')
    }
  },

  data () {
    return {
      newsletters: [],
      loadingNewsletter: true
    }
  },

  mounted () {
    this.getNewsletters()
  },

  methods: {
    getNewsletters: function () {
      NewsletterApi
        .all()
        .then(resp => {
          for (const newsletter of resp.data) {
            this.newsletters.push(new Newsletter(newsletter))
          }
        })
        .finally(() => {
          this.loadingNewsletter = false
        })
    }
  }
}
</script>
