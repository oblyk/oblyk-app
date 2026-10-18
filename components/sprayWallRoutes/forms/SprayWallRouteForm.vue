<template>
  <v-form
    v-if="!loadingLevels"
    @submit.prevent="submit()"
  >
    <v-text-field
      v-model="data.name"
      :prepend-icon="mdiAlphabetLatin"
      outlined
      required
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
      v-model="data.note"
      hide-details
      :label="$t('models.sprayWallRoutes.commentaire')"
      outlined
    />
    <div class="text-center mt-3">
      <v-btn
        color="deep-purple accent-3"
        elevation="0"
        dark
        @click="submit()"
      >
        Ajouter
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import { mdiFootPrint, mdiAlphabetLatin } from '@mdi/js'
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
    }
  },

  data () {
    return {
      loadingLevels: true,
      gymLevels: {
        sport_climbing: null,
        bouldering: null,
        pan: null,
        spray_wall: null
      },
      data: {
        id: this.sprayWallRoute?.id,
        name: this.sprayWallRoute?.name,
        level_index: this.sprayWallRoute?.level_index,
        sub_level: this.sprayWallRoute?.sub_level,
        foot_authorization: this.sprayWallRoute?.foot_authorization,
        styles: this.sprayWallRoute?.styles || []
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
      mdiAlphabetLatin
    }
  },

  mounted () {
    this.getGymLevels()
  },

  methods: {
    submit () {
      return true
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
