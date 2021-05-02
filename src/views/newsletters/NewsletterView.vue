<template>
  <div>
    <v-container v-if="newsletter">

      <!-- Newsletter Contente -->
      <div
        class="newsletter-content-area mt-9"
        v-html="newsletter.body"
      />

      <!-- Newsletter admin card -->
      <v-card
        v-if="isLoggedIn && isSuperAdmin"
        class="mt-16"
      >
        <v-card-title>
          {{ newsletter.name }}
        </v-card-title>
        <v-card-subtitle
          v-if="newsletter.sent"
        >
          {{ $t('date.sentAt', { date: humanizeDate(newsletter.sent_at) } ) }}
        </v-card-subtitle>

        <v-card-actions>
          <!-- Edit -->
          <v-btn
            :to="newsletter.path('edit')"
            text
          >
            <v-icon left>mdi-email-edit</v-icon>
            {{ $t('actions.edit')}}
          </v-btn>

          <!-- Photos -->
          <v-btn
            :to="newsletter.path('photos')"
            text
          >
            <v-icon left>mdi-image-multiple</v-icon>
            {{ $t('components.photo.photos')}}
          </v-btn>

          <!-- Delete -->
          <v-btn
            text
            :loading="deletingNewsletter"
            @click="deleteNewsletter()"
          >
            <v-icon left>mdi-delete</v-icon>
            {{ $t('actions.delete')}}
          </v-btn>

          <!-- Send -->
          <v-btn
            v-if="!newsletter.sent"
            text
            color="success"
            :loading="sendingNewsletter"
            @click="sendNewsletter()"
          >
            <v-icon left>mdi-send</v-icon>
            {{ $t('actions.send')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { DateHelpers } from '@/mixins/DateHelpers'
import { NewsletterConcern } from '@/concerns/NewsletterConcern'
import { SessionConcern } from '@/concerns/SessionConcern'
import NewsletterApi from '@/services/oblyk-api/NewsletterApi'
import AppFooter from '@/components/layouts/AppFooter'

export default {
  name: 'NewsletterView',
  components: { AppFooter },
  mixins: [
    DateHelpers,
    NewsletterConcern,
    SessionConcern
  ],

  data () {
    return {
      deletingNewsletter: false,
      sendingNewsletter: false
    }
  },

  methods: {
    deleteNewsletter: function () {
      const IamSur = confirm(this.$t('actions.areYouSur'))
      if (IamSur) {
        this.deletingNewsletter = true
        NewsletterApi
          .delete(this.newsletter.id)
          .then(() => {
            this.$router.push('/newsletters')
          })
          .finally(() => {
            this.deletingNewsletter = false
          })
      }
    },

    sendNewsletter: function () {
      const IamSur = confirm(this.$t('actions.areYouSur'))
      if (IamSur) {
        this.sendingNewsletter = true
        NewsletterApi
          .sendNewsletter(this.newsletter.id)
          .then(() => {
            this.$router.go(0)
          })
          .finally(() => {
            this.sendingNewsletter = false
          })
      }
    }
  }
}
</script>
<style lang="scss">
.newsletter-content-area {
  h1 {
    margin-bottom: 1em;
  }
}
</style>
