<template>
  <v-simple-table
    dense
    class="crags-table"
  >
    <template #default>
      <thead>
        <tr>
          <th class="text-left">
            {{ $t('components.cragsTable.crags') }}
          </th>
          <th class="text-center" :title="$t('components.cragsTable.orientations')">
            <v-icon small>
              {{ mdiCompass }}
            </v-icon>
          </th>
          <th
            v-if="havingCenter"
            class="text-center"
            :title="$t('components.cragsTable.distanceTitle')"
          >
            <v-icon small>
              {{ mdiMapMarkerDistance }}
            </v-icon>
          </th>
          <th class="text-center" :title="$t('components.cragsTable.approachTimeTitle')">
            <v-icon small>
              {{ mdiWalk }}
            </v-icon>
          </th>
          <th class="text-center" :title="$t('components.cragsTable.favorableSeasonsTitle')">
            <v-icon small>
              {{ mdiLeafMaple }}
            </v-icon>
          </th>
          <th
            v-for="(grade, gradeIndex) in reduceGradeWithoutWeightings"
            :key="`grade-index-${gradeIndex}`"
            class="text-center crags-table-grade-cell"
            :style="`background-color: ${gradeValueToColor(grade.value, 0.45)}`"
          >
            {{ grade.text }}
          </th>
          <th class="text-center">
            {{ $t('components.cragsTable.lines') }}
          </th>
          <th v-if="$auth.loggedIn && callbackFunction" />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(cragData, index) in cragsData"
          :key="`crag-data-index-${index}`"
        >
          <td class="text-no-wrap">
            <nuxt-link
              :to="toCragObject(cragData.crag).path"
              class="mr-2"
            >
              {{ cragData.crag.name }}
            </nuxt-link>
            <climbing-style-icon
              v-for="(climbingType, typeIndex) in toCragObject(cragData.crag).climbingTypes"
              :key="`climbing-type-${index}-${typeIndex}`"
              :climbing-style="climbingType"
              small
              :title="$t(`models.climbs.${climbingType}`)"
              class="vertical-align-sub"
            />
          </td>
          <td class="text-center">
            <compass :orientations="toCragObject(cragData.crag).orientations" />
          </td>
          <td
            v-if="havingCenter"
            class="text-center text-no-wrap"
          >
            {{ getDistance(cragData.crag) }}
            <span class="text--disabled">km</span>
          </td>
          <td class="text-center text-no-wrap">
            {{ walkTime(cragData.crag) }}
          </td>
          <td class="text-center">
            <season-icon :seasons="toCragObject(cragData.crag).seasons" />
          </td>
          <td
            v-for="(grade, gradeIndex) in reduceGradeWithoutWeightings"
            :key="`grade-index-${gradeIndex}`"
            class="text-center crags-table-grade-cell"
            :style="countGradeInLevel(cragData.levels, grade.value) > 0 ? `background-color: ${gradeValueToColor(grade.value, 0.4)}` : ''"
          >
            {{ countGradeInLevel(cragData.levels, grade.value) }}
          </td>
          <td class="text-center">
            {{ routeCount(cragData.levels) }}
          </td>
          <td
            v-if="$auth.loggedIn && callbackFunction"
            class="text-right"
          >
            <v-btn
              icon
              small
              @click="callbackFunction(cragData.crag)"
            >
              <v-icon small>
                {{ callbackIcon }}
              </v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mdiCompass, mdiWalk, mdiLeafMaple, mdiMapMarkerDistance } from '@mdi/js'
import { GradeMixin } from '~/mixins/GradeMixin'
import Crag from '~/models/Crag'
import Compass from '~/components/ui/Compass'
import SeasonIcon from '~/components/ui/SeasonIcon'
import { LocalizationHelpers } from '~/mixins/LocalizationHelpers'
import ClimbingStyleIcon from '~/components/crags/ClimbingStyleIcon.vue'

export default {
  name: 'CragsTable',
  components: {
    ClimbingStyleIcon,
    SeasonIcon,
    Compass
  },
  mixins: [GradeMixin, LocalizationHelpers],
  props: {
    cragsData: {
      type: Object,
      required: true
    },
    routeFigures: {
      type: Object,
      required: true
    },
    centreCoordinate: {
      type: Array,
      default: null
    },
    callbackFunction: {
      type: Function,
      default: null
    },
    callbackIcon: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      mdiCompass,
      mdiWalk,
      mdiLeafMaple,
      mdiMapMarkerDistance
    }
  },

  computed: {
    reduceGradeWithoutWeightings () {
      const grades = []
      for (const grade of this.gradeWithoutWeightings) {
        if (grade.value >= this.routeFigures.grade.min.value && grade.value <= this.routeFigures.grade.max.value) {
          grades.push(grade)
        }
      }
      return grades
    },

    havingCenter () {
      return this.centreCoordinate && this.centreCoordinate.length > 0
    }
  },

  methods: {
    toCragObject (crag) {
      return new Crag({ attributes: crag })
    },

    countGradeInLevel (levels, value) {
      const exactMatch = (levels[value] || {}).count || 0
      const matchSup = (levels[value + 1] || {}).count || 0
      const sum = exactMatch + matchSup
      return sum > 0 ? sum : ''
    },

    routeCount (levels) {
      let sum = 0
      for (const index in levels) {
        sum += levels[index].count
      }
      return sum
    },

    walkTime (crag) {
      if (!crag.min_approach_time) { return '' }
      const minAndMax = `${crag.min_approach_time}" / ${crag.max_approach_time}"`
      return crag.min_approach_time !== crag.max_approach_time ? minAndMax : `${crag.min_approach_time}"`
    },

    getDistance (crag) {
      return this.geoDistance(crag.latitude, crag.longitude, this.centreCoordinate[0], this.centreCoordinate[1])
    }
  }
}
</script>

<style scoped lang="scss">
.crags-table {
  .crags-table-grade-cell {
    padding-left: 5px;
    padding-right: 5px;
  }
}
</style>
