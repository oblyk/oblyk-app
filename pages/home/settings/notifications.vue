<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.user.notificationSetting') }}
        </h2>
        <newsletter-subscribe-switch-form :user="user" />
        <p class="mt-2">
          <u>
            {{ $t('components.user.emailNotification') }}
          </u>
        </p>
        <email-notification-form :user="user" />

        <div v-if="user.administered_gyms.length > 0">
          <p>
            <u>
              {{ $t('components.user.updateEmailReport') }}
            </u>
          </p>
          <p
            v-if="loadingGymAdministrators"
            class="text--disabled text-center"
          >
            {{ $t('common.loading') }}
          </p>
          <div v-else>
            <div
              v-for="(gymAdministrator, gymAdministratorIndex) in gymAdministrators"
              :key="`gym-index-${gymAdministratorIndex}`"
            >
              <v-checkbox
                v-model="gymAdministrator.email_report"
                :label="gymAdministrator.gym.name"
                hide-details
                :disabled="updateAdministrator.includes(gymAdministrator.id)"
                @change="switchGymAdministrator(gymAdministrator.id)"
              />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NewsletterSubscribeSwitchForm from '~/components/users/forms/NewsletterSubscribeSwitchForm.vue'
import EmailNotificationForm from '~/components/users/forms/EmailNotificationForm.vue'
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
import GymAdministrator from '~/models/GymAdministrator'

export default {
  components: { EmailNotificationForm, NewsletterSubscribeSwitchForm },
  middleware: ['auth'],
  props: {
    user: { type: Object, required: true }
  },

  data () {
    return {
      loadingGymAdministrators: true,
      gymAdministrators: [],
      updateAdministrator: []
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Mes paramètres de notification'
      },
      en: {
        metaTitle: 'My notification parameters'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  mounted () {
    if (this.user.administered_gyms.length > 0) {
      this.getGymAdministrators()
    }
  },

  methods: {
    getGymAdministrators () {
      this.gymAdministrators = []
      this.loadingGymAdministrators = true
      new CurrentUserApi(this.$axios, this.$auth)
        .gymAdministrators()
        .then((resp) => {
          for (const gymAdministrator of resp.data) {
            this.gymAdministrators.push(new GymAdministrator({ attributes: gymAdministrator }))
          }
        })
        .finally(() => {
          this.loadingGymAdministrators = false
        })
    },

    switchGymAdministrator (id) {
      this.updateAdministrator.push(id)
      new CurrentUserApi(this.$axios, this.$auth)
        .switchEmailReport(id)
        .finally(() => {
          const index = this.updateAdministrator.indexOf(id)
          if (index !== -1) {
            this.updateAdministrator.splice(index, 1)
          }
        })
    }
  }
}
</script>
