<template>
  <div>
    <page-header
      :title="$t('components.user.settingTabs.myApplications')"
      back-to="/home/settings/applications"
    />
    <v-container class="pt-6">
      <h3 class="mb-3">
        Associer mon compte à MyCompet
      </h3>
      <ffme-my-compet-form
        v-if="currentUser"
        :user="currentUser"
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
import FfmeMyCompetForm from '~/components/userApplication/forms/FfmeMyCompetForm.vue'
import PageHeader from '~/components/layouts/PageHeader.vue'

export default {
  components: { PageHeader, FfmeMyCompetForm },
  mixins: [CurrentUserConcern],
  middleware: ['auth'],

  data () {
    return {
      mdiArrowLeft
    }
  }
}
</script>
