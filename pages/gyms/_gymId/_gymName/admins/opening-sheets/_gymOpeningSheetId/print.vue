<template>
  <div class="opening-sheet">
    <p
      v-if="loadingSheet"
      class="loading-sheet"
    >
      {{ $t('common.loading') }}
    </p>
    <div v-else>
      <div>
        <h1>
          {{ sheet.title }}
        </h1>
        <p class="sheet-date">
          Fiche créée le {{ humanizeDate(sheet.history.created_at) }}
        </p>
        <p v-if="sheet.description">
          {{ sheet.description }}
        </p>
      </div>

      <table class="opening-sheet-table">
        <thead>
          <tr>
            <th
              v-for="(topHeader, topHeaderIndex) of headers.top"
              :key="`top-header-index-${topHeaderIndex}`"
              :colspan="topHeader.colspan"
              class="th-top"
              :style="topHeader.borderLeft ? 'border-left-width: 3px' : null"
            >
              {{ topHeader.label }}
            </th>
          </tr>
          <tr>
            <th
              v-for="(bottomHeader, bottomHeaderIndex) of headers.bottom"
              :key="`bottom-header-index-${bottomHeaderIndex}`"
              :colspan="bottomHeader.colspan"
              class="th-bottom"
              :style="bottomHeader.borderLeft ? 'border-left-width: 3px; border-bottom-width: 3px' : 'border-bottom-width: 3px'"
            >
              <div class="table-bottom-header">
                <span>
                  {{ bottomHeader.label }}
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in rows"
            :key="`row-index-${rowIndex}`"
          >
            <td
              v-for="(cell, cellIndex) in row"
              :key="`cell-index-${cellIndex}`"
              class="grade-cell"
              :style="cellStyle(sheet.row_json[rowIndex].routes[cellIndex - 1] ? sheet.row_json[rowIndex].routes[cellIndex - 1].hold_color : null, cell)"
            >
              <span :style="cell.style">
                {{ cell.label }}
              </span>
              <v-icon
                v-for="(style, styleIndex) in cell.climbing_styles"
                :key="`style-index-${styleIndex}`"
                :size="18"
                :color="cell.icon_color"
              >
                {{ styles.filter((icon) => icon.value === style)[0].icon }}
              </v-icon>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="climbingStyles.length > 0"
        class="climbing-style-legend"
      >
        <p
          v-for="(style, styleIndex) in climbingStyles"
          :key="`climbing-index-${styleIndex}`"
        >
          <v-icon
            class="climbing-style-legend-icon"
            color="rgb(0,0,0)"
            :size="18"
          >
            {{ styles.filter((icon) => icon.value === style)[0].icon }}
          </v-icon>
          {{ $t(`models.climbingStyle.${style}`) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import GymOpeningSheetApi from '~/services/oblyk-api/GymOpeningSheetApi'
import GymOpeningSheet from '~/models/GymOpeningSheet'
import { HoldColorsHelpers } from '~/mixins/HoldColorsHelpers'
import { DateHelpers } from '~/mixins/DateHelpers'
import { ClimbingStylesMixin } from '~/mixins/ClimbingStylesMixin'

export default {
  meta: { orphanRoute: true },
  mixins: [
    HoldColorsHelpers,
    DateHelpers,
    ClimbingStylesMixin
  ],
  layout: 'print',

  data () {
    return {
      loadingSheet: true,
      sheet: null
    }
  },

  head () {
    return {
      title: this.sheet?.title,
      link: [
        { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
        { href: 'https://fonts.gstatic.com', rel: 'preconnect', crossorigin: true },
        { href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap', rel: 'stylesheet' }
      ]
    }
  },

  computed: {
    headers () {
      const headers = {
        top: [{ label: '', colspan: 1 }],
        bottom: [{ label: 'Secteur', colspan: 1, borderLeft: false }]
      }
      for (let i = 0; i < this.sheet.number_of_columns; i++) {
        headers.top.push({ label: `Voie ${i + 1}`, colspan: 3, borderLeft: true })
      }
      for (let i = 0; i < this.sheet.number_of_columns; i++) {
        headers.bottom.push({ label: 'Actuelle', colspan: 1, borderLeft: true })
        headers.bottom.push({ label: 'À ouvrir', colspan: 1, borderLeft: false })
        headers.bottom.push({ label: 'Ouvert', colspan: 1, borderLeft: false })
      }
      return headers
    },

    rows () {
      const rows = []
      for (const scheduleRoute of this.sheet.row_json) {
        const cells = []
        cells.push({
          label: scheduleRoute.sector.name,
          style: null
        })
        for (const route of scheduleRoute.routes) {
          const styles = []
          if (route.hold_color) {
            styles.push(`background-color: ${route.hold_color}`)
            styles.push(`color: ${route.text_hold_color}`)
          }
          cells.push({
            label: route.grade,
            style: styles.join(';'),
            type: route.type,
            climbing_styles: route.climbing_styles,
            icon_color: this.blackOrWhiteColor(route.hold_color || 'rgb(0,0,0)'),
            editable: route.type === 'to_open'
          })
        }
        rows.push(cells)
      }
      return rows
    },

    climbingStyles () {
      const styles = []
      for (const scheduleRoute of this.sheet.row_json) {
        for (const route of scheduleRoute.routes) {
          if (route.climbing_styles) {
            for (const style of route.climbing_styles) {
              if (!styles.includes(style)) {
                styles.push(style)
              }
            }
          }
        }
      }
      return styles
    }
  },

  mounted () {
    this.getSheet()
  },

  methods: {
    getSheet () {
      this.loadingSheet = true
      new GymOpeningSheetApi(this.$axios, this.$auth)
        .find(
          this.$route.params.gymId,
          this.$route.params.gymOpeningSheetId
        )
        .then((resp) => {
          this.sheet = new GymOpeningSheet({ attributes: resp.data })
          setTimeout(() => {
            window.print()
          }, 500)
        })
        .finally(() => {
          this.loadingSheet = false
        })
    },

    cellStyle (color, cell) {
      const styles = []
      if (color) {
        styles.push(`background-color: ${color}`)
        styles.push(`color: ${this.blackOrWhiteColor(color)}`)
      }
      if (cell.type === 'open') {
        styles.push('border-left-width: 3px')
      }
      return styles.join(';')
    }
  }
}
</script>

<style lang="scss">
.loading-sheet {
  text-align: center;
  margin-top: 50px;
  color: rgb(100, 100, 100);
}
.opening-sheet {
  font-family: 'Roboto', sans-serif;
}
.sheet-date {
  color: rgb(100, 100, 100);
  font-size: 0.9em;
  margin-bottom: 5px;
  margin-top: -3px;
}
.opening-sheet-table {
  width: 100%;
  border-collapse: collapse;
  border: 3px solid rgb(150, 150, 150);
  margin-top: 10px;
  th, td {
    border: 1px solid rgb(150, 150, 150);
  }
  td {
    padding: 12px 0;
    text-align: center;
  }
  .th-bottom, .th-top {
    color: rgb(100, 100, 100);
    font-size: 0.8em;
  }
  .th-bottom {
    padding-top: 17px;
    padding-bottom: 17px;
  }
  .th-top {
    padding-top: 7px;
    padding-bottom: 7px;
    border-bottom-style: solid;
    border-bottom-width: 3px;
  }
  .table-bottom-header {
    width: 50px;
    margin-left: auto;
    margin-right: auto;
    span {
      transform: rotate(-45deg);
      display: block;
      white-space: nowrap
    }
  }
  .grade-cell {
    font-weight: bold;
  }
}
.climbing-style-legend {
  margin-top: 5px;
  .climbing-style-legend-icon {
    margin-right: 4px;
  }
}
</style>
