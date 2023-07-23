<template>
  <v-form
    @submit.prevent="newPassword()"
  >
    <v-text-field
      v-model="oblyk_full_name"
      outlined
      required
      hide-details
      tabindex="-1"
      autocomplete="off"
      value=""
      :label="$t('models.oblyk_full_name')"
      class="mb-2 full-name-field-form"
    />

    <v-text-field
      v-model="password"
      outlined
      :label="$t('models.user.password')"
      :type="showPassword ? 'text' : 'password'"
      required
      :append-icon="showPassword ? mdiEyeOff : mdiEye"
      class="required-field"
      :hint="$t('models.password.rules')"
      persistent-hint
      @click:append="showPassword = !showPassword"
    />

    <v-text-field
      v-model="passwordConfirmation"
      outlined
      :label="$t('models.user.confirm_password')"
      :type="showPasswordConfirmation ? 'text' : 'password'"
      required
      :append-icon="showPasswordConfirmation ? mdiEyeOff : mdiEye"
      class="required-field"
      @click:append="showPasswordConfirmation = !showPasswordConfirmation"
    />

    <required-explained class="mt-4" />

    <submit-form
      submit-local-key="actions.changeMyPassword"
      :overlay="overlay"
    />
  </v-form>
</template>

<script>
import { mdiEyeOff, mdiEye } from '@mdi/js'
import SubmitForm from '@/components/forms/SubmitForm'
import SessionApi from '~/services/oblyk-api/SessionApi'
import RequiredExplained from '~/components/forms/RequiredExplained'
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'

export default {
  name: 'NewPasswordForm',
  components: { RequiredExplained, SubmitForm },

  data () {
    return {
      mdiEyeOff,
      mdiEye,
      overlay: false,
      rememberMe: true,
      password: null,
      oblyk_full_name: null,
      passwordConfirmation: null,
      showPassword: false,
      showPasswordConfirmation: false,
      token: null
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.token = urlParams.get('token')
  },

  methods: {
    newPassword () {
      this.overlay = true
      new SessionApi(this.$axios, this.$auth)
        .newPassword(
          {
            token: this.token,
            password: this.password,
            password_confirmation: this.passwordConfirmation,
            oblyk_full_name: this.oblyk_full_name
          }
        ).then((resp) => {
          this.$auth
            .loginWith('local', {
              data: {
                email: resp.data.email,
                password: this.password
              }
            }).then(() => {
              // get likes
              new CurrentUserApi(this.$axios, this.$auth)
                .likes()
                .then((resp) => {
                  this.$store.dispatch('likes/storeLikes', resp.data)
                })

              this.$router.push('/')
            }).finally(() => {
              this.overlay = false
            })
        }).catch(() => {
          this.$root.$emit('alertSimpleError', this.$t('components.session.newPasswordError'))
          this.overlay = false
        })
    }
  }
}
</script>
