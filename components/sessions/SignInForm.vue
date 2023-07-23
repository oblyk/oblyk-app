<template>
  <v-form @submit.prevent="userLogin">
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
      required
      class="required-field"
    />

    <v-text-field
      v-model="password"
      outlined
      :label="$t('models.user.password')"
      :type="showPassword ? 'text' : 'password'"
      required
      class="required-field"
      hide-details
      :append-icon="showPassword ? mdiEyeOff : mdiEye"
      @click:append="showPassword = !showPassword"
    />

    <required-explained class="mt-4" />

    <submit-form
      submit-local-key="actions.signIn"
      :overlay="overlay"
    >
      <v-btn
        text
        small
        to="/sign-up"
        color="primary"
        class="mt-1 float-right"
      >
        {{ $t('actions.signUp') }}
      </v-btn>
    </submit-form>
    <p class="text-right mt-5">
      <nuxt-link to="/reset-password">
        {{ $t('components.session.forgottenPassword') }}
      </nuxt-link>
    </p>
  </v-form>
</template>

<script>
import { mdiEyeOff, mdiEye } from '@mdi/js'
import SubmitForm from '@/components/forms/SubmitForm'
import RequiredExplained from '~/components/forms/RequiredExplained'
import NotificationApi from '~/services/oblyk-api/NotificationApi'
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'

export default {
  name: 'SignInForm',
  components: { RequiredExplained, SubmitForm },
  props: {
    redirectTo: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      overlay: false,
      oblyk_full_name: null,
      email: null,
      password: null,
      showPassword: false,
      rememberMe: true,

      mdiEyeOff,
      mdiEye
    }
  },

  methods: {
    async userLogin () {
      this.overlay = true
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
            oblyk_full_name: this.oblyk_full_name
          }
        })

        // Connect to notification channel
        this.$cable.subscribe({ channel: 'NotificationChannel' })
        this.$cable.subscribe({ channel: 'FetchUserChannel' })

        // Get unread notification
        await new NotificationApi(this.$axios, this.$auth)
          .unreadCount()
          .then((resp) => {
            this.$store.dispatch('notification/changeNotificationStatus', resp.data > 0)
          })

        // Get likes
        await new CurrentUserApi(this.$axios, this.$auth)
          .likes()
          .then((resp) => {
            this.$store.dispatch('likes/storeLikes', resp.data)
          })

        if (this.redirectTo) {
          await this.$router.push(this.redirectTo)
        } else {
          await this.$router.push('/home')
        }
      } catch (err) {
        this.$root.$emit('alertFromApiError', err, 'user')
      }
      this.overlay = false
    }
  }
}
</script>
