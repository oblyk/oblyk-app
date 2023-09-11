<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-if="!isEditingForm()"
      v-model="data.number_of_routes"
      type="number"
      outlined
      hide-details
      :label="$t('models.contestRouteGroup.number_of_routes', { style: $t(`models.climbs.${contestStage.climbing_type}`).toLowerCase() })"
    />

    <div class="mb-3 mt-3 border rounded-sm pa-2">
      <p class="mb-2">
        À qui sont destiné ces {{ data.number_of_routes }} {{ $t(`models.climbs.${contestStage.climbing_type}`).toLowerCase() }}s ?
      </p>
      <v-radio-group
        v-model="data.genre_type"
        class="mt-0 mb-n4"
      >
        <v-radio value="unisex">
          <template #label>
            {{ $t(`models.climbs.${contestStage.climbing_type}`).toLowerCase() }}s <strong class="mx-1">hommes et femmes</strong>
          </template>
        </v-radio>
        <v-radio value="male">
          <template #label>
            {{ $t(`models.climbs.${contestStage.climbing_type}`).toLowerCase() }}s <strong class="mx-1">hommes</strong>
          </template>
        </v-radio>
        <v-radio value="female">
          <template #label>
            {{ $t(`models.climbs.${contestStage.climbing_type}`).toLowerCase() }}s <strong class="mx-1">femmes</strong>
          </template>
        </v-radio>
      </v-radio-group>
    </div>

    <div class="mb-3 border rounded-sm pa-2">
      <p class="mb-1">
        Ces {{ data.number_of_routes }} {{ $t(`models.climbs.${contestStage.climbing_type}`).toLowerCase() }}s sont commun(e)s à qu'elles catégories ?
      </p>
      <div
        v-for="(category, categoryIndex) in categories"
        :key="`category-index-${categoryIndex}`"
        class="pl-2"
      >
        <v-checkbox
          v-model="data.contest_category_ids"
          hide-details
          :label="category.name"
          :value="category.id"
          class="mr-2"
          type="time"
        />
      </div>
    </div>

    <v-checkbox
      v-if="waveableCategories"
      v-model="data.waveable"
      hide-details
      :label="$t('models.contestRouteGroup.waveable')"
    />

    <v-row
      v-if="!data.waveable"
      class="mt-2"
    >
      <v-col cols="6">
        <div class="d-flex">
          <date-picker-menu-input
            v-if="!contest.one_day_event"
            v-model="data.start_date"
            :label="$t('models.contestRouteGroup.start_time')"
          />
          <v-text-field
            v-model="data.start_time"
            outlined
            class="ml-1"
            :label="$t('models.contestRouteGroup.start_time')"
            type="time"
          />
        </div>
      </v-col>
      <v-col cols="6">
        <div class="d-flex">
          <date-picker-menu-input
            v-if="!contest.one_day_event"
            v-model="data.end_date"
            class="mr-2"
            :label="$t('models.contestRouteGroup.end_time')"
          />
          <v-text-field
            v-model="data.end_time"
            outlined
            class="ml-1"
            :label="$t('models.contestRouteGroup.end_time')"
            type="time"
          />
        </div>
      </v-col>
    </v-row>
    <div
      v-else
      class="mb-3 mt-4"
    >
      <div
        v-for="(wave, waveIndex) in data.contest_time_blocks_attributes"
        :key="`wave-index-${waveIndex}`"
        class="mb-3 mt-2 border rounded pa-3"
      >
        <p class="mb-3">
          {{ wave.name }} :
        </p>
        <div class="d-flex">
          <date-picker-menu-input
            v-if="!contest.one_day_event"
            v-model="data.contest_time_blocks_attributes[waveIndex].start_date"
            dense
            hide-details
            :label="$t('models.contestRouteGroup.end_time')"
          />
          <v-text-field
            v-model="data.contest_time_blocks_attributes[waveIndex].start_time"
            outlined
            dense
            hide-details
            :label="$t('models.contestRouteGroup.start_time')"
            class="pl-2 mr-4"
            type="time"
          />
          <date-picker-menu-input
            v-if="!contest.one_day_event"
            v-model="data.contest_time_blocks_attributes[waveIndex].end_date"
            dense
            hide-details
            class="ml-4"
            :label="$t('models.contestRouteGroup.end_time')"
          />
          <v-text-field
            v-model="data.contest_time_blocks_attributes[waveIndex].end_time"
            outlined
            dense
            hide-details
            clearable
            class="ml-2"
            :label="$t('models.contestRouteGroup.end_time')"
            type="time"
          />
        </div>
      </div>
    </div>

    <submit-form
      :go-back-btn="false"
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
    />
  </v-form>
</template>
<script>
import { FormHelpers } from '~/mixins/FormHelpers'
import { DateHelpers } from '~/mixins/DateHelpers'
import SubmitForm from '~/components/forms/SubmitForm'
import ContestRouteGroupApi from '~/services/oblyk-api/ContestRouteGroupApi'
import ContestRouteGroup from '~/models/ContestRouteGroup'
import ContestWaveApi from '~/services/oblyk-api/ContestWaveApi'
import ContestWave from '~/models/ContestWave'
import ContestCategoryApi from '~/services/oblyk-api/ContestCategoryApi'
import ContestCategory from '~/models/ContestCategory'
import DatePickerMenuInput from '~/components/forms/DatePickerMenuInput.vue'

export default {
  name: 'ContestRouteGroupForm',
  components: { DatePickerMenuInput, SubmitForm },
  mixins: [FormHelpers, DateHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    },
    contest: {
      type: Object,
      required: true
    },
    contestStage: {
      type: Object,
      required: true
    },
    contestStageStep: {
      type: Object,
      required: true
    },
    contestRouteGroup: {
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
      waves: [],
      categories: [],
      data: {
        id: this.contestRouteGroup?.id,
        number_of_routes: null,
        genre_type: this.contestRouteGroup?.genre_type,
        waveable: this.contestRouteGroup?.waveable,
        start_time: this.contestRouteGroup?.start_time,
        end_time: this.contestRouteGroup?.end_time,
        start_date: this.contestRouteGroup?.start_date || this.contest?.start_date,
        end_date: this.contestRouteGroup?.end_date || this.contest?.end_date,
        number_participants_for_next_step: this.contestRouteGroup?.number_participants_for_next_step || this.contestStageStep?.default_participants_for_next_step,
        gym_id: this.gym.id,
        contest_id: this.contest.id,
        contest_stage_id: this.contestStage.id,
        contest_stage_step_id: this.contestStageStep.id,
        contest_category_ids: this.contestRouteGroup?.contest_category_ids || [],
        contest_time_blocks_attributes: []
      }
    }
  },

  computed: {
    waveableCategories () {
      for (const category of this.categories) {
        if (category.waveable === true) { return true }
      }
      return false
    }
  },

  async mounted () {
    await this.getWaves()
    await this.getCategories()

    if (!this.isEditingForm()) {
      for (const wave of this.waves) {
        const contestTimeBlock = this.data.contest_time_blocks_attributes.find(timeBlock => timeBlock.contest_wave_id === wave.id)
        this.data.contest_time_blocks_attributes.push({
          id: contestTimeBlock?.id,
          name: wave.name,
          contest_wave_id: wave.id,
          start_time: contestTimeBlock?.start_time,
          end_time: contestTimeBlock?.end_time,
          start_date: contestTimeBlock?.start_date || this.contest.start_date,
          end_date: contestTimeBlock?.end_date || this.contest.end_date
        })
      }
    } else {
      for (const timeBlock of this.contestRouteGroup.contest_time_blocks) {
        this.data.contest_time_blocks_attributes.push({
          id: timeBlock.id,
          name: timeBlock.name,
          contest_wave_id: timeBlock.contest_wave_id,
          start_time: this.humanizeDate(timeBlock.start_time, 'TIME_SIMPLE'),
          end_time: this.humanizeDate(timeBlock.end_time, 'TIME_SIMPLE'),
          start_date: timeBlock.start_date,
          end_date: timeBlock.end_date
        })
      }
    }

    if (this.data.start_time) {
      this.data.start_time = this.humanizeDate(this.data.start_time, 'TIME_SIMPLE')
    }
    if (this.data.end_time) {
      this.data.end_time = this.humanizeDate(this.data.end_time, 'TIME_SIMPLE')
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new ContestRouteGroupApi(this.$axios, this.$auth).update(this.data) : new ContestRouteGroupApi(this.$axios, this.$auth).create(this.data)
      promise
        .then((resp) => {
          const contestRouteGroup = new ContestRouteGroup({ attributes: resp.data })
          if (this.callback) {
            this.callback(contestRouteGroup)
          } else {
            this.$router.push(contestRouteGroup.adminPath)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'contestRouteGroup')
        }).then(() => {
          this.submitOverlay = false
        })
    },

    async getWaves () {
      await new ContestWaveApi(this.$axios, this.$auth)
        .all(this.contest.gym_id, this.contest.id)
        .then((resp) => {
          this.waves = []
          for (const wave of resp.data) {
            this.waves.push(new ContestWave({ attributes: wave }))
          }
        })
    },

    async getCategories () {
      await new ContestCategoryApi(this.$axios, this.$auth)
        .all(this.contest.gym_id, this.contest.id)
        .then((resp) => {
          this.categories = []
          for (const category of resp.data) {
            this.categories.push(new ContestCategory({ attributes: category }))
          }
        })
    }
  }
}
</script>
