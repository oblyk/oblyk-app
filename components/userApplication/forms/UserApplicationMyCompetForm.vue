<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.ffme_licence_number"
      label="Votre numéro de licence FFME"
      type="number"
      hide-details
      outlined
    />
    <div class="text-right mt-2">
      <v-btn
        text
        outlined
        href="https://www.myffme.fr/licences-hors-club"
        target="_blank"
      >
        Je n'ai pas de licence ?
      </v-btn>
      <v-btn
        elevation="0"
        type="submit"
        color="primary"
        :loading="submitForm"
        :disabled="data.ffme_licence_number === null"
      >
        {{ $t('actions.associate') }}
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import { FormHelpers } from '~/mixins/FormHelpers'
import UserApplicationMyCompetApi from '~/services/oblyk-api/UserApplicationMyCompetApi'

export default {
  name: 'UserApplicationMyCompetForm',
  mixins: [FormHelpers],
  props: {
    userApplication: {
      type: Object,
      default: null
    },
    callback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      submitForm: false,

      data: {
        id: this.userApplication?.id,
        ffme_licence_number: this.userApplication?.ffme_licence_number
      }
    }
  },

  methods: {
    submit () {
      this.submitForm = true
      const promise = (this.isEditingForm()) ? new UserApplicationMyCompetApi(this.$axios, this.$auth).update(this.data) : new UserApplicationMyCompetApi(this.$axios, this.$auth).create(this.data)
      promise
        .then((resp) => {
          if (this.callback) {
            this.callback(resp.data)
          } else {
            this.$router.push('/home/settings/applications')
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'UserApplication')
        })
        .then(() => {
          this.submitForm = false
        })
    }
  }
}
</script>
