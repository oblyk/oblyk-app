<template>
  <div>
    <page-header
      :title="$t('actions.myAvatar')"
      back-to="/home/settings"
    />

    <div class="d-flex justify-center pb-10">
      <div class="global-form-width full-width px-3">
        <user-image-form
          v-if="currentUser"
          :user="currentUser"
          upload-type="avatar"
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
import UserImageForm from '~/components/users/forms/UserImageForm'
import PageHeader from '~/components/layouts/PageHeader'

export default {
  components: { PageHeader, UserImageForm },
  mixins: [CurrentUserConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Changer mon avatar'
      },
      en: {
        metaTitle: 'Change my avatar'
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
