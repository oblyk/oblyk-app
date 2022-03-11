<template>
  <v-form @submit.prevent="signUp">
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

    <!-- Language -->
    <v-select
      v-model="language"
      :items="locales"
      item-value="value"
      item-text="text"
      :label="$t('models.user.language')"
      outlined
      @input="changeLanguage()"
    />

    <!-- Email -->
    <v-text-field
      v-model="email"
      outlined
      :label="$t('models.user.email')"
      type="email"
      required
      class="required-field"
    />

    <!-- Password -->
    <v-text-field
      v-model="password"
      outlined
      :label="$t('models.user.password')"
      :type="showPassword ? 'text' : 'password'"
      required
      class="required-field"
      :append-icon="showPassword ? mdiEyeOff : mdiEye"
      @click:append="showPassword = !showPassword"
    />

    <!-- Password confirmation -->
    <v-text-field
      v-model="passwordConfirmation"
      outlined
      :label="$t('models.user.confirm_password')"
      :type="showPasswordConfirmation ? 'text' : 'password'"
      required
      class="required-field"
      :append-icon="showPasswordConfirmation ? mdiEyeOff : mdiEye"
      @click:append="showPasswordConfirmation = !showPasswordConfirmation"
    />

    <!-- Name & Last name -->
    <v-row>
      <v-col>
        <v-text-field
          v-model="firstName"
          outlined
          :label="$t('models.user.first_name')"
          class="required-field"
          required
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="lastName"
          outlined
          :label="$t('models.user.last_name')"
        />
      </v-col>
    </v-row>

    <!-- Date of birth -->
    <date-of-birth-input
      v-model="dateOfBirth"
    />

    <!-- Genre -->
    <genre-input
      v-model="genre"
    />

    <!-- Newsletter subscribe -->
    <v-checkbox
      v-model="newsletterSubscribe"
      class="mt-0"
      hide-details
      :label="$t('components.session.newsletterSubscribe')"
    />

    <!-- Term of use -->
    <v-checkbox
      v-model="termsOfUse"
      class="mt-3 required-field"
      hide-details
      :label="$t('components.session.termsOfUse')"
    />

    <nuxt-link to="/terms-of-use" class="ml-8">
      {{ $t('termsOfUse.title') }}
    </nuxt-link>

    <required-explained class="mt-4" />

    <submit-form
      class="mt-7"
      submit-local-key="actions.createMyAccount"
      :overlay="submitOverlay"
    >
      <v-btn
        text
        small
        to="/sign-in"
        color="primary"
        class="float-right mt-1"
      >
        {{ $t('actions.signIn') }}
      </v-btn>
    </submit-form>
  </v-form>
</template>

<script>
import { mdiEyeOff, mdiEye } from '@mdi/js'
import SubmitForm from '@/components/forms/SubmitForm'
import { FormHelpers } from '@/mixins/FormHelpers'
import DateOfBirthInput from '@/components/forms/DateOfBirthInput'
import GenreInput from '@/components/forms/GenreInput'
import SessionApi from '~/services/oblyk-api/SessionApi'
import RequiredExplained from '~/components/forms/RequiredExplained'

export default {
  name: 'SignUpForm',
  components: { RequiredExplained, GenreInput, DateOfBirthInput, SubmitForm },
  mixins: [FormHelpers],
  props: {
    redirectTo: {
      type: String,
      required: false,
      default: null
    }
  },

  data () {
    return {
      mdiEyeOff,
      mdiEye,
      termsOfUse: false,
      newsletterSubscribe: false,
      email: null,
      password: null,
      passwordConfirmation: null,
      showPassword: false,
      showPasswordConfirmation: false,
      lastName: null,
      firstName: null,
      dateOfBirth: null,
      genre: null,
      rememberMe: true,
      language: this.$vuetify.lang.current,
      oblyk_full_name: null,
      locales: [
        { text: 'Français', value: 'fr' },
        { text: 'English', value: 'en' }
      ]
    }
  },

  methods: {
    changeLanguage () {
      this.$vuetify.lang.current = this.language
      this.$i18n.setLocaleCookie(this.language)
      this.$i18n.setLocale(this.language)
    },

    signUp () {
      if (!this.termsOfUse) {
        this.$root.$emit('alertSimpleError', this.$t('components.session.youMustBeAgree'))
        return
      }

      this.submitOverlay = true
      new SessionApi(this.$axios, this.$auth)
        .signUp(
          {
            email: this.email,
            password: this.password,
            password_confirmation: this.passwordConfirmation,
            last_name: this.lastName,
            first_name: this.firstName,
            date_of_birth: this.dateOfBirth,
            remember_me: this.rememberMe,
            language: this.language,
            newsletter_subscribe: this.newsletterSubscribe,
            oblyk_full_name: this.oblyk_full_name
          }
        )
        .then(() => {
          this.$auth
            .loginWith('local', {
              data: {
                password: this.password,
                email: this.email
              }
            })
            .then(() => {
              if (this.redirectTo) {
                this.$router.push(this.redirectTo)
              } else {
                this.$router.push('/privacy')
              }
            })
            .finally(() => {
              this.submitOverlay = false
            })
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'user')
          this.submitOverlay = false
        })
    }
  }
}
</script>
