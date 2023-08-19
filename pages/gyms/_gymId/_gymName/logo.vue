<template>
  <v-container v-if="gym">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.changeLogo') }}
        </h2>
        <gym-image-form
          :gym="gym"
          upload-type="logo"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GymConcern } from '~/concerns/GymConcern'
import { ProtectedGymConcern } from '~/concerns/ProtectedGymConcern'
import GymImageForm from '~/components/gyms/forms/GymImageForm'

export default {
  meta: { orphanRoute: true },
  components: { GymImageForm },
  mixins: [GymConcern, ProtectedGymConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Changer le logo'
      },
      en: {
        metaTitle: 'Edit logo'
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
