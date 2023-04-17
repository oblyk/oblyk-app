<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.user.partnerSearch') }}
        </h2>
        <partner-form
          v-if="user"
          :user="user"
          submit-methode="put"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PartnerForm from '~/components/users/forms/PartnerForm.vue'

export default {
  components: { PartnerForm },
  props: {
    user: {
      type: Object,
      required: true
    }
  },

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
