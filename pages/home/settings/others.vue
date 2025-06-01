<template>
  <div>
    <page-header
      :title="$t('components.user.otherSetting')"
      back-to="/home/settings"
    />

    <v-container class="pt-6">
      <v-expansion-panels v-if="currentUser">
        <!-- Export ascents and projects -->
        <v-expansion-panel>
          <v-expansion-panel-header>
            {{ $t('components.user.exportAscentsOrProject') }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <export-ascents-or-projects-form />
          </v-expansion-panel-content>
        </v-expansion-panel>

        <!-- Delete account -->
        <v-expansion-panel>
          <v-expansion-panel-header>
            {{ $t('components.user.deleteMyAccount') }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <delete-user-form :user="currentUser" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-skeleton-loader
        v-else
        type="article"
      />
    </v-container>
  </div>
</template>

<script>
import { CurrentUserConcern } from '~/concerns/CurrentUserConcern'
import DeleteUserForm from '~/components/users/forms/DeleteUserForm'
import ExportAscentsOrProjectsForm from '~/components/users/forms/ExportAscentsOrProjectsForm'
import PageHeader from '~/components/layouts/PageHeader'

export default {
  components: { PageHeader, ExportAscentsOrProjectsForm, DeleteUserForm },
  mixins: [CurrentUserConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Autre paramètres'
      },
      en: {
        metaTitle: 'Other parameters'
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
