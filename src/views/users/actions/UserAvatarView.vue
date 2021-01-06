<template>
  <div>
    <spinner v-if="loadingUserCurrent" />

    <v-container v-if="!loadingUserCurrent">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('actions.myAvatar') }}
          </h2>
          <user-image-form
            :user="userCurrent"
            upload-type="avatar"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { UserCurrentConcern } from '@/concerns/UserCurrentConcern'
import Spinner from '@/components/layouts/Spiner'
import UserImageForm from '@/components/users/forms/UserImageForm'

export default {
  name: 'UserAvatarView',
  components: { UserImageForm, Spinner },
  mixins: [UserCurrentConcern]
}
</script>
