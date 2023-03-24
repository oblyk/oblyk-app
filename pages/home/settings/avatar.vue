<template>
  <div>
    <spinner v-if="loadingCurrentUser" />

    <v-container v-if="!loadingCurrentUser">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('actions.myAvatar') }}
          </h2>
          <user-image-form
            :user="currentUser"
            upload-type="avatar"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { CurrentUserConcern } from '~/concerns/CurrentUserConcern'
import Spinner from '~/components/layouts/Spiner.vue'
import UserImageForm from '~/components/users/forms/UserImageForm.vue'

export default {
  components: { UserImageForm, Spinner },
  mixins: [CurrentUserConcern],

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
