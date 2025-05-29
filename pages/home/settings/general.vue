<template>
  <div>
    <setting-back-btn title-key="components.user.globalInformation" />

    <div class="d-flex justify-center pb-10">
      <div class="global-form-width px-3">
        <user-form
          v-if="currentUser"
          :user="currentUser"
          submit-methode="put"
        />
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
import UserForm from '~/components/users/forms/UserForm'
import SettingBackBtn from '~/components/users/layouts/SettingBackBtn'

export default {
  components: { SettingBackBtn, UserForm },
  mixins: [CurrentUserConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Modifier mon profil'
      },
      en: {
        metaTitle: 'Edit my profile'
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
