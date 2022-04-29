<template>
  <v-form @submit.prevent="submit()">
    <p>
      <small class="text--disabled">
        {{ $t('common.requiredFields') }}
      </small>
    </p>
    <v-text-field
      v-model="data.name"
      outlined
      required
      :label="`${$t('models.organization.name')} *`"
    />

    <usage-type-input v-model="data.api_usage_type" />

    <v-text-field
      v-model="data.address"
      outlined
      required
      :label="$t('models.organization.address')"
    />

    <v-row>
      <v-col class="col-4">
        <v-text-field
          v-model="data.zipcode"
          outlined
          :label="$t('models.organization.zipcode')"
        />
      </v-col>
      <v-col class="col-8">
        <v-text-field
          v-model="data.city"
          outlined
          :label="$t('models.organization.city')"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col class="col-12 col-md-6">
        <v-text-field
          v-model="data.email"
          outlined
          :label="`${$t('models.organization.email')} *`"
        />
      </v-col>
      <v-col class="col-12 col-md-6">
        <v-text-field
          v-model="data.phone"
          outlined
          :label="$t('models.organization.phone')"
        />
      </v-col>
    </v-row>

    <v-text-field
      v-model="data.website"
      outlined
      :label="$t('models.organization.website')"
    />

    <v-text-field
      v-model="data.company_registration_number"
      outlined
      required
      :label="$t('models.organization.company_registration_number')"
    />

    <close-form />
    <submit-form
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
    />
  </v-form>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import OrganizationApi from '~/services/oblyk-api/OrganizationApi'
import CloseForm from '@/components/forms/CloseForm'
import Organization from '@/models/Organization'
import UsageTypeInput from '@/components/forms/UsageTypeInput'

export default {
  name: 'OrganizationForm',
  components: { UsageTypeInput, CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    organization: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      data: {
        id: (this.organization || {}).id,
        name: (this.organization || {}).name,
        address: (this.organization || {}).address,
        api_usage_type: (this.organization || {}).api_usage_type,
        zipcode: (this.organization || {}).zipcode,
        city: (this.organization || {}).city,
        email: (this.organization || {}).email,
        phone: (this.organization || {}).phone,
        website: (this.organization || {}).website,
        company_registration_number: (this.organization || {}).company_registration_number
      }
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new OrganizationApi(this.$axios, this.$auth).update(this.data) : new OrganizationApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          const organization = new Organization({ attributes: resp.data })
          this.$router.push(organization.path)
          this.$auth.fetchUser()
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'organization')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
