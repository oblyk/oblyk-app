<template>
  <div>
    <v-form @submit.prevent="submit()">
      <v-row>
        <v-col>

          <!-- First name -->
          <v-text-field
            outlined
            v-model="data.first_name"
            required
            :label="$t('models.user.first_name')"
          />
        </v-col>
        <v-col>

          <!-- Last name -->
          <v-text-field
            outlined
            v-model="data.last_name"
            required
            :label="$t('models.user.last_name')"
          />
        </v-col>
      </v-row>

      <!-- Date of birth -->
      <date-picker-input
        v-model="data.date_of_birth"
        :label="$t('models.user.date_of_birth')"
      />

      <!-- Genre -->
      <v-select
        v-model="data.genre"
        :items="genreList"
        item-value="value"
        item-text="text"
        :label="$t('models.user.genre')"
        outlined
      />

      <!-- Language -->
      <v-select
        v-model="data.language"
        :items="locales"
        item-value="value"
        item-text="text"
        :label="$t('models.user.language')"
        outlined
      />

      <!-- Bio -->
      <v-textarea
        outlined
        required
        v-model="data.description"
        :label="$t('models.user.description')"
      />

      <submit-form
        :overlay="submitOverlay"
        :submit-local-key="submitText()"
      >
        <v-btn
          text
          class="float-right"
          color="primary"
          :to="user.meUrl('partner-settings')"
        >
          <v-icon
            left
          >
            mdi-account-search
          </v-icon>
          {{ $t('components.user.partnerSearch') }}
        </v-btn>
      </submit-form>
    </v-form>
  </div>
</template>
<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import UserApi from '@/services/oblyk-api/userApi'
import SubmitForm from '@/components/forms/SubmitForm'
import DatePickerInput from '@/components/forms/DatePickerInput'
import store from '@/store'

export default {
  name: 'UserForm',
  mixins: [FormHelpers],
  components: { DatePickerInput, SubmitForm },
  props: {
    user: Object
  },

  data () {
    return {
      data: {
        first_name: (this.user || {}).first_name,
        last_name: (this.user || {}).last_name,
        description: (this.user || {}).description,
        date_of_birth: (this.user || {}).date_of_birth,
        genre: (this.user || {}).genre,
        language: (this.user || {}).language
      },
      genreList: [
        { text: this.$t('models.genres.undefined'), value: null },
        { text: this.$t('models.genres.male'), value: 'male' },
        { text: this.$t('models.genres.female'), value: 'female' }
      ],
      locales: [
        { text: 'Français', value: 'fr' },
        { text: 'English', value: 'en' }
      ]
    }
  },

  methods: {
    submit: function () {
      this.submitOverlay = true

      UserApi
        .update(this.data)
        .then(() => {
          store.dispatch('auth/updateUserName', {
            first_name: this.data.first_name,
            last_name: this.data.last_name
          })
          this.$router.push('/')
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'user')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
