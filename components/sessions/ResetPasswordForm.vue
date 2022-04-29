<template>
  <div>
    <v-alert v-if="mailSent" type="success">
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
        v-model="oblyk_full_name"
        outlined
        required
        hide-details
        tabindex="-1"
        autocomplete="off"
        :label="$t('models.oblyk_full_name')"
        class="mb-2 full-name-field-form"
      />

      <v-text-field
        v-model="email"
        outlined
        :label="$t('models.user.email')"
        type="email"
        hide-details
        required
        class="required-field"
      />

      <required-explained class="mt-4" />

      <submit-form
        submit-local-key="actions.newPassword"
        :overlay="overlay"
      />
    </v-form>
  </div>
</template>

<script>
import SubmitForm from '@/components/forms/SubmitForm'
import SessionApi from '~/services/oblyk-api/SessionApi'
import RequiredExplained from '~/components/forms/RequiredExplained'

export default {
  name: 'ResetPasswordForm',
  components: { RequiredExplained, SubmitForm },

  data () {
    return {
      overlay: false,
      mailSent: false,
      oblyk_full_name: null,
      email: null
    }
  },

  methods: {
    resetPassword () {
      this.overlay = true
      new SessionApi(this.$axios, this.$auth)
        .resetPassword({
          email: this.email,
          oblyk_full_name: this.oblyk_full_name
        })
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
