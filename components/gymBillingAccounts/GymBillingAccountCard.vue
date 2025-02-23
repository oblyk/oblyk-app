<template>
  <div>
    <v-card class="border">
      <v-card-title class="d-flex">
        <div class="mr-auto">
          {{ billingAccount.name }}
        </div>
      </v-card-title>
      <v-card-subtitle v-if="billingAccount.siret">
        siret : {{ billingAccount.siret }}
      </v-card-subtitle>
      <v-card-text>
        <description-line
          :icon="mdiEmail"
          :item-title="$t('models.gymBillingAccount.email')"
          :item-value="billingAccount.email"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mdiEmail } from '@mdi/js'
import DescriptionLine from '~/components/ui/DescriptionLine'

export default {
  name: 'GymBillingAccountCard',
  components: { DescriptionLine },
  props: {
    gym: {
      type: Object,
      required: true
    },
    gymBillingAccount: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      editBillingAccountModal: false,
      billingAccount: this.gymBillingAccount,

      mdiEmail
    }
  }
}
</script>
