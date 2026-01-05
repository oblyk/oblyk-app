<template>
  <div>
    <page-header
      :title="$t('components.user.settingTabs.myApplications')"
      back-to="/home/settings/applications"
    />
    <v-container class="pt-6">
      <h3 class="mb-3">
        Associer mon compte Oblyk à MyCompet
      </h3>
      <user-application-my-compet-form
        v-if="currentUser"
        submit-methode="post"
      />
      <v-skeleton-loader
        v-else
        type="article"
      />
    </v-container>
  </div>
</template>
<script>
import { mdiArrowLeft } from '@mdi/js'
import { CurrentUserConcern } from '~/concerns/CurrentUserConcern'
import PageHeader from '~/components/layouts/PageHeader'
import UserApplicationMyCompetForm from '~/components/userApplication/forms/UserApplicationMyCompetForm'

export default {
  components: { UserApplicationMyCompetForm, PageHeader },
  mixins: [CurrentUserConcern],
  middleware: ['auth'],

  data () {
    return {
      mdiArrowLeft
    }
  }
}
</script>
