<template>
  <div v-if="!loadingRouteFigures">
    <!-- Climbing types -->
    <div
      v-if="showClimbingType"
      class="climbs-type"
    >
      <div
        v-for="(count, climb) in figures.climbing_types"
        :key="climb"
        :class="climb"
        :style="`width: ${count / figures.route_count * 100}%`"
        :title="`${$t(`models.climbs.${climb}`)} : ${count}`"
      >
        {{ $t(`models.climbs.${climb}`) }}
      </div>
    </div>

    <!-- Route levels -->
    <div
      v-if="showLevel"
      class="levels levels-color"
    >
      <div
        v-for="(count, levelIndex) in figures.levels"
        :key="`level-index-${levelIndex}`"
        :class="`level-${levelIndex}`"
        :style="`width: ${count / figures.section_count * 100}%`"
        :title="`${levelIndex} : ${count} `"
        @click="gradeFilter(levelIndex)"
      >
        {{ levelIndex }}
      </div>
    </div>
    <div v-if="level !== null">
      <div v-if="loadingGrade">
        {{ $t('common.loading') }}
      </div>
      <div v-else>
        <v-icon left small>
          {{ mdiFilter }}
        </v-icon>
        <v-chip
          close
          @click:close="resetFilter()"
        >
          {{ level }}
        </v-chip>
      </div>
    </div>
    <div
      v-else
      class="text-right mb-n5 mt-n2"
    >
      <small>Cliquez sur une cotation pour filtrer</small>
    </div>
  </div>
</template>

<script>
import { mdiFilter } from '@mdi/js'
import CragApi from '~/services/oblyk-api/CragApi'
import CragSectorApi from '~/services/oblyk-api/CragSectorApi'
import CragRouteApi from '~/services/oblyk-api/CragRouteApi'
import CragRoute from '~/models/CragRoute'

export default {
  name: 'CragRouteFigures',
  props: {
    crag: {
      type: Object,
      default: null
    },
    cragSector: {
      type: Object,
      default: null
    },
    eventTrigger: {
      type: String,
      default: 'searchCragRoutesResults'
    }
  },

  data () {
    return {
      loadingRouteFigures: true,
      figures: {},
      showClimbingType: true,
      showLevel: true,
      level: null,
      loadingGrade: true,

      mdiFilter
    }
  },

  mounted () {
    this.getRouteFigures()
  },

  methods: {
    getRouteFigures () {
      const promise = this.cragSector ? new CragSectorApi(this.$axios, this.$auth) : new CragApi(this.$axios, this.$auth)
      const objectId = this.cragSector ? this.cragSector.id : this.crag.id

      promise
        .routeFigures(objectId)
        .then((resp) => {
          const figures = {}
          figures.section_count = resp.data.section_count
          figures.route_count = resp.data.route_count
          figures.climbing_types = {}
          figures.degrees = {}
          figures.levels = {}
          for (const degree in resp.data.degrees) {
            if (resp.data.degrees[degree] > 0) { figures.degrees[degree] = resp.data.degrees[degree] }
          }
          for (const climbingType in resp.data.climbing_types) {
            if (resp.data.climbing_types[climbingType] > 0) { figures.climbing_types[climbingType] = resp.data.climbing_types[climbingType] }
            if (resp.data.climbing_types[climbingType] === resp.data.route_count) {
              this.showClimbingType = false
            }
          }
          for (const level in resp.data.levels) {
            if (resp.data.levels[level] > 0) { figures.levels[level] = resp.data.levels[level] }
            if (resp.data.levels[level] === resp.data.section_count) {
              this.showLevel = false
            }
          }
          this.figures = figures
        })
        .finally(() => {
          this.loadingRouteFigures = false
        })
    },

    gradeFilter (level) {
      this.loadingGrade = true
      this.level = level

      let promise = null
      if (this.crag) {
        promise = new CragRouteApi(this.$axios, this.$auth).searchInCragByGrade(this.crag.id, `${level} ${level}+`)
      } else {
        promise = new CragRouteApi(this.$axios, this.$auth).searchInCragSectorByGrade(this.cragSector.crag.id, this.cragSector.id, `${level} ${level}+`)
      }
      promise
        .then((resp) => {
          const cragRoutes = []
          for (const route of resp.data) {
            cragRoutes.push(new CragRoute({ attributes: route }))
          }
          this.$root.$emit(this.eventTrigger, cragRoutes)
        })
        .finally(() => {
          this.loadingGrade = false
        })
    },

    resetFilter () {
      this.level = null
      this.$root.$emit('reloadCragRouteList')
    }
  }
}
</script>

<style lang="scss" scoped>
.climbs-type, .levels {
  div {
    color: white;
    font-size: 0.8em;
    height: 24px;
    line-height: 25px;
    display: inline-block;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
    cursor: pointer;
    &:first-child { border-radius: 4px 0 0 4px; }
    &:last-child { border-radius: 0 4px 4px 0; }
    &:hover {
      opacity: 0.7;
    }
  }
  .sport_climbing { background-color: #3a71c7; }
  .bouldering { background-color: #ffcb00; }
  .multi_pitch { background-color: #ff5656; }
  .trad_climbing { background-color: #e92b2b; }
  .aid_climbing { background-color: #d40000; }
  .deep_water { background-color: #86ccdd; }
  .via_ferrata { background-color: #3cc770; }
  .fun_climbing { background-color: #ff80b2; }

  &.degrees-color {
    .degree-1 { background-color: rgb(238,51,201) }
    .degree-2 { background-color: rgb(103,191,213) }
    .degree-3 { background-color: rgb(249,208,51) }
    .degree-4 { background-color: rgb(238,110,25) }
    .degree-5 { background-color: rgb(143,178,0) }
    .degree-6 { background-color: rgb(0,64,161) }
    .degree-7 { background-color: rgb(144,46,168) }
    .degree-8 { background-color: rgb(221,25,25) }
    .degree-9 { background-color: rgb(77,77,77) }
  }

  &.levels-color {
  .level-1a { background-color: rgb(255,85,220); }
  .level-1b { background-color: rgb(238,51,201); }
  .level-1c { background-color: rgb(221,17,180); }

  .level-2a { background-color: rgb(134,205,222); }
  .level-2b { background-color: rgb(103,191,213); }
  .level-2c { background-color: rgb(71,178,204); }

  .level-3a { background-color: rgb(255,221,84); }
  .level-3b { background-color: rgb(249,208,51); }
  .level-3c { background-color: rgb(243,195,17); }

  .level-4a { background-color: rgb(255,127,42); }
  .level-4b { background-color: rgb(238,110,25); }
  .level-4c { background-color: rgb(221,93,8); }

  .level-5a { background-color: rgb(170,212,0); }
  .level-5b { background-color: rgb(143,178,0); }
  .level-5c { background-color: rgb(115,144,0); }

  .level-6a { background-color: rgb(0,85,212); }
  .level-6b { background-color: rgb(0,64,161); }
  .level-6c { background-color: rgb(0,44,110); }

  .level-7a { background-color: rgb(171,55,200); }
  .level-7b { background-color: rgb(144,46,168); }
  .level-7c { background-color: rgb(117,37,136); }

  .level-8a { background-color: rgb(255,59,59); }
  .level-8b { background-color: rgb(221,25,25); }
  .level-8c { background-color: rgb(187,8,8); }

  .level-9a { background-color: rgb(128,128,128); }
  .level-9b { background-color: rgb(77,77,77); }
  .level-9c { background-color: rgb(25,25,25); }
  }
}
</style>
