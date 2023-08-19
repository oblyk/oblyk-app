<template>
  <div>
    <v-container>
      <v-btn
        to="/newsletters/new"
        color="primary"
      >
        <v-icon left>
          {{ mdiEmailPlus }}
        </v-icon>
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
            :to="newsletter.path"
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
import { mdiEmailPlus } from '@mdi/js'
import { DateHelpers } from '@/mixins/DateHelpers'
import NewsletterApi from '@/services/oblyk-api/NewsletterApi'
import Newsletter from '@/models/Newsletter'
import Spinner from '@/components/layouts/Spiner'

export default {
  components: { Spinner },
  mixins: [DateHelpers],

  data () {
    return {
      newsletters: [],
      loadingNewsletter: true,

      mdiEmailPlus
    }
  },

  head () {
    return {
      title: 'Newsletters'
    }
  },

  mounted () {
    this.getNewsletters()
  },

  methods: {
    getNewsletters () {
      new NewsletterApi(this.$axios, this.$auth)
        .all()
        .then((resp) => {
          for (const newsletter of resp.data) {
            this.newsletters.push(new Newsletter({ attributes: newsletter }))
          }
        })
        .finally(() => {
          this.loadingNewsletter = false
        })
    }
  }
}
</script>
