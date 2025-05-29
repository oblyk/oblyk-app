<template>
  <div>
    <setting-back-btn title-key="actions.changeBanner" />

    <div class="d-flex justify-center pb-10">
      <v-col class="global-form-width px-3 full-width">
        <user-image-form
          v-if="currentUser"
          :user="currentUser"
          upload-type="banner"
        />
        <v-skeleton-loader
          v-else
          type="article"
        />
      </v-col>
    </div>
  </div>
</template>

<script>
import { CurrentUserConcern } from '~/concerns/CurrentUserConcern'
import UserImageForm from '~/components/users/forms/UserImageForm'
import SettingBackBtn from '~/components/users/layouts/SettingBackBtn'

export default {
  components: { SettingBackBtn, UserImageForm },
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
