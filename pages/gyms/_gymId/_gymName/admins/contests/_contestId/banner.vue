<template>
  <v-container v-if="contest">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.uploadIllustration') }}
        </h2>
        <contest-banner-form
          :contest="contest"
          upload-type="banner"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ContestConcern } from '~/concerns/ContestConcern'
import { ProtectedGymConcern } from '~/concerns/ProtectedGymConcern'
import ContestBannerForm from '~/components/contests/forms/ContestBannerForm.vue'

export default {
  meta: { orphanRoute: true },
  components: { ContestBannerForm },
  mixins: [ContestConcern, ProtectedGymConcern],
  middleware: ['auth', 'gymAdmin'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Illustration du contest'
      },
      en: {
        metaTitle: 'Contest picture'
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
