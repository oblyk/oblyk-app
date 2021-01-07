<template>
  <div>
    <spinner v-if="loadingMeUser" />

    <v-container v-if="!loadingMeUser">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('actions.changeBanner') }}
          </h2>
          <user-image-form
            :user="meUser"
            upload-type="banner"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { MeUserConcern } from '@/concerns/MeUserConcern'
import Spinner from '@/components/layouts/Spiner'
import UserImageForm from '@/components/users/forms/UserImageForm'

export default {
  name: 'MyBannerView',
  components: { UserImageForm, Spinner },
  mixins: [MeUserConcern]
}
</script>
