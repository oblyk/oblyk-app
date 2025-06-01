<template>
  <div>
    <page-header
      :title="$t('components.user.partnerSearch')"
      back-to="/home/settings"
    />

    <v-container class="pt-6">
      <partner-form
        v-if="currentUser"
        :user="currentUser"
        submit-methode="put"
      />
      <v-skeleton-loader
        v-else
        type="article"
      />
    </v-container>
  </div>
</template>

<script>
import { CurrentUserConcern } from '~/concerns/CurrentUserConcern'
import PartnerForm from '~/components/users/forms/PartnerForm'
import PageHeader from '~/components/layouts/PageHeader'

export default {
  components: { PageHeader, PartnerForm },
  mixins: [CurrentUserConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Ma présence sur la carte des grimpeurs'
      },
      en: {
        metaTitle: "My presence on the climbers' map"
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
