<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.name"
      outlined
      :label="$t('models.gymOpener.name')"
      class="required-field"
      required
    />

    <v-text-field
      v-model="data.first_name"
      outlined
      :label="$t('models.gymOpener.first_name')"
    />

    <v-text-field
      v-model="data.last_name"
      outlined
      :label="$t('models.gymOpener.last_name')"
    />

    <submit-form
      :go-back-btn="false"
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
    />
  </v-form>
</template>

<script>
import { mdiAlert } from '@mdi/js'
import { FormHelpers } from '@/mixins/FormHelpers'
import GymOpenerApi from '~/services/oblyk-api/GymOpenerApi'
import SubmitForm from '@/components/forms/SubmitForm'

export default {
  name: 'GymOpenerForm',
  components: {
    SubmitForm
  },
  mixins: [FormHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    },
    gymOpener: {
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
      data: {
        id: this.gymOpener?.id,
        name: this.gymOpener?.name,
        last_name: this.gymOpener?.last_name,
        first_name: this.gymOpener?.first_name,
        email: this.gymOpener?.email,
        gym_id: this.gym.id
      },

      mdiAlert
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new GymOpenerApi(this.$axios, this.$auth).update(this.data) : new GymOpenerApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          if (this.callback) {
            this.callback(resp.data)
          } else {
            this.$router.push(`${this.gym.path}/admins/openers`)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'GymOpener')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
