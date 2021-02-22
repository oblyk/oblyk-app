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
      <date-of-birth-input
        v-model="data.date_of_birth"
      />

      <!-- Genre -->
      <genre-input v-model="data.genre" />

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
      <markdown-input
        v-model="data.description"
        :label="$t('models.user.description')"
      />

      <submit-form
        :overlay="submitOverlay"
        submit-local-key="actions.save"
      />
    </v-form>
  </div>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import SubmitForm from '@/components/forms/SubmitForm'
import store from '@/store'
import MarkdownInput from '@/components/forms/MarkdownInput'
import DateOfBirthInput from '@/components/forms/DateOfBirthInput'
import GenreInput from '@/components/forms/GenreInput'

export default {
  name: 'UserForm',
  mixins: [FormHelpers],
  components: { GenreInput, DateOfBirthInput, MarkdownInput, SubmitForm },
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
      locales: [
        { text: 'Français', value: 'fr' },
        { text: 'English', value: 'en' }
      ]
    }
  },

  methods: {
    submit: function () {
      this.submitOverlay = true

      CurrentUserApi
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
