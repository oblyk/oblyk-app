<template>
  <div>
    <spinner v-if="loadingMeUser" />

    <v-container v-if="!loadingMeUser">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('components.user.partnerSearch') }}
          </h2>
          <partner-form :user="meUser" submit-methode="put" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { MeUserConcern } from '@/concerns/MeUserConcern'
import Spinner from '@/components/layouts/Spiner'
import PartnerForm from '@/components/users/forms/PartnerForm'

export default {
  name: 'MyPartnerSettingsView',
  components: { PartnerForm, Spinner },
  mixins: [MeUserConcern]
}
</script>
