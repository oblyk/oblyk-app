<template>
  <v-container
    class="opening-sheet-container"
    fluid
  >
    <spinner v-if="!gym" />
    <div v-else>
      <v-breadcrumbs :items="breadcrumbs" />
      <v-sheet class="beta-background white--text font-weight-bold rounded pa-3 mb-2">
        <v-icon left color="white">
          {{ mdiFlask }}
        </v-icon>
        Fonction en cours de développement
      </v-sheet>
      <div v-if="!loadingSheet">
        <v-sheet class="rounded pa-4 mb-2">
          <h1
            v-if="!editTitle"
            class="mb-2"
          >
            <span
              class="hover-border py-1 rounded-sm"
              @click="editTitle = !editTitle"
            >
              {{ data.title }}
            </span>
          </h1>
          <v-text-field
            v-else
            v-model="data.title"
            outlined
            :loading="updatingMainInfo"
            @blur="updateMain"
          />
          <p class="text-decoration-underline mb-1">
            Note :
          </p>
          <div
            v-if="!editDescription"
            @click="editDescription = !editDescription"
          >
            <span
              v-if="data.description"
              class="hover-border py-1 rounded-sm"
            >
              {{ data.description }}
            </span>
            <cite
              v-else
              class="text--disabled hover-border py-1 rounded-sm"
            >
              ajouter une note
            </cite>
          </div>
          <v-textarea
            v-else
            v-model="data.description"
            :loading="updatingMainInfo"
            outlined
            @blur="updateMain"
          />
          <p class="text--disabled mt-2 mb-0">
            Fiche créée le {{ humanizeDate(sheet.history.created_at) }}
          </p>
          <p
            v-if="sheet.archived_at"
            class="text--disabled mt-0 mb-0"
          >
            Fiche archivée le {{ humanizeDate(sheet.archived_at) }}
          </p>
          <div class="text-right">
            <v-menu offset-y>
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  outlined
                  text
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    {{ mdiDotsVertical }}
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="archiveSheet()">
                  <v-list-item-icon>
                    <v-icon>{{ mdiArchive }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title class="red--text">
                    {{ sheet.archived_at ? $t('actions.unArchive') : $t('actions.archive')  }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item @click="deleteSheet()">
                  <v-list-item-icon>
                    <v-icon>{{ mdiTrashCan }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title class="red--text">
                    {{ $t('actions.delete') }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn
              elevation="0"
              text
              outlined
              :to="`${sheet.path}/print`"
              target="_blank"
            >
              <v-icon left>
                {{ mdiPrinter }}
              </v-icon>
              {{ $t('actions.print') }}
            </v-btn>
          </div>
        </v-sheet>
        <v-sheet
          class="rounded mb-2 py-1"
          style="position: sticky; top: 60px; z-index: 1"
        >
          <v-icon
            left
            class="ml-4 mt-1"
          >
            {{ mdiFormatColorFill }}
          </v-icon>
          <v-btn
            v-for="(color, colorIndex) in colors"
            :key="`color-index-${colorIndex}`"
            icon
            :title="color.text"
            :outlined="color.simple"
            @click="colourCell(color.value)"
          >
            <v-icon
              :color="color.value === '#00000000' ? null : color.value"
            >
              {{ color.value === '#00000000' ? mdiCircleOffOutline : mdiCircle }}
            </v-icon>
          </v-btn>
        </v-sheet>
        <v-simple-table class="mb-10">
          <template #default>
            <thead>
              <tr>
                <th
                  v-for="(topHeader, topHeaderIndex) of headers.top"
                  :key="`top-header-index-${topHeaderIndex}`"
                  :colspan="topHeader.colspan"
                  class="text-center border-left border-bottom"
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
                  class="text-center border-left pa-1"
                  :style="bottomHeader.borderLeft ? 'border-left-width: 3px; border-bottom-width: 3px' : 'border-bottom-width: 3px'"
                >
                  <div class="sheet-opening-header">
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
                  class="text-center border-left pa-0 text-no-wrap font-weight-bold"
                  :style="cellStyle(sheet.row_json[rowIndex].routes[cellIndex - 1] ? sheet.row_json[rowIndex].routes[cellIndex - 1].hold_color : null, cell)"
                >
                  <span
                    v-if="!cell.editable"
                    :style="cell.style"
                  >
                    {{ cell.label }}
                  </span>
                  <v-text-field
                    v-if="cell.editable"
                    :id="refBuild(rowIndex, cellIndex)"
                    v-model="sheet.row_json[rowIndex].routes[cellIndex - 1].grade"
                    :data-row-index="rowIndex"
                    :data-cell-index="cellIndex"
                    hide-details
                    :dark="darkFieldColor(sheet.row_json[rowIndex].routes[cellIndex - 1] ? sheet.row_json[rowIndex].routes[cellIndex - 1].hold_color : null)"
                    class="opening-sheet-edit-grade py-0 px-1 ma-0"
                    @keydown="changeFocus"
                    @blur="pushCellToUpdate({ rowIndex, cellIndex: cellIndex - 1})"
                    @click="cellFocus(rowIndex, cellIndex)"
                  />
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <div style="position: fixed; bottom: 5px; right: 5px">
          <v-btn
            color="primary"
            elevation="0"
            :loading="updatingRoutesInfo"
            :disabled="cellsToUpdate === null"
            @click="updateCells()"
          >
            {{ $t('actions.save') }}
          </v-btn>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import {
  mdiFlask,
  mdiCircle,
  mdiCircleOffOutline,
  mdiFormatColorFill,
  mdiPrinter,
  mdiDotsVertical,
  mdiTrashCan,
  mdiArchive
} from '@mdi/js'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import Spinner from '~/components/layouts/Spiner'
import GymOpeningSheetApi from '~/services/oblyk-api/GymOpeningSheetApi'
import GymOpeningSheet from '~/models/GymOpeningSheet'
import { HoldColorsHelpers } from '~/mixins/HoldColorsHelpers'
import { DateHelpers } from '~/mixins/DateHelpers'

export default {
  components: { Spinner },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern, HoldColorsHelpers, DateHelpers],
  middleware: ['auth', 'gymAdmin'],

  data () {
    return {
      loadingSheet: true,
      sheet: null,
      editTitle: false,
      editDescription: false,
      updatingMainInfo: false,
      updatingRoutesInfo: false,
      cellsToUpdate: null,
      cellFocusIndex: null,
      rowFocusIndex: null,

      data: {
        gym_id: this.$route.params.gymId,
        id: this.$route.params.gymOpeningSheetId,
        title: null,
        description: null
      },

      mdiFlask,
      mdiCircle,
      mdiCircleOffOutline,
      mdiFormatColorFill,
      mdiPrinter,
      mdiDotsVertical,
      mdiTrashCan,
      mdiArchive
    }
  },

  head () {
    return {
      title: this.sheet?.title
    }
  },

  computed: {
    breadcrumbs () {
      return [
        {
          text: this.gym?.name,
          disable: true
        },
        {
          text: this.$t('components.gymAdmin.home'),
          to: `${this.gym?.adminPath}`,
          exact: true
        },
        {
          text: 'Planification des ouvertures',
          to: `${this.gym?.adminPath}/opening-sheets`,
          exact: true
        },
        {
          text: this.sheet?.title,
          exact: true
        }
      ]
    },

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
            editable: route.type === 'to_open'
          })
        }
        rows.push(cells)
      }
      return rows
    }
  },

  mounted () {
    this.getSheet()
  },

  methods: {
    deleteSheet () {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette fiche ?')) {
        this.loadingAction = true
        new GymOpeningSheetApi(this.$axios, this.$auth)
          .delete(this.$route.params.gymId, this.sheet.id)
          .finally(() => {
            this.$router.push(`${this.gym.adminPath}/opening-sheets`)
          })
      }
    },

    archiveSheet () {
      if (this.sheet.archived_at && confirm('Êtes-vous sûr de vouloir dés-archiver cette fiche ?')) {
        this.loadingAction = true
        new GymOpeningSheetApi(this.$axios, this.$auth)
          .unArchived(this.$route.params.gymId, this.sheet.id)
          .finally(() => {
            this.$router.push(`${this.gym.adminPath}/opening-sheets`)
          })
      } else if (confirm('Êtes-vous sûr de vouloir archiver cette fiche ?')) {
        this.loadingAction = true
        new GymOpeningSheetApi(this.$axios, this.$auth)
          .archived(this.$route.params.gymId, this.sheet.id)
          .finally(() => {
            this.$router.push(`${this.gym.adminPath}/opening-sheets`)
          })
      }
    },

    getSheet () {
      this.loadingSheet = true
      new GymOpeningSheetApi(this.$axios, this.$auth)
        .find(
          this.$route.params.gymId,
          this.$route.params.gymOpeningSheetId
        )
        .then((resp) => {
          this.sheet = new GymOpeningSheet({ attributes: resp.data })
          this.data.title = this.sheet.title
          this.data.description = this.sheet.description
        })
        .finally(() => {
          this.loadingSheet = false
        })
    },

    updateMain () {
      this.updatingMainInfo = true
      new GymOpeningSheetApi(this.$axios, this.$auth)
        .update(this.data)
        .finally(() => {
          this.editTitle = false
          this.editDescription = false
          this.updatingMainInfo = false
        })
    },

    pushCellToUpdate (cell) {
      if (this.cellsToUpdate === null) {
        this.cellsToUpdate = {}
      }
      this.cellsToUpdate[`${cell.rowIndex}-${cell.cellIndex}`] = {
        rowIndex: cell.rowIndex,
        cellIndex: cell.cellIndex,
        grade: this.sheet.row_json[cell.rowIndex].routes[cell.cellIndex].grade,
        hold_color: this.sheet.row_json[cell.rowIndex].routes[cell.cellIndex].hold_color
      }
    },

    updateCells () {
      this.updatingRoutesInfo = true
      new GymOpeningSheetApi(this.$axios, this.$auth)
        .updateCells({
          gym_id: this.$route.params.gymId,
          id: this.$route.params.gymOpeningSheetId,
          cells: Object.values(this.cellsToUpdate)
        })
        .then(() => {
          this.cellsToUpdate = null
        })
        .finally(() => {
          this.updatingRoutesInfo = false
        })
    },

    cellFocus (row, cell) {
      this.cellFocusIndex = cell
      this.rowFocusIndex = row
    },

    colourCell (color) {
      if (this.rowFocusIndex === null || this.cellFocusIndex === null) { return false }
      if (this.cellsToUpdate === null) { this.cellsToUpdate = {} }

      this.sheet.row_json[this.rowFocusIndex].routes[this.cellFocusIndex - 1].hold_color = color
      this.cellsToUpdate[`${this.rowFocusIndex}-${this.cellFocusIndex - 1}`] = {
        rowIndex: this.rowFocusIndex,
        cellIndex: this.cellFocusIndex - 1,
        grade: this.sheet.row_json[this.rowFocusIndex].routes[this.cellFocusIndex - 1].grade,
        hold_color: this.sheet.row_json[this.rowFocusIndex].routes[this.cellFocusIndex - 1].hold_color
      }
      const currentCell = document.querySelector(`#row-${this.rowFocusIndex}-cell-${this.cellFocusIndex}`)
      if (currentCell) {
        currentCell.focus()
      }
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
    },

    darkFieldColor (color) {
      if (color === null || color === '#00000000') {
        return this.$vuetify.theme.dark
      } else {
        return this.blackOrWhiteColor(color) !== 'rgb(0,0,0)'
      }
    },

    changeFocus (e) {
      const rowIndex = parseInt(e.target.getAttribute('data-row-index'))
      const cellIndex = parseInt(e.target.getAttribute('data-cell-index'))
      let nextCellIndex = null
      let nextRowIndex = null
      if (e.key === 'ArrowDown') {
        nextRowIndex = rowIndex + 1
        nextCellIndex = cellIndex
      } else if (e.key === 'ArrowUp') {
        nextRowIndex = rowIndex - 1
        nextCellIndex = cellIndex
      } else if (e.key === 'Tab' && !e.shiftKey) {
        nextRowIndex = rowIndex
        nextCellIndex = cellIndex + 3
      } else if (e.key === 'Tab' && e.shiftKey) {
        nextRowIndex = rowIndex
        nextCellIndex = cellIndex - 3
      }

      const nextCell = document.querySelector(`#row-${nextRowIndex}-cell-${nextCellIndex}`)
      if (nextCell !== null && nextCell !== undefined) {
        this.rowFocusIndex = nextRowIndex
        this.cellFocusIndex = nextCellIndex
        nextCell.focus()
        e.preventDefault()
      }
    },

    refBuild (rowIndex, cellIndex) {
      return `row-${rowIndex}-cell-${cellIndex}`
    }
  }
}
</script>

<style lang="scss">
.opening-sheet-container {
  .opening-sheet-edit-grade {
    .v-input {
      input {
        text-align: center;
        max-height: 45px !important;
        padding-top: 5px;
        padding-bottom: 5px;
      }
    }
  }

  .sheet-opening-header {
    width: 55px;
    span {
      transform: rotate(-45deg);
      display: block;
      white-space: nowrap
    }
  }
}
</style>
