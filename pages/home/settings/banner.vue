<template>
  <div>
    <page-header
      :title="$t('actions.changeBanner')"
      back-to="/home/settings"
    />

    <v-container class="pt-6">
      <user-image-form
        v-if="currentUser"
        :user="currentUser"
        upload-type="banner"
      />
      <v-skeleton-loader
        v-else
        type="article"
      />
    </v-container>
  </div>
</template>

<script>
import { CurrentUserConcern } from '~/concerns/CurrentUserConcern'
import UserImageForm from '~/components/users/forms/UserImageForm'
import PageHeader from '~/components/layouts/PageHeader'

export default {
  components: { PageHeader, UserImageForm },
  mixins: [CurrentUserConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Changer mon bandeau'
      },
      en: {
        metaTitle: 'Change my banner'
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
