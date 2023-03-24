<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.user.partnerSearch') }}
        </h2>
        <enable-localization :user="user" />
        <partner-form :user="user" submit-methode="put" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PartnerForm from '~/components/users/forms/PartnerForm.vue'
import EnableLocalization from '~/components/users/notificationCard/EnableLocalization.vue'

export default {
  components: { EnableLocalization, PartnerForm },
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Mes paramètres de recherche de partenaire'
      },
      en: {
        metaTitle: 'My partner search settings'
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
