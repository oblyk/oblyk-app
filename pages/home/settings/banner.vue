<template>
  <div>
    <spinner v-if="!currentUser" />

    <v-container v-else>
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('actions.changeBanner') }}
          </h2>
          <user-image-form
            :user="currentUser"
            upload-type="banner"
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
        metaTitle: 'Changer mon bandeau'
      },
      en: {
        metaTitle: 'Change my banner'
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
