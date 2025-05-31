<template>
  <div>
    <page-header
      :title="$t('components.user.notificationSetting')"
      back-to="/home/settings"
    />

    <div class="d-flex justify-center pb-10">
      <div class="global-form-width">
        <div
          v-if="currentUser"
          class="px-3"
        >
          <newsletter-subscribe-switch-form :user="currentUser" />
          <p class="mt-2">
            <u>
              {{ $t('components.user.emailNotification') }}
            </u>
          </p>
          <email-notification-form :user="currentUser" />

          <gym-emailing-report-form
            v-if="currentUser.administered_gyms.length > 0"
            :user="currentUser"
          />
        </div>
        <v-skeleton-loader
          v-else
          type="article"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { CurrentUserConcern } from '~/concerns/CurrentUserConcern'
import NewsletterSubscribeSwitchForm from '~/components/users/forms/NewsletterSubscribeSwitchForm'
import EmailNotificationForm from '~/components/users/forms/EmailNotificationForm'
import GymEmailingReportForm from '~/components/users/forms/GymEmailingReportForm'
import PageHeader from '~/components/layouts/PageHeader'

export default {
  components: { PageHeader, GymEmailingReportForm, EmailNotificationForm, NewsletterSubscribeSwitchForm },
  mixins: [CurrentUserConcern],
  middleware: ['auth'],

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
  }
}
</script>
