<template>
  <div>
    <page-header
      :title="$t('components.user.settingTabs.externalApplications')"
      back-to="/home/settings"
    />

    <v-container>
      <div v-if="currentUser">
        <user-application-user-list :user="currentUser" />
        <div class="text-right">
          <add-user-application />
        </div>
      </div>
      <v-skeleton-loader
        v-else
        type="article"
      />
    </v-container>
  </div>
</template>

<script>
import { CurrentUserConcern } from '~/concerns/CurrentUserConcern'
import UserApplicationUserList from '~/components/userApplication/UserApplicationUserList'
import AddUserApplication from '~/components/userApplication/AddUserApplication'
import PageHeader from '~/components/layouts/PageHeader'

export default {
  components: { PageHeader, AddUserApplication, UserApplicationUserList },
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
