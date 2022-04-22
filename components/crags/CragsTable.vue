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
          <th class="text-center">
            {{ $t('components.cragsTable.orientations') }}
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
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(cragData, index) in cragsData"
          :key="`crag-data-index-${index}`"
        >
          <td class="text-no-wrap span-comma">
            <nuxt-link
              :to="toCragObject(cragData.crag).path"
              class="mr-2"
            >
              {{ cragData.crag.name }}
            </nuxt-link>
            <span
              v-for="(climbingType, typeIndex) in toCragObject(cragData.crag).climbingTypes"
              :key="`climbing-type-${index}-${typeIndex}`"
              :class="`text--disabled climbs-pastille pastille-x-small ${climbingType}`"
            >
              {{ $t(`models.climbs.${climbingType}`) }}
            </span>
          </td>
          <td class="text-center">
            <compass :orientations="toCragObject(cragData.crag).orientations" />
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
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { GradeMixin } from '~/mixins/GradeMixin'
import Crag from '~/models/Crag'
import Compass from '~/components/ui/Compass'

export default {
  name: 'CragsTable',
  components: { Compass },
  mixins: [GradeMixin],
  props: {
    cragsData: {
      type: Object,
      required: true
    },
    routeFigures: {
      type: Object,
      required: true
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
