<template>
  <div>
    <!-- By color or by grade -->
    <p class="mb-1 mt-1">
      {{ $t('components.ascentGymBulk.addMyAscents') }}
    </p>
    <div>
      <v-sheet
        class="pa-2 rounded-sm activable-v-sheet d-inline-block mr-2"
        :class="data.ascentsBy === 'grade' ? '--active' : '--inactive'"
        @click="data.ascentsBy = 'grade'"
        v-html="$t('components.ascentGymBulk.byGrade')"
      />
      <v-sheet
        class="pa-2 rounded-sm activable-v-sheet d-inline-block mr-2"
        :class="data.ascentsBy === 'color' ? '--active' : '--inactive'"
        @click="data.ascentsBy = 'color'"
        v-html="$t('components.ascentGymBulk.byColor')"
      />
    </div>

    <div
      v-if="data.ascentsBy === 'color'"
      class="mt-4"
    >
      <p class="mb-1" v-html="$t('components.ascentGymBulk.colorOrder')" />
      <color-system-input
        v-model="colorsSystemId"
        :gym-id="gym.id"
        :callback="selectedColorSystem"
      />
    </div>

    <!-- Climbing type -->
    <div
      v-if="gym.climbableTypes.length > 1"
      class="my-4"
    >
      <p class="mb-1">
        {{ $t('components.logBook.climbingType') }} ?
      </p>
      <v-sheet
        v-for="(climbingStyle, climbingStyleIndex) in gym.climbableTypes"
        :key="`climbing-style-index-${climbingStyleIndex}`"
        class="pa-2 rounded-sm activable-v-sheet d-inline-block mr-2"
        :class="data.climbingType === climbingStyle ? '--active' : '--inactive'"
        @click="data.climbingType = climbingStyle"
      >
        {{ $t(`models.climbs.${climbingStyle}`) }}
      </v-sheet>
    </div>

    <p class="mb-3 mt-5">
      {{ $t('components.ascentGymBulk.addAscentBy.title', { ascentsBy: $t(`components.ascentGymBulk.addAscentBy.${data.ascentsBy}`) }) }}
    </p>
    <v-sheet
      v-for="(ascent, ascentIndex) in data.ascents"
      :key="`ascent-index-${ascentIndex}`"
    >
      <v-row>
        <v-col
          cols="3"
          class="pr-0"
        >
          <v-select
            v-model="ascent.quantity"
            outlined
            hide-details
            :items="Array.from({ length: 30 }, (_, i) => i + 1)"
            :label="$t('models.ascentGymRoute.quantity')"
          />
        </v-col>
        <v-col class="px-1">
          <v-text-field
            v-if="data.ascentsBy === 'grade'"
            v-model="ascent.grade"
            outlined
            hide-details
            type="text"
            :label="$t('models.ascentGymRoute.grade')"
          />
          <div
            v-if="data.ascentsBy === 'color'"
            class="text-center pt-3"
          >
            <color-system-line-input
              v-if="colorsSystem != null"
              v-model="ascent.color_system_line_id"
              :colors-system="colorsSystem"
            />
            <p
              v-else
              class="font-italic mb-0"
            >
              {{ $t('components.ascentGymBulk.waiteColor') }}
            </p>
          </div>
        </v-col>
        <v-col
          cols="2"
          class="pl-0 pt-5 text-center"
        >
          <ascent-status-icon-input v-model="ascent.ascent_status" />
        </v-col>
      </v-row>
    </v-sheet>

    <div class="text-right mt-2">
      <v-btn
        v-if="data.ascents.length > 1"
        text
        @click="removeAscent"
      >
        <v-icon>{{ mdiMinus }}</v-icon>
      </v-btn>
      <v-btn
        text
        :disabled="data.ascentsBy === 'color' && colorsSystem === null"
        color="primary"
        @click="addAscent"
      >
        <v-icon left>
          {{ mdiPlus }}
        </v-icon>
        {{ $t('actions.addAAscents') }}
      </v-btn>
    </div>

    <!-- Height -->
    <div
      v-if="keepDefaultHeight"
      class="mb-1 mt-5 pl-1"
    >
      {{ $t('components.ascentGymBulk.defaultHeight', { climbingType: $t(`models.climbs.${data.climbingType}`), height: height }) }}
      <v-btn
        x-small
        text
        @click="keepDefaultHeight = false"
      >
        {{ $t('actions.change') }}
      </v-btn>
    </div>
    <div
      v-if="!keepDefaultHeight"
      class="mt-5 mb-5"
    >
      <p class="mb-2">
        {{ $t('components.ascentGymBulk.pitchHeight') }}
      </p>
      <div>
        <v-text-field
          v-model="height"
          outlined
          hide-details
          type="number"
          :label="$t('models.cragRoute.height')"
        />
      </div>
    </div>

    <!-- Realised at -->
    <div
      v-if="releasedAtIsToday"
      class="mb-3 mt-1 pl-1"
    >
      {{ $t('components.ascentGymBulk.ascentToday') }}
      <v-btn
        x-small
        text
        @click="releasedAtIsToday = false"
      >
        {{ $t('actions.change') }}
      </v-btn>
    </div>
    <div
      v-if="!releasedAtIsToday"
      class="mt-5 mb-5"
    >
      <p class="mb-2">
        {{ $t('models.ascentGymRoute.released_at') }}
      </p>
      <div>
        <date-picker-input
          v-model="data.released_at"
          :icon="mdiCalendar"
          :hide-details="true"
        />
      </div>
    </div>

    <!-- Session description -->
    <v-textarea
      v-model="data.description"
      hide-details
      :label="$t('models.climbingSession.description')"
      outlined
    />

    <div class="text-right mt-3">
      <v-btn
        v-if="closeAscentModal"
        text
        elevation="0"
        @click="closeAscentModal"
      >
        {{ $t('actions.close') }}
      </v-btn>
      <v-btn
        :loading="adding"
        color="primary"
        elevation="0"
        @click="submit"
      >
        {{ $t('actions.add') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mdiCalendar, mdiMinus, mdiPlus } from '@mdi/js'
import AscentStatusIconInput from '~/components/forms/AscentStatusIconInput.vue'
import DatePickerInput from '~/components/forms/DatePickerInput.vue'
import AscentGymRouteApi from '~/services/oblyk-api/AscentGymRouteApi'
import ColorSystemInput from '~/components/forms/ColorSystemInput.vue'
import ColorSystemLineInput from '~/components/forms/ColorSystemLineInput.vue'
import { DateHelpers } from '~/mixins/DateHelpers'

export default {
  name: 'AscentGymBulkForm',
  components: {
    ColorSystemLineInput,
    ColorSystemInput,
    AscentStatusIconInput,
    DatePickerInput
  },
  mixins: [DateHelpers],

  props: {
    gym: {
      type: Object,
      required: true
    },
    callback: {
      type: Function,
      default: null
    },
    closeAscentModal: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      adding: false,
      releasedAtModal: false,
      height: null,
      colorsSystem: null,
      colorsSystemId: null,
      releasedAtIsToday: true,
      keepDefaultHeight: true,
      data: {
        ascentsBy: 'grade',
        climbingType: this.gym.climbableTypes[0],
        description: null,
        released_at: this.ISODateToday(),
        ascents: [
          { height: null, grade: null, color_system_line_id: null, quantity: 1, ascent_status: 'sent' }
        ]
      },

      mdiPlus,
      mdiMinus,
      mdiCalendar
    }
  },

  computed: {
    haveSpaces () {
      return this.gym.gym_spaces.length > 0
    }
  },

  watch: {
    'data.climbingType' () {
      this.height = this.data.climbingType === 'sport_climbing' ? 10 : 4
    },

    height () {
      for (const ascent of this.data.ascents) {
        ascent.height = this.height
      }
    }
  },

  mounted () {
    this.height = this.gym.climbableTypes[0] === 'sport_climbing' ? 10 : 4
    this.intiByPreferences()
  },

  methods: {
    clickOnBtn () {
      if (this.haveSpaces) {
        this.$router.push(this.gym.firstSpacePath)
      } else {
        this.ascentsModal = true
      }
    },

    addAscent () {
      this.data.ascents.push({
        height: this.height,
        grade: null,
        color_system_line_id: null,
        quantity: 1,
        ascent_status: 'sent'
      })
    },

    removeAscent () {
      if (this.data.ascents.length > 1) {
        this.data.ascents.pop()
      }
    },

    selectedColorSystem (colorsSystem) {
      this.colorsSystem = colorsSystem
    },

    submit () {
      this.adding = true
      new AscentGymRouteApi(this.$axios, this.$auth)
        .createBulk({
          ascents_by: this.data.ascentsBy,
          climbing_type: this.data.climbingType,
          gym_id: this.gym.id,
          description: this.data.description,
          released_at: this.data.released_at,
          ascents: this.data.ascents
        })
        .then(() => {
          this.ascentsModal = false
          if (this.closeAscentModal) {
            this.closeAscentModal()
          }
          this.callback()
          this.$root.$emit('reloadClimbingSession')
          this.savePreferences()
          this.reset()
          this.intiByPreferences()
        })
        .finally(() => {
          this.adding = false
        })
    },

    reset () {
      this.releasedAtModal = false
      this.height = null
      this.colorsSystem = null
      this.colorsSystemId = null
      this.releasedAtIsToday = true
      this.keepDefaultHeight = true
      this.data = {
        ascentsBy: 'grade',
        climbingType: this.gym.climbableTypes[0],
        description: null,
        released_at: this.ISODateToday(),
        ascents: [
          { height: null, grade: null, color_system_line_id: null, quantity: 1, ascent_status: 'sent' }
        ]
      }
    },

    savePreferences () {
      localStorage.setItem(
        `gym-${this.gym.id}-preferences`,
        JSON.stringify({
          ascentsBy: this.data.ascentsBy,
          climbingType: this.data.climbingType,
          colorsSystemId: this.data.colorsSystemId,
          height: this.height
        })
      )
    },

    intiByPreferences () {
      const preferences = JSON.parse(localStorage.getItem(`gym-${this.gym.id}-preferences`))

      if (preferences) {
        this.data.ascentsBy = preferences.ascentsBy
        this.data.climbingType = preferences.climbingType
        this.data.colorsSystemId = preferences.colorsSystemId
        this.data.height = preferences.height
      }
    }
  }
}
</script>
