<template>
  <div :class="edit ? 'editable-table' : null">
    <v-simple-table
      dense
      class="border rounded"
    >
      <thead>
        <tr>
          <th class="border-right">
            Ordre
          </th>
          <th class="border-right">
            Nom
          </th>
          <th class="border-right">
            Catégorie
          </th>
          <th class="border-right">
            Hauteur <small>(mètre)</small>
          </th>
          <th class="border-right">
            Mètre linéaire
          </th>
          <th class="border-right">
            Avancée <small>(mètre)</small>
          </th>
          <th class="border-right">
            Temps moyen d'ouverture <small>(minutes)</small>
          </th>
          <th
            v-if="!edit"
            class="text-right"
          >
            <v-btn
              elevation="0"
              color="primary"
              small
              @click="edit = true"
            >
              Éditer
            </v-btn>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(sector, sectorIndex) in gymSectors"
          :key="`sector-index-${sectorIndex}`"
          class="editable-table-gym-sector-row"
        >
          <td class="border-right">
            <v-chip v-if="!edit">
              {{ sector.order }}
            </v-chip>
            <v-text-field
              v-else
              :id="buildInputId(0, sectorIndex)"
              v-model="sector.order"
              data-input-index="0"
              :data-row-index="sectorIndex"
              hide-details
              color="green darken-3"
              number
              dense
              @keydown="changeFocus"
            />
          </td>
          <td class="border-right">
            <span v-if="!edit">
              {{ sector.name }}
            </span>
            <v-text-field
              v-else
              :id="buildInputId(1, sectorIndex)"
              v-model="sector.name"
              data-input-index="1"
              :data-row-index="sectorIndex"
              hide-details
              color="green darken-3"
              dense
              @keydown="changeFocus"
            />
          </td>
          <td class="border-right">
            <span v-if="!edit">
              {{ sector.category_name }}
            </span>
            <v-text-field
              v-else
              :id="buildInputId(2, sectorIndex)"
              v-model="sector.category_name"
              data-input-index="2"
              :data-row-index="sectorIndex"
              hide-details
              color="green darken-3"
              dense
              @keydown="changeFocus"
            />
          </td>
          <td class="border-right">
            <span
              v-if="!edit"
              v-html="buildUnit(sector.height, 'mètres')"
            />
            <v-text-field
              v-else
              :id="buildInputId(3, sectorIndex)"
              v-model="sector.height"
              data-input-index="3"
              :data-row-index="sectorIndex"
              hide-details
              color="green darken-3"
              number
              step="0.1"
              dense
              @keydown="changeFocus"
            />
          </td>
          <td class="border-right">
            <span
              v-if="!edit"
              v-html="buildUnit(sector.linear_metre, 'mètres')"
            />
            <v-text-field
              v-else
              :id="buildInputId(4, sectorIndex)"
              v-model="sector.linear_metre"
              data-input-index="4"
              :data-row-index="sectorIndex"
              hide-details
              color="green darken-3"
              number
              step="0.1"
              dense
              @keydown="changeFocus"
            />
          </td>
          <td class="border-right">
            <span
              v-if="!edit"
              v-html="buildUnit(sector.developed_metre, 'mètres')"
            />
            <v-text-field
              v-else
              :id="buildInputId(5, sectorIndex)"
              v-model="sector.developed_metre"
              data-input-index="5"
              :data-row-index="sectorIndex"
              hide-details
              color="green darken-3"
              number
              step="0.1"
              dense
              @keydown="changeFocus"
            />
          </td>
          <td :class="edit ? null : 'border-right'">
            <span
              v-if="!edit"
              v-html="buildUnit(sector.average_opening_time, 'minutes')"
            />
            <v-text-field
              v-else
              :id="buildInputId(6, sectorIndex)"
              v-model="sector.average_opening_time"
              data-input-index="6"
              :data-row-index="sectorIndex"
              hide-details
              color="green darken-3"
              number
              dense
              @keydown="changeFocus"
            />
          </td>
          <td
            v-if="!edit"
            class="text-right"
          >
            <v-menu>
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    {{ mdiDotsVertical }}
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <!-- Edit article -->
                <v-list-item
                  :to="`${sector.path}/edit?redirect_to=${$route.fullPath}`"
                >
                  <v-list-item-icon>
                    <v-icon>{{ mdiPencil }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    {{ $t('actions.edit') }}
                  </v-list-item-title>
                </v-list-item>
                <v-divider />
                <v-list-item
                  @click="deleteSector(sector.id)"
                >
                  <v-list-item-icon>
                    <v-icon color="red">
                      {{ mdiDelete }}
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title class="red--text">
                    {{ $t('actions.delete') }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-sheet
      v-if="edit"
      class="sticky-save-gym-sector-table pa-2"
    >
      <v-btn
        text
        outlined
        :loading="loadingSave"
        @click="cancel"
      >
        Quitter
      </v-btn>
      <v-btn
        elevation="0"
        color="primary"
        :loading="loadingSave"
        @click="save"
      >
        <v-icon left>
          {{ mdiContentSave }}
        </v-icon>
        Sauvegarder
      </v-btn>
    </v-sheet>
  </div>
</template>

<script>
import { mdiDotsVertical, mdiDelete, mdiPencil, mdiContentSave } from '@mdi/js'
import GymSectorApi from '~/services/oblyk-api/GymSectorApi'

export default {
  name: 'GymSectorsEditTable',
  props: {
    gymSectors: {
      type: Array,
      required: true
    },
    gymSpace: {
      type: Object,
      required: true
    },
    reloadSpaceCallback: {
      type: Function,
      required: true
    },
    startLoadingStructuresCallback: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      edit: false,
      loadingSave: false,

      mdiDotsVertical,
      mdiDelete,
      mdiPencil,
      mdiContentSave
    }
  },

  methods: {
    buildInputId (inputIndex, lineIndex) {
      return `input-${inputIndex}-row-${lineIndex}`
    },

    changeFocus (e) {
      const rowIndex = parseInt(e.target.getAttribute('data-row-index'))
      const inputIndex = parseInt(e.target.getAttribute('data-input-index'))
      let nextInputIndex = null
      let nextRowIndex = null
      if (e.key === 'ArrowDown') {
        nextRowIndex = rowIndex + 1
        nextInputIndex = inputIndex
      } else if (e.key === 'ArrowUp') {
        nextRowIndex = rowIndex - 1
        nextInputIndex = inputIndex
      } else if (e.key === 'ArrowLeft' && e.target.selectionStart === 0) {
        nextRowIndex = rowIndex
        nextInputIndex = inputIndex - 1
      } else if (e.key === 'ArrowRight' && e.target.selectionStart === e.target.value.length) {
        nextRowIndex = rowIndex
        nextInputIndex = inputIndex + 1
      }

      const nextInput = document.querySelector(`#input-${nextInputIndex}-row-${nextRowIndex}`)
      if (nextInput !== null && nextInput !== undefined) {
        nextInput.focus()
        e.preventDefault()
      }
    },

    deleteSector (sectorId) {
      if (confirm(this.$t('common.areYouSurToDelete'))) {
        this.startLoadingStructuresCallback()
        new GymSectorApi(this.$axios, this.$auth)
          .delete(this.gymSpace.gym.id, this.gymSpace.id, sectorId)
          .then(() => {
            this.reloadSpaceCallback()
          })
      }
    },

    cancel () {
      this.edit = false
      this.reloadSpaceCallback()
    },

    save () {
      this.loadingSave = true
      const sectors = this.gymSectors.map((sector) => {
        return {
          id: sector.id,
          order: sector.order,
          name: sector.name,
          category_name: sector.category_name,
          height: sector.height,
          linear_metre: sector.linear_metre,
          developed_metre: sector.developed_metre,
          average_opening_time: sector.average_opening_time
        }
      })

      new GymSectorApi(this.$axios, this.$auth)
        .bulkUpdate(this.gymSpace.gym.id, this.gymSpace.id, sectors)
        .finally(() => {
          this.loadingSave = false
        })
    },

    buildUnit (value, unite) {
      if (value === null || value === undefined) {
        return null
      }
      return `${value} <small class="text--disabled">${unite}</small>`
    }
  }
}
</script>

<style lang="scss">
.editable-table {
  .editable-table-gym-sector-row {
    td {
      padding: 0 !important;
    }
    .v-input {
      input {
        padding: 5px !important;
        max-height: 45px !important;
      }
    }
  }
  .sticky-save-gym-sector-table {
    position: sticky;
    bottom: 0;
    text-align: right;
  }
}
</style>
