<template>
  <v-form @submit.prevent="submit()">
    <p>
      <small class="text--disabled">
        {{ $t('common.requiredFields') }}
      </small>
    </p>
    <v-text-field
      outlined
      v-model="data.name"
      required
      :label="`${$t('models.organization.name')} *`"
    />

    <usage-type-input v-model="data.api_usage_type" />

    <v-text-field
      outlined
      v-model="data.address"
      required
      :label="$t('models.organization.address')"
    />

    <v-row>
      <v-col class="col-4">
        <v-text-field
          outlined
          v-model="data.zipcode"
          :label="$t('models.organization.zipcode')"
        />
      </v-col>
      <v-col class="col-8">
        <v-text-field
          outlined
          v-model="data.city"
          :label="$t('models.organization.city')"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col class="col-12 col-md-6">
        <v-text-field
          outlined
          v-model="data.email"
          :label="`${$t('models.organization.email')} *`"
        />
      </v-col>
      <v-col class="col-12 col-md-6">
        <v-text-field
          outlined
          v-model="data.phone"
          :label="$t('models.organization.phone')"
        />
      </v-col>
    </v-row>

    <v-text-field
      outlined
      v-model="data.website"
      :label="$t('models.organization.website')"
    />

    <v-text-field
      outlined
      v-model="data.company_registration_number"
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
import OrganizationApi from '@/services/oblyk-api/OrganizationApi'
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
      required: false
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
    submit: function () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? OrganizationApi.update(this.data) : OrganizationApi.create(this.data)

      promise
        .then((resp) => {
          const organization = new Organization(resp.data)
          this.$router.push(organization.path())
          this.$root.$emit('reloadMyOrganizations')
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
