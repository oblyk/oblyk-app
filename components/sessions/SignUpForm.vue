<template>
  <v-form @submit.prevent="signUp">
    <v-stepper
      v-model="step"
      elevation="0"
    >
      <v-stepper-header
        class="elevation-0 border-bottom mb-1 sign-up-step-header"
      >
        <v-stepper-step
          :complete="step > 1"
          step="1"
        >
          {{ $t('components.session.me') }}
        </v-stepper-step>

        <v-divider />

        <v-stepper-step
          :complete="step > 2"
          step="2"
        >
          {{ $t('components.session.privacy') }}
        </v-stepper-step>

        <v-divider />

        <v-stepper-step step="3">
          {{ $t('components.session.guideBook') }}
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <!-- User information -->
        <v-stepper-content
          step="1"
          class="pa-3 pa-md-5"
        >
          <v-text-field
            v-model="data.oblyk_full_name"
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
            v-model="data.language"
            :items="locales"
            item-value="value"
            item-text="text"
            :label="$t('models.user.language')"
            outlined
            class="mt-1"
            @input="changeLanguage()"
          />

          <!-- Email -->
          <v-text-field
            v-model="data.email"
            outlined
            :label="$t('models.user.email')"
            type="email"
            required
            class="required-field"
          />

          <!-- Password -->
          <v-text-field
            v-model="data.password"
            outlined
            :label="$t('models.user.password')"
            :type="showPassword ? 'text' : 'password'"
            required
            class="required-field"
            :hint="$t('models.password.rules')"
            persistent-hint
            :append-icon="showPassword ? mdiEyeOff : mdiEye"
            @click:append="showPassword = !showPassword"
          />

          <!-- Password confirmation -->
          <v-text-field
            v-model="data.password_confirmation"
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
                v-model="data.first_name"
                outlined
                :label="$t('models.user.first_name')"
                class="required-field"
                required
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="data.last_name"
                outlined
                :label="$t('models.user.last_name')"
              />
            </v-col>
          </v-row>

          <!-- Newsletter subscribe -->
          <v-checkbox
            v-model="data.newsletter_subscribe"
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

          <nuxt-link to="/fr/conditions-d-utilisation" target="_blank" class="ml-8">
            {{ $t('components.session.termsOfUseTitle') }}
          </nuxt-link>

          <required-explained class="mt-4" />

          <v-card>
            <v-card-actions>
              <v-btn
                text
                outlined
                to="/sign-in"
                color="primary"
                class="float-right mt-1"
              >
                {{ $t('actions.signIn') }}
              </v-btn>
              <v-spacer />
              <v-btn
                elevation="0"
                color="primary"
                :disabled="!stepInfoValid"
                @click="step = 2"
              >
                {{ $t('actions.continue') }}
                <v-icon right>
                  {{ mdiArrowRight }}
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <!-- Privacy -->
        <v-stepper-content
          step="2"
          class="pa-3 pa-md-5"
        >
          <p class="font-weight-bold">
            {{ $t('components.session.publicOrPrivate') }}
          </p>
          <v-checkbox
            v-model="data.public_profile"
            hide-details
            class="mb-2"
            :label="$t('models.user.public_profile')"
          />
          <p v-if="data.public_profile" class="text--disabled" v-html="$t('components.user.public_explain.profile')" />
          <p v-if="!data.public_profile" class="text--disabled" v-html="$t('components.user.private_explain.profile')" />

          <v-checkbox
            v-model="data.public_outdoor_ascents"
            class="mt-10 mb-2"
            hide-details
            :label="$t('models.user.public_outdoor_ascents')"
          />
          <p v-if="data.public_outdoor_ascents" class="text--disabled" v-html="$t('components.user.public_explain.outdoor_ascents')" />
          <p v-if="!data.public_outdoor_ascents" class="text--disabled" v-html="$t('components.user.private_explain.outdoor_ascents')" />

          <v-checkbox
            v-model="data.public_indoor_ascents"
            class="mt-10 mb-2"
            hide-details
            :label="$t('models.user.public_indoor_ascents')"
          />
          <p v-if="data.public_indoor_ascents" class="text--disabled" v-html="$t('components.user.public_explain.indoor_ascents')" />
          <p v-if="!data.public_indoor_ascents" class="text--disabled" v-html="$t('components.user.private_explain.indoor_ascents')" />
          <v-card>
            <v-card-actions>
              <v-btn
                icon
                @click="step = 1"
              >
                <v-icon>
                  {{ mdiArrowLeft }}
                </v-icon>
              </v-btn>
              <v-spacer />
              <v-btn
                elevation="0"
                color="primary"
                @click="step = 3"
              >
                {{ $t('actions.continue') }}
                <v-icon right>
                  {{ mdiArrowRight }}
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <!-- Guide book -->
        <v-stepper-content
          step="3"
          class="pa-3 pa-md-5"
        >
          <p v-html="$t('components.session.buyGuide.part1')" />
          <p v-html="$t('components.session.buyGuide.part2')" />
          <p v-html="$t('components.session.buyGuide.part3')" />
          <ol class="mb-3">
            <li v-html="$t('components.session.buyGuide.reason1')" />
            <li v-html="$t('components.session.buyGuide.reason2')" />
            <li v-html="$t('components.session.buyGuide.reason3')" />
          </ol>
          <p v-html="$t('components.session.buyGuide.part4')" />
          <p v-html="$t('components.session.buyGuide.part5')" />
          <v-card>
            <v-card-actions>
              <v-btn
                icon
                @click="step = 2"
              >
                <v-icon>
                  {{ mdiArrowLeft }}
                </v-icon>
              </v-btn>
              <v-spacer />
              <v-btn
                elevation="0"
                color="primary"
                :loading="loading"
                @click="signUp()"
              >
                {{ $t('actions.createMyAccount') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-form>
</template>

<script>
import { mdiEyeOff, mdiEye, mdiArrowRight, mdiArrowLeft } from '@mdi/js'
import { FormHelpers } from '@/mixins/FormHelpers'
import SessionApi from '~/services/oblyk-api/SessionApi'
import RequiredExplained from '~/components/forms/RequiredExplained'

export default {
  name: 'SignUpForm',
  components: { RequiredExplained },
  mixins: [FormHelpers],
  props: {
    redirectTo: {
      type: String,
      default: null
    },
    preFilledEmail: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      step: 1,
      termsOfUse: false,
      showPassword: false,
      showPasswordConfirmation: false,
      loading: false,
      data: {
        email: null,
        password: null,
        password_confirmation: null,
        last_name: null,
        first_name: null,
        remember_me: null,
        language: this.$vuetify.lang.current,
        newsletter_subscribe: false,
        oblyk_full_name: null,
        public_profile: true,
        public_outdoor_ascents: true,
        public_indoor_ascents: true
      },
      locales: [
        { text: 'Français', value: 'fr' },
        { text: 'English', value: 'en' }
      ],

      mdiEyeOff,
      mdiEye,
      mdiArrowRight,
      mdiArrowLeft
    }
  },

  computed: {
    stepInfoValid () {
      return this.termsOfUse === true &&
        this.data.email !== null &&
        this.data.password !== null &&
        this.data.password_confirmation !== null &&
        this.data.first_name !== null
    }
  },

  watch: {
    preFilledEmail () {
      this.email = this.preFilledEmail
    },

    step () {
      const element = document.querySelector('.sign-up-step-header')
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
        this.step = 1
        return
      }

      this.loading = true
      new SessionApi(this.$axios, this.$auth)
        .signUp(this.data)
        .then(() => {
          this.$auth
            .loginWith('local', {
              data: {
                password: this.data.password,
                email: this.data.email
              }
            })
            .then(() => {
              if (this.redirectTo) {
                this.$router.push(this.redirectTo)
              } else {
                this.$router.push('/home')
              }

              // Connect to Notification Channel
              this.$cable.subscribe({ channel: 'NotificationChannel' })
              this.$cable.subscribe({ channel: 'FetchUserChannel' })
            })
            .catch(() => {
              this.loading = false
            })
        })
        .catch((err) => {
          this.step = 1
          this.loading = false
          this.$root.$emit('alertFromApiError', err, 'user')
        })
    }
  }
}
</script>
