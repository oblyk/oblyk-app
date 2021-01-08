<template>
  <div>
    <v-alert type="success" v-if="mailSent">
      {{ $t('components.session.sentCancellationLink') }}<br>
      {{ $t('components.session.checkYourMailBox') }}
    </v-alert>

    <v-form
      v-if="!mailSent"
      @submit.prevent="resetPassword()"
    >
      <p>
        {{ $t('components.session.forgottenPasswordExplain') }}
      </p>
      <v-text-field
        outlined
        v-model="email"
        :label="$t('models.user.email')"
        type="email"
        required
      />

      <submit-form
        submit-local-key="actions.newPassword"
        :overlay="overlay"
      />
    </v-form>
  </div>
</template>

<script>
import SubmitForm from '@/components/forms/SubmitForm'
import SessionApi from '@/services/oblyk-api/sessionApi'

export default {
  name: 'ResetPasswordForm',
  components: { SubmitForm },

  data () {
    return {
      overlay: false,
      mailSent: false,
      email: null
    }
  },

  methods: {
    resetPassword: function () {
      this.overlay = true
      SessionApi
        .resetPassword({ email: this.email })
        .then(() => {
          this.mailSent = true
        }).catch(() => {
          this.$root.$emit('alertSimpleError', this.$t('components.session.resetPasswordError'))
        }).finally(() => {
          this.overlay = false
        })
    }
  }
}
</script>
