<template>
  <v-form @submit.prevent="signUp">
    <v-text-field
      outlined
      v-model="oblyk_full_name"
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
      @input="changeLanguage()"
      outlined
    />

    <!-- Email -->
    <v-text-field
      outlined
      v-model="email"
      :label="$t('models.user.email')"
      type="email"
      required
    />

    <!-- Password -->
    <v-text-field
      outlined
      v-model="password"
      :label="$t('models.user.password')"
      :type="showPassword ? 'text' : 'password'"
      required
      :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append="showPassword = !showPassword"
    />

    <!-- Password confirmation -->
    <v-text-field
      outlined
      v-model="passwordConfirmation"
      :label="$t('models.user.confirm_password')"
      :type="showPasswordConfirmation ? 'text' : 'password'"
      required
      :append-icon="showPasswordConfirmation ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append="showPasswordConfirmation = !showPasswordConfirmation"
    />

    <!-- Name & Last name -->
    <v-row>
      <v-col>
        <v-text-field
          outlined
          v-model="firstName"
          :label="$t('models.user.first_name')"
          required
        />
      </v-col>
      <v-col>
        <v-text-field
          outlined
          v-model="lastName"
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
      class="mt-0"
      hide-details
      v-model="newsletterSubscribe"
      :label="$t('components.session.newsletterSubscribe')"
    />

    <!-- Term of use -->
    <v-checkbox
      class="mt-3"
      hide-details
      v-model="termsOfUse"
      :label="$t('components.session.termsOfUse')"
    />

    <router-link to="/terms-of-use" class="ml-8">
      {{ $t('termsOfUse.title') }}
    </router-link>

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
import SubmitForm from '@/components/forms/SubmitForm'
import { FormHelpers } from '@/mixins/FormHelpers'
import DateOfBirthInput from '@/components/forms/DateOfBirthInput'
import GenreInput from '@/components/forms/GenreInput'

export default {
  name: 'SignUpForm',
  components: { GenreInput, DateOfBirthInput, SubmitForm },
  mixins: [FormHelpers],
  props: {
    redirectTo: {
      type: String,
      required: false
    }
  },

  data () {
    return {
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
    changeLanguage: function () {
      this.$vuetify.lang.current = this.language
      this.$i18n.locale = this.language
      localStorage.setItem('lang', this.language)
    },

    signUp: function () {
      if (!this.termsOfUse) {
        this.$root.$emit('alertSimpleError', this.$t('components.session.youMustBeAgree'))
        return
      }

      this.submitOverlay = true

      const data = {
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
      this.$store
        .dispatch('auth/signUp', data)
        .then(() => {
          if (this.redirectTo) {
            this.$router.push(this.redirectTo)
          } else {
            this.$router.push('/privacy')
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'user')
        })
        .finally(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
