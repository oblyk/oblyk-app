<template>
  <v-form @submit.prevent="submit()">
    <div v-if="!isEditingForm()">
      <div v-if="selectedUser === null">
        <p class="mb-2">
          {{ $t('components.gymAdministrator.guest_by_email') }}
        </p>

        <v-text-field
          v-model="data.requested_email"
          outlined
          required
          clearable
          :label="$t('models.user.email')"
        />
      </div>

      <div
        v-if="data.requested_email === null || data.requested_email === ''"
        class="mb-7"
      >
        <p
          v-if="selectedUser === null"
          class="mb-2"
        >
          <v-chip class="font-weight-bold">
            {{ $t('common.or') }}
          </v-chip>
          {{ $t('components.gymAdministrator.guest_by_user') }}
        </p>

        <user-search-form
          v-if="selectedUser === null"
          :callback="searchUser"
          :linkable-result="false"
        />
        <div
          v-else
          class="d-flex align-center"
        >
          <user-small-card
            :user="selectedUser"
            :linkable="false"
            :subscribable="false"
            class="flex-grow-1"
            small
          />
          <v-btn
            icon
            @click="clearUser"
          >
            <v-icon>
              {{ mdiClose }}
            </v-icon>
          </v-btn>
        </div>
      </div>
    </div>

    <gym-roles-input v-model="data.roles" />

    <v-checkbox
      v-model="data.email_report"
      :label="$t('models.gymAdministrator.email_report', { name: gym.name })"
    />

    <close-form />
    <submit-form
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
    />
  </v-form>
</template>

<script>
import { mdiClose } from '@mdi/js'
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import GymAdministratorApi from '~/services/oblyk-api/GymAdministratorApi'
import CloseForm from '@/components/forms/CloseForm'
import GymRolesInput from '~/components/forms/GymRolesInput'
import UserSearchForm from '~/components/users/forms/UserSearchForm'
import UserSmallCard from '~/components/users/UserSmallCard'

export default {
  name: 'GymAdministratorForm',
  components: { UserSmallCard, UserSearchForm, GymRolesInput, CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    },
    gymAdministrator: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      selectedUser: null,
      data: {
        id: this.gymAdministrator?.id,
        requested_email: this.gymAdministrator?.requested_email || null,
        gym_id: this.gym.id,
        roles: this.gymAdministrator?.roles || [],
        email_report: this.gymAdministrator?.email_report === null ? true : this.gymAdministrator?.email_report
      },
      roles: [
        { text: this.$t('models.role.analyste'), value: 'analyste' },
        { text: this.$t('models.role.opener'), value: 'opener' },
        { text: this.$t('models.role.chief_opener'), value: 'chief_opener' },
        { text: this.$t('models.role.administrator'), value: 'administrator' }
      ],

      mdiClose
    }
  },

  methods: {
    searchUser (user) {
      this.selectedUser = user
    },

    clearUser () {
      this.selectedUser = null
    },

    submit () {
      this.submitOverlay = true
      if (!this.isEditingForm() && this.selectedUser !== null) {
        this.data.user_uuid = this.selectedUser.uuid
      }
      const promise = (this.isEditingForm()) ? new GymAdministratorApi(this.$axios, this.$auth).update(this.data) : new GymAdministratorApi(this.$axios, this.$auth).create(this.data)

      promise
        .then(() => {
          this.$router.push(`${this.gym.adminPath}/administrators`)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymAdministrator')
        })
        .finally(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
