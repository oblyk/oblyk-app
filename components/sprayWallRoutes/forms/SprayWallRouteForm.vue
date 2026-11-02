<template>
  <v-form
    v-if="!loadingLevels"
    @submit.prevent="submit()"
  >
    <p class="mb-0">
      {{ $t('models.sprayWallRoutes.boulderContents', { count: sprayWallRouteHolds.length }) }}
    </p>
    <div class="mb-6">
      <v-chip style="border-style: solid; border-width: 2px; border-color: #FFFF00">
        {{ $tc('models.sprayWallRoutes.typeCounts.strats', holdTypesCount.start, { count:holdTypesCount.start }) }}
      </v-chip>
      <v-chip style="border-style: solid; border-width: 2px; border-color: rgb(255, 255, 255)">
        {{ $tc('models.sprayWallRoutes.typeCounts.middles', holdTypesCount.middle, { count:holdTypesCount.middle }) }}
      </v-chip>
      <v-chip style="border-style: solid; border-width: 2px; border-color: #00E676">
        {{ $tc('models.sprayWallRoutes.typeCounts.foot', holdTypesCount.foot, { count:holdTypesCount.foot }) }}
      </v-chip>
      <v-chip style="border-style: solid; border-width: 2px; border-color: #FF1744">
        {{ $tc('models.sprayWallRoutes.typeCounts.tops', holdTypesCount.top, { count:holdTypesCount.top }) }}
      </v-chip>
    </div>
    <v-text-field
      v-model="data.name"
      :prepend-icon="mdiAlphabetLatin"
      outlined
      required
      class="required-field"
      :label="$t('models.sprayWallRoutes.name')"
    />
    <gym-route-level-dot-input
      v-model="data.level_index"
      :levels="gymLevels.spray_wall"
      :change-callback="() => { return false }"
    />
    <gym-route-sub-level-input
      v-model="data.sub_level"
      :gym-levels="gymLevels"
      climbing-type="spray_wall"
    />
    <v-text-field
      v-if="gymLevels['spray_wall'].grade_system !== null"
      v-model="data.grade_text"
      outlined
      :prepend-icon="mdiExponent"
      class="required-field"
      :required="gymLevels['spray_wall'].grade_system !== null"
      :label="$t('models.gymRoute.grade')"
    />
    <v-select
      v-model="data.foot_authorization"
      outlined
      :prepend-icon="mdiFootPrint"
      :label="$t('models.sprayWallRoutes.foot_authorization')"
      :items="footAuthorizations"
      clearable
      item-text="text"
      item-value="value"
    />
    <indoor-climbing-styles-input
      v-model="data.styles"
      climbing-type="spray_wall"
      :gym="gym"
    />
    <v-textarea
      v-model="data.comment"
      hide-details
      :label="$t('models.sprayWallRoutes.commentaire')"
      outlined
    />
    <div class="text-center mt-3">
      <v-btn
        :loading="savingRoute"
        color="deep-purple accent-3"
        elevation="0"
        dark
        @click="submit()"
      >
        {{ isEditingForm() ? $t('actions.edit') : $t('actions.add') }}
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import { mdiFootPrint, mdiAlphabetLatin, mdiExponent } from '@mdi/js'
import { FormHelpers } from '~/mixins/FormHelpers'
import OblykApi from '~/services/oblyk-api/OblykApi'
import IndoorClimbingStylesInput from '~/components/forms/IndoorClimbingStyleInput'
import GymRouteSubLevelInput from '~/components/forms/GymRouteSubLevelInput'
import GymRouteLevelDotInput from '~/components/forms/GymRouteLevelDotInput'

export default {
  name: 'SprayWallRouteForm',
  components: { GymRouteLevelDotInput, GymRouteSubLevelInput, IndoorClimbingStylesInput },
  mixins: [FormHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    },
    sprayWall: {
      type: Object,
      required: true
    },
    sprayWallRoute: {
      type: Object,
      default: null
    },
    sprayWallRouteHolds: {
      type: Array,
      default: null
    }
  },

  data () {
    return {
      loadingLevels: true,
      savingRoute: false,
      gymLevels: {
        sport_climbing: null,
        bouldering: null,
        pan: null,
        spray_wall: null
      },
      data: {
        id: this.sprayWallRoute?.id,
        name: this.sprayWallRoute?.name,
        comment: this.sprayWallRoute?.comment,
        level_index: this.sprayWallRoute?.level_index,
        sub_level: this.sprayWallRoute?.sub_level,
        grade_text: this.sprayWallRoute?.grade_text,
        foot_authorization: this.sprayWallRoute?.foot_authorization,
        styles: this.sprayWallRoute?.styles || [],
        spray_wall_route_holds_attributes: this.sprayWallRouteHolds.map((hold) => {
          return {
            spray_wall_hold_id: hold.id,
            hold_type: hold.hold_type,
            number: hold.number
          }
        })
      },
      footAuthorizations: [
        {
          text: 'Pieds imposés (les mains ne sont pas des pieds)',
          value: 'foot_imposed'
        },
        {
          text: 'No foot',
          value: 'no_foot'
        },
        {
          text: 'Petites prises autorisés (les cachous)',
          value: 'free_cachou'
        },
        {
          text: 'Pied libre',
          value: 'free_foot'
        }
      ],

      mdiFootPrint,
      mdiAlphabetLatin,
      mdiExponent
    }
  },

  computed: {
    holdTypesCount () {
      const counts = {
        start: 0,
        middle: 0,
        foot: 0,
        top: 0
      }
      for (const hold of this.sprayWallRouteHolds) {
        if (hold.hold_type === 'start') { counts.start += 1 }
        if (hold.hold_type === 'middle' || hold.hold_type === undefined) { counts.middle += 1 }
        if (hold.hold_type === 'foot') { counts.foot += 1 }
        if (hold.hold_type === 'top') { counts.top += 1 }
      }
      return counts
    }
  },

  watch: {
    sprayWallRouteHolds: {
      handler () {
        this.data.spray_wall_route_holds_attributes = this.sprayWallRouteHolds.map((hold) => {
          return {
            spray_wall_hold_id: hold.id,
            hold_type: hold.hold_type,
            number: hold.number
          }
        })
      },
      deep: true
    }
  },

  mounted () {
    this.getGymLevels()
  },

  methods: {
    submit () {
      this.savingRoute = true
      const baseUrl = `/gyms/${this.gym.id}/spray_walls/${this.sprayWall.id}/spray_wall_routes`
      const promise = this.isEditingForm()
        ? new OblykApi(this.$axios, this.$auth).put(`${baseUrl}/${this.sprayWallRoute.id}`, { spray_wall_route: this.data })
        : new OblykApi(this.$axios, this.$auth).post(baseUrl, { spray_wall_route: this.data })

      promise
        .then((resp) => {
          this.$router.push(`${this.sprayWall.app_path}?spray_wall_route=${resp.data.id}`)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'sprayWallRoute')
        })
        .finally(() => {
          this.savingRoute = false
        })
    },

    getGymLevels () {
      this.loadingLevels = true
      new OblykApi(this.$axios, this.$auth)
        .get(`/gyms/${this.gym.id}/gym_levels`)
        .then((resp) => {
          this.gymLevels = {
            sport_climbing: null,
            bouldering: null,
            pan: null,
            spray_wall: null
          }
          for (const level of resp.data) {
            this.gymLevels[level.climbing_type] = level
          }
        }).finally(() => {
          this.loadingLevels = false
        })
    }
  }
}
</script>
