<template>
  <div>
    <v-form @submit.prevent="submit()">
      <v-row>
        <v-col cols="3" md="2" lg="2">
          <v-text-field
            v-model="data.order"
            outlined
            :label="$t('models.gymSector.order')"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="data.name"
            outlined
            :label="$t('models.gymSector.name')"
            required
          />
        </v-col>
      </v-row>

      <v-text-field
        v-model="data.height"
        outlined
        type="number"
        min="0"
        :label="$t('models.gymSector.height')"
        required
      />

      <div v-if="gymSpace.anchor">
        <p class="mb-1 text--disabled pl-1">
          {{ $t('models.gymSector.anchor_number_explain') }} :
        </p>
        <v-row>
          <v-col>
            <v-text-field
              v-model="data.min_anchor_number"
              outlined
              type="number"
              min="0"
              :label="$t('models.gymSector.min_anchor_number')"
              required
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="data.max_anchor_number"
              outlined
              type="number"
              min="0"
              :label="$t('models.gymSector.max_anchor_number')"
              required
            />
          </v-col>
        </v-row>
      </div>

      <markdown-input
        v-model="data.description"
        :label="$t('models.gymSector.description')"
      />

      <v-checkbox
        v-model="data.can_be_more_than_one_pitch"
        :label="$t('models.gymSector.can_be_more_than_one_pitch')"
      />

      <v-subheader>
        {{ $t('components.gymSector.resultingParametersOf', { name: gymSpace.name }) }}
      </v-subheader>
      <v-divider class="mb-5" />
      <v-select
        v-model="data.climbing_type"
        :items="climbingGymList"
        item-text="text"
        item-value="value"
        :label="$t('models.gymSector.climbing_type')"
        outlined
      />

      <close-form />
      <submit-form
        :overlay="submitOverlay"
        :submit-local-key="submitText()"
      />
    </v-form>
  </div>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import CloseForm from '@/components/forms/CloseForm'
import SubmitForm from '@/components/forms/SubmitForm'
import GymSectorApi from '~/services/oblyk-api/GymSectorApi'
import MarkdownInput from '@/components/forms/MarkdownInput'

export default {
  name: 'GymSectorForm',
  components: { MarkdownInput, SubmitForm, CloseForm },
  mixins: [FormHelpers],
  props: {
    gymSpace: {
      type: Object,
      default: null
    },
    gymSector: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      redirectTo: null,
      data: {
        id: this.gymSector?.id,
        name: this.gymSector?.name,
        order: this.gymSector?.order || (this.gymSpace.last_sector_order + 1),
        min_anchor_number: this.gymSector?.min_anchor_number,
        max_anchor_number: this.gymSector?.max_anchor_number,
        height: this.gymSector?.height,
        description: this.gymSector?.description,
        can_be_more_than_one_pitch: this.gymSector?.can_be_more_than_one_pitch,
        climbing_type: this.gymSector?.climbing_type || this.gymSpace.climbing_type,
        gym_space_id: this.gymSpace.id,
        gym_id: this.gymSpace.gym.id
      },
      climbingGymList: [
        { text: this.$t('models.climbs.sport_climbing'), value: 'sport_climbing' },
        { text: this.$t('models.climbs.bouldering'), value: 'bouldering' },
        { text: this.$t('models.climbs.fun_climbing'), value: 'fun_climbing' },
        { text: this.$t('models.climbs.training_space'), value: 'training_space' },
        { text: this.$t('models.climbs.pan'), value: 'pan' }
      ]
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')
  },

  methods: {
    submit () {
      this.overlay = true
      const promise = (this.isEditingForm()) ? new GymSectorApi(this.$axios, this.$auth).update(this.data) : new GymSectorApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          if (this.redirectTo) {
            if (this.redirectTo === 'add-route') {
              this.$router.push(`${this.gymSpace.path}/sectors/${resp.data.id}/routes/new`)
            } else {
              this.$router.push(this.redirectTo)
            }
          } else {
            this.$router.push(this.gymSpace.path)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymSector')
        }).then(() => {
          this.overlay = false
        })
    }
  }
}
</script>
