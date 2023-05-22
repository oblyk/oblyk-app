<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.name"
      outlined
      :label="$t('models.gymSpaceGroup.name')"
      class="required-field"
      required
    />

    <v-text-field
      v-model="data.order"
      outlined
      :label="$t('models.gymSpaceGroup.order')"
      class="required-field"
      required
    />

    <div class="mb-6">
      <p class="font-weight-bold mb-1 text-decoration-underline">
        {{ $t('components.gym.spaces') }}
      </p>

      <v-checkbox
        v-for="(gymSpace, gymSpaceIndex) in gym.gym_spaces"
        :key="`gym-space-index-${gymSpaceIndex}`"
        v-model="data.gym_space_ids"
        :label="gymSpace.name"
        :value="gymSpace.id"
        :disabled="gymSpace.gym_space_group_id !== null && gymSpace.gym_space_group_id !== data.id"
        hide-details
      />
    </div>

    <close-form />
    <submit-form
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
    />
  </v-form>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import GymSpaceGroupApi from '~/services/oblyk-api/GymSpaceGroupApi'
import SubmitForm from '@/components/forms/SubmitForm'
import CloseForm from '@/components/forms/CloseForm'

export default {
  name: 'GymSpaceGroupForm',
  components: {
    CloseForm,
    SubmitForm
  },
  mixins: [FormHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    },
    gymSpaceGroup: {
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
        id: this.gymSpaceGroup?.id,
        name: this.gymSpaceGroup?.name,
        order: this.gymSpaceGroup?.order,
        gym_space_ids: this.gymSpaceGroup?.gym_space_ids || [],
        gym_id: this.gym.id
      }
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new GymSpaceGroupApi(this.$axios, this.$auth).update(this.data) : new GymSpaceGroupApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          if (this.callback) {
            this.callback(resp.data)
          } else {
            this.$router.push(`${this.gym.path}/admins/tree-structures`)
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
