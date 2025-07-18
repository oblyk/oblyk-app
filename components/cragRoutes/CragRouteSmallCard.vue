<template>
  <div>
    <v-card
      link
      flat
      :to="linkable ? cragRoute.path : null"
    >
      <v-list-item
        :three-line="!small"
        :two-line="small"
      >
        <v-list-item-avatar
          :size="small ? 45 : 70"
          :class="small ? 'mt-1 mb-1' : ''"
        >
          <v-avatar
            :size="small ? 45 : 70"
            tile
          >
            <v-img
              v-if="cragRoute.photo.attachments.picture.attached"
              :src="imageVariant(cragRoute.photo.attachments.picture, { fit: 'crop', height: 100, width: 100 })"
            />
            <v-icon
              v-else
              size="35"
              class="px-1"
            >
              {{ mdiSourceBranch }}
            </v-icon>
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content :class="small ? 'pt-2 pb-0' : ''">
          <v-list-item-title class="font-weight-bold">
            <span
              :class="cragRoute.climbing_type"
              class="climbs-pastille vertical-align-middle"
            >
              <ascent-crag-route-status-icon
                v-if="$auth.loggedIn"
                :crag-route="cragRoute"
              />
              {{ cragRoute.grade_to_s }} -
              {{ cragRoute.name }}
            </span>
          </v-list-item-title>
          <v-list-item-subtitle :class="small ? 'mt-0 mb-3' : 'mt-n3 mb-4'">
            <v-chip
              small
              outlined
              class=""
            >
              <v-icon
                small
                left
              >
                {{ climbIcons[cragRoute.climbing_type] }}
              </v-icon>
              {{ $t(`models.climbs.${cragRoute.climbing_type}`) }}
            </v-chip>
            <v-chip
              v-if="cragRoute.ascents_count > 0"
              small
              outlined
              class=""
            >
              <v-icon
                small
                left
              >
                {{ mdiCheckAll }}
              </v-icon>
              {{ cragRoute.ascents_count }}
            </v-chip>
            {{ cragRoute.Crag.name }}, {{ cragRoute.Crag.city }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import { mdiSourceBranch, mdiCheckAll } from '@mdi/js'
import {
  oblykClimbAid,
  oblykClimbBoulder,
  oblykClimbDeepWater,
  oblykClimbMultiPitch,
  oblykClimbSportClimbing,
  oblykClimbTrad,
  oblykClimbViaFerrata
} from '~/assets/oblyk-icons'
import AscentCragRouteStatusIcon from '@/components/ascentCragRoutes/AscentCragRouteStatusIcon'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'CragRouteSmallCard',
  components: { AscentCragRouteStatusIcon },
  mixins: [ImageVariantHelpers],
  props: {
    cragRoute: {
      type: Object,
      required: true
    },
    linkable: {
      type: Boolean,
      required: false,
      default: true
    },
    small: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      climbIcons: {
        aid_climbing: oblykClimbAid,
        bouldering: oblykClimbBoulder,
        deep_water: oblykClimbDeepWater,
        multi_pitch: oblykClimbMultiPitch,
        sport_climbing: oblykClimbSportClimbing,
        trad_climbing: oblykClimbTrad,
        via_ferrata: oblykClimbViaFerrata
      },

      mdiSourceBranch,
      mdiCheckAll
    }
  }
}
</script>
