<template>
  <v-form @submit.prevent="submit()">
    <v-checkbox
      hide-details
      class="mb-2"
      v-model="data.public_profile"
      :label="$t('models.user.public_profile')"
    />
    <p class="text--disabled" v-html="$t('components.user.public_explain.profile')" v-if="data.public_profile" />
    <p class="text--disabled" v-html="$t('components.user.private_explain.profile')" v-if="!data.public_profile" />

    <v-checkbox
      class="mt-10 mb-2"
      hide-details
      v-model="data.public_outdoor_ascents"
      :label="$t('models.user.public_outdoor_ascents')"
    />
    <p class="text--disabled" v-html="$t('components.user.public_explain.outdoor_ascents')" v-if="data.public_outdoor_ascents" />
    <p class="text--disabled" v-html="$t('components.user.private_explain.outdoor_ascents')" v-if="!data.public_outdoor_ascents" />

    <v-checkbox
      class="mt-10 mb-2"
      hide-details
      v-model="data.public_indoor_ascents"
      :label="$t('models.user.public_indoor_ascents')"
    />
    <p class="text--disabled" v-html="$t('components.user.public_explain.indoor_ascents')" v-if="data.public_indoor_ascents" />
    <p class="text--disabled" v-html="$t('components.user.private_explain.indoor_ascents')" v-if="!data.public_indoor_ascents" />

    <submit-form
      class="mt-10"
      :go-back-btn="goBackBtn"
      :overlay="submitOverlay"
      submit-local-key="actions.save"
    />
  </v-form>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import SubmitForm from '@/components/forms/SubmitForm'

export default {
  name: 'UserPrivacyForm',
  mixins: [FormHelpers],
  components: { SubmitForm },
  props: {
    user: Object,
    redirectTo: {
      type: String,
      default: '/'
    },
    goBackBtn: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      data: {
        public_profile: (this.user || {}).public_profile,
        public_outdoor_ascents: (this.user || {}).public_outdoor_ascents,
        public_indoor_ascents: (this.user || {}).public_indoor_ascents
      }
    }
  },

  methods: {
    submit: function () {
      this.submitOverlay = true

      CurrentUserApi
        .update(this.data)
        .then(() => {
          this.$router.push(this.redirectTo)
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
