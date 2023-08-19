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
        v-if="$auth.loggedIn && $auth.user.super_admin"
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
            :to="`${newsletter.path}/edit`"
            text
          >
            <v-icon left>
              {{ mdiEmailEdit }}
            </v-icon>
            {{ $t('actions.edit') }}
          </v-btn>

          <!-- Photos -->
          <v-btn
            :to="`${newsletter.path}/photos`"
            text
          >
            <v-icon left>
              {{ mdiImageMultiple }}
            </v-icon>
            {{ $t('components.photo.photos') }}
          </v-btn>

          <!-- Delete -->
          <v-btn
            text
            :loading="deletingNewsletter"
            @click="deleteNewsletter()"
          >
            <v-icon left>
              {{ mdiDelete }}
            </v-icon>
            {{ $t('actions.delete') }}
          </v-btn>

          <!-- Send -->
          <v-btn
            v-if="!newsletter.sent"
            text
            color="success"
            :loading="sendingNewsletter"
            @click="sendNewsletter()"
          >
            <v-icon left>
              {{ mdiSend }}
            </v-icon>
            {{ $t('actions.send') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { mdiEmailEdit, mdiImageMultiple, mdiDelete, mdiSend } from '@mdi/js'
import { DateHelpers } from '@/mixins/DateHelpers'
import { NewsletterConcern } from '@/concerns/NewsletterConcern'
import NewsletterApi from '@/services/oblyk-api/NewsletterApi'
import AppFooter from '@/components/layouts/AppFooter'

export default {
  components: { AppFooter },
  mixins: [
    DateHelpers,
    NewsletterConcern
  ],

  data () {
    return {
      mdiEmailEdit,
      mdiImageMultiple,
      mdiDelete,
      mdiSend,
      deletingNewsletter: false,
      sendingNewsletter: false
    }
  },

  i18n: {
    messages: {
      fr: {
        metaDescription: 'Consulté ici la newsletter que vous avez reçu dans votre boîte email'
      },
      en: {
        metaDescription: 'Consulted here the newsletter you received in your email box'
      }
    }
  },

  head () {
    return {
      title: this.newsletter?.name,
      meta: [
        { hid: 'description', name: 'description', content: this.$t('metaDescription') },
        { hid: 'og:title', property: 'og:title', content: this.newsletter?.name },
        { hid: 'og:description', property: 'og:description', content: this.$t('metaDescription') },
        { hid: 'og:url', property: 'og:url', content: `${process.env.VUE_APP_OBLYK_APP_URL}/${this.newsletter?.path}` }
      ]
    }
  },

  methods: {
    deleteNewsletter () {
      const IamSur = confirm(this.$t('actions.areYouSur'))
      if (IamSur) {
        this.deletingNewsletter = true
        new NewsletterApi(this.$axios, this.$auth)
          .delete(this.newsletter.id)
          .then(() => {
            this.$router.push('/newsletters')
          })
          .finally(() => {
            this.deletingNewsletter = false
          })
      }
    },

    sendNewsletter () {
      const IamSur = confirm(this.$t('actions.areYouSur'))
      if (IamSur) {
        this.sendingNewsletter = true
        new NewsletterApi(this.$axios, this.$auth)
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
