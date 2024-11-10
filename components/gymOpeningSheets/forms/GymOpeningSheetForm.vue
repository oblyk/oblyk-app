<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.title"
      outlined
      :label="$t('models.gymOpeningSheet.title')"
      class="required-field"
      required
    />

    <v-textarea
      v-model="data.description"
      outlined
      :label="$t('models.gymOpeningSheet.description')"
    />

    <v-text-field
      v-model="data.number_of_columns"
      outlined
      type="number"
      :label="$t('models.gymOpeningSheet.number_of_columns')"
      class="required-field"
      required
    />

    <div class="border rounded pt-3 px-3 mb-4">
      <p class="mb-1">
        Sélectionnez les secteurs pour votre fiche :
      </p>
      <v-treeview
        v-model="data.gym_sector_ids"
        :items="treeRoutes"
        selectable
        open-on-click
        hoverable
        rounded
      >
        <template #append="{ item }">
          <span
            v-if="item.last_opening_date"
            class="text--disabled"
            :title="humanizeDate(item.last_opening_date)"
          >
            Ouvert {{ dateFromNow(item.last_opening_date) }}
          </span>
        </template>
      </v-treeview>
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
import GymOpeningSheetApi from '~/services/oblyk-api/GymOpeningSheetApi'
import SubmitForm from '@/components/forms/SubmitForm'
import CloseForm from '@/components/forms/CloseForm'
import { DateHelpers } from '~/mixins/DateHelpers'

export default {
  name: 'GymOpeningSheetForm',
  components: {
    CloseForm,
    SubmitForm
  },
  mixins: [FormHelpers, DateHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    },
    treeRoutes: {
      type: Array,
      default: null
    },
    gymOpeningSheet: {
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
        id: this.gymOpeningSheet?.id,
        title: this.gymOpeningSheet?.title,
        description: this.gymOpeningSheet?.description,
        number_of_columns: this.gymOpeningSheet?.number_of_columns || 8,
        gym_id: this.gym.id,
        gym_space_id: null,
        gym_sector_ids: []
      }
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new GymOpeningSheetApi(this.$axios, this.$auth).update(this.data) : new GymOpeningSheetApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          if (this.callback) {
            this.callback(resp.data)
          } else {
            this.$router.push(`${this.gym.path}/admins/opening-sheets/${resp.data.id}`)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'GymOpeningSheet')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
