<template>
  <v-row class="app-height">
    <v-col
      cols="4"
      class="full-height overflow-y-auto pr-0"
    >
      <v-sheet class="rounded pa-4 ma-1">
        <div
          v-if="!startEditing"
          class="d-flex border-bottom pb-2 mb-3"
        >
          <v-menu
            v-if="gymSpace"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                large
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>
                  {{ mdiArrowLeft }}
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                :to="`${gymSpace.Gym.adminPath}/spaces/edit-three-d`"
              >
                <v-list-item-icon>
                  <v-icon>
                    {{ mdiArrowUpLeft }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  Éditeur 3D de la salle
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                :to="gymSpace.path"
              >
                <v-list-item-icon>
                  <v-icon>
                    {{ mdiArrowLeft }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ gymSpace.name }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <h2 class="text-center flex-grow-1 pt-1">
            Éditeur 3D
          </h2>
          <v-menu v-if="gymSpace">
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                text
                class="mt-1"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>
                  {{ mdiDotsVertical }}
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item :to="`${gymSpace.path}/edit`">
                <v-list-item-icon>
                  <v-icon>
                    {{ mdiPencil }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  {{ $t('actions.editSpace') }}
                </v-list-item-content>
              </v-list-item>
              <v-list-item :to="`${gymSpace.Gym.adminPath}/spaces/${gymSpace.id}/take-three-d-picture`">
                <v-list-item-icon>
                  <v-icon>
                    {{ mdiCamera }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  {{ $t('actions.takeCapture') }}
                </v-list-item-content>
              </v-list-item>
              <v-list-item :to="`${gymSpace.path}/upload-3d`">
                <v-list-item-icon>
                  <v-icon>
                    {{ mdiCube }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <span v-text="gymSpace.have_three_d ? 'Réimporter le 3D' : 'Importer un 3D'" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div v-if="!startEditing">
          <p class="text-decoration-underline font-weight-bold mb-1">
            Liste des secteurs :
          </p>
          <v-skeleton-loader
            v-if="loadingSectors"
            type="list-item,list-item"
          />
          <div v-else>
            <v-list class="mx-n4">
              <v-list-item
                v-for="(sector, sectorIndex) in gymSectors"
                :key="`sector-${sectorIndex}`"
                @click="startEditSector(sector)"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ sector.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <v-chip
                      v-if="!sector.have_three_d_path"
                      color="amber darken-2"
                      outlined
                      small
                    >
                      Tracé manquant
                    </v-chip>
                    <span v-if="sector.three_d_height">
                      Hauteur : {{ sector.three_d_height }} mètres
                    </span>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-menu offset-y>
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
                      <v-list-item
                        @click="editLabelPosition(sector)"
                      >
                        <v-list-item-icon>
                          <v-icon>{{ mdiAlphaLCircleOutline }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                          Modifier la position du label
                        </v-list-item-title>
                      </v-list-item>
                      <v-divider v-if="sector.three_d_height" />
                      <v-list-item
                        v-if="sector.three_d_height"
                        @click="deleteSectorPath(sector)"
                      >
                        <v-list-item-icon>
                          <v-icon color="red">
                            {{ mdiTrashCan }}
                          </v-icon>
                        </v-list-item-icon>
                        <v-list-item-title class="red--text">
                          Supprimer le tracé
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <div
              v-if="gymSpace"
              class="mt-4"
            >
              <div class="text-center">
                <v-btn
                  text
                  :to="`${gymSpace.path}/sectors/new?redirect_to=${$route.fullPath}`"
                >
                  <v-icon left>
                    {{ mdiVectorSquarePlus }}
                  </v-icon>
                  Ajouter un secteur
                </v-btn>
              </div>
              <div class="border-top mt-3 pt-3">
                <span @click="showMoreOption = !showMoreOption">
                  <v-icon left>
                    {{ showMoreOption ? mdiMenuDown : mdiMenuRight }}
                  </v-icon>
                  plus d'options
                </span>
              </div>
              <div
                v-if="showMoreOption"
                class="pt-2"
              >
                <v-alert
                  v-if="gymSpace.representation_type === '2d_picture'"
                  class="border mb-0"
                >
                  <p class="font-weight-bold mb-1">
                    Note :
                  </p>
                  <p class="mb-1">
                    Votre espace est paramétré pour utiliser la représentation 2D.
                  </p>
                  <p>
                    Quand vous aurez fini de tracer vos secteurs, cliquer sur <strong>[passer en 3D]</strong>.
                  </p>
                  <v-btn
                    elevation="0"
                    block
                    :loading="loadingSwitch"
                    @click="switchRepresentationTo('3d')"
                  >
                    Passer en 3D
                  </v-btn>
                </v-alert>
                <v-alert
                  v-if="gymSpace.representation_type === '3d'"
                  class="border mb-0"
                >
                  <p class="mb-2">
                    Passer la représentation de votre espace en 2D.
                  </p>
                  <v-btn
                    elevation="0"
                    block
                    :loading="loadingSwitch"
                    @click="switchRepresentationTo('2d_picture')"
                  >
                    Passer en 2D
                  </v-btn>
                </v-alert>
              </div>
            </div>
          </div>
        </div>
        <div v-if="editSector !== null">
          <v-btn
            text
            block
            small
            class="justify-start"
            @click="cancel"
          >
            <v-icon left>
              {{ mdiArrowLeft }}
            </v-icon>
            Liste des secteurs
          </v-btn>
          <p class="mt-2">
            Edition de : <strong class="text-decoration-underline">{{ editSector.name }}</strong>
          </p>
          <p>
            Ajuster la hauteur de votre secteur par rapport au sol. Cliquez sur le voile bleu pour tracer votre secteur.
          </p>
          <p>
            <strong>Tips :</strong> Passez en vue de dessus pour plus de simplicité.
          </p>
          <v-text-field
            v-model="sectorHeight"
            label="Hauteur du secteur"
            suffix="mètre"
            type="number"
            step="0.1"
            outlined
          />
          <v-text-field
            v-model="sectorElevated"
            label="Élevation par rapport au sol"
            suffix="mètre"
            type="number"
            step="0.1"
            outlined
          />
          <div class="text-right">
            <v-btn
              text
              outlined
              small
              @click="cancel"
            >
              {{ $t('actions.cancel') }}
            </v-btn>
            <v-btn
              small
              color="primary"
              elevation="0"
              :loading="editLoading"
              @click="save"
            >
              {{ $t('actions.save') }}
            </v-btn>
          </div>
        </div>
        <div v-if="editLabelPositionSector !== null">
          <v-btn
            text
            block
            small
            class="justify-start"
            @click="cancel"
          >
            <v-icon left>
              {{ mdiArrowLeft }}
            </v-icon>
            Liste des secteurs
          </v-btn>
          <p class="mt-2 mb-1">
            Position du label de : <strong class="text-decoration-underline">{{ editLabelPositionSector.name }}</strong>
          </p>
          <p class="text--disabled mb-5">
            Par défaut le label au dessus d'un secteur est centré sur le plan horizontal (50% sur X et 50 % sur Z) et est placé à 0,2 mètre au dessus du secteur.<br>
          </p>
          <v-text-field
            v-model="labelX"
            label="Centrage X"
            suffix="%"
            type="number"
            outlined
            @input="emitLabelPosition"
          />
          <v-text-field
            v-model="labelZ"
            label="Centrage Z"
            suffix="%"
            type="number"
            outlined
            @input="emitLabelPosition"
          />
          <v-text-field
            v-model="labelY"
            label="Élevation Y"
            suffix="mètre"
            type="number"
            outlined
            @input="emitLabelPosition"
          />
          <div class="text-right">
            <v-btn
              text
              outlined
              small
              @click="cancel"
            >
              {{ $t('actions.cancel') }}
            </v-btn>
            <v-btn
              small
              color="primary"
              elevation="0"
              :loading="savingLabelPosition"
              @click="saveLabelPosition"
            >
              {{ $t('actions.save') }}
            </v-btn>
          </div>
        </div>
      </v-sheet>
    </v-col>
    <v-col cols="8" class="pb-0 pl-0">
      <client-only>
        <gym-space-three-d-editor
          v-if="gymSpace && gymSpace.three_d_gltf_url"
          ref="gymSpaceThreeDEditor"
          :gym-space="gymSpace"
          :sector-click-callback="clickOnSector"
          :editing-sector-height="sectorHeight"
          :editing-sector-elevated="sectorElevated"
          :init-sector-height-callback="initSectorHeight"
          :edit-label-position="labelPositionProps"
        />
        <gym-space-three-d-missing
          v-if="gymSpace && gymSpace.three_d_gltf_url === null"
          :gym-space="gymSpace"
          :gym="gymSpace.Gym"
        />
      </client-only>
    </v-col>
  </v-row>
</template>

<script>
import {
  mdiArrowLeft,
  mdiVectorSquarePlus,
  mdiFormatColorFill,
  mdiDotsVertical,
  mdiTrashCan,
  mdiPencil,
  mdiCamera,
  mdiCube,
  mdiMenuDown,
  mdiMenuRight,
  mdiArrowUpLeft,
  mdiAlphaLCircleOutline
} from '@mdi/js'
import { GymSpaceConcern } from '~/concerns/GymSpaceConcern'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import GymSectorApi from '~/services/oblyk-api/GymSectorApi'
import GymSector from '~/models/GymSector'
import GymSpaceThreeDMissing from '~/components/gymSpaces/GymSpaceThreeDMissing.vue'
import GymSpaceApi from '~/services/oblyk-api/GymSpaceApi'
const GymSpaceThreeDEditor = () => import('~/components/gymSpaces/GymSpaceThreeDEditor')

export default {
  components: { GymSpaceThreeDMissing, GymSpaceThreeDEditor },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern, GymSpaceConcern],
  middleware: ['auth', 'gymAdmin'],

  data () {
    return {
      startEditing: false,
      editSector: null,
      editLoading: false,
      gymSectors: [],
      loadingSectors: true,
      showSectorId: null,
      sectorHeight: null,
      sectorElevated: null,
      showMoreOption: false,
      loadingSwitch: false,
      editLabelPositionSector: null,
      savingLabelPosition: false,
      labelPositionProps: null,

      labelX: null,
      labelY: null,
      labelZ: null,

      mdiArrowLeft,
      mdiVectorSquarePlus,
      mdiFormatColorFill,
      mdiDotsVertical,
      mdiTrashCan,
      mdiPencil,
      mdiCamera,
      mdiCube,
      mdiMenuDown,
      mdiMenuRight,
      mdiArrowUpLeft,
      mdiAlphaLCircleOutline
    }
  },

  watch: {
    gymSpace () {
      if (this.gymSpace && this.gymSpace.representation_type === '2d_picture') {
        this.showMoreOption = true
      }
    }
  },

  mounted () {
    this.getSectors()
  },

  methods: {
    getSectors () {
      this.loadingSectors = true
      new GymSectorApi(this.$axios, this.$auth)
        .all(
          this.$route.params.gymId,
          this.$route.params.gymSpaceId
        )
        .then((resp) => {
          this.gymSectors = []
          for (const sector of resp.data) {
            this.gymSectors.push(new GymSector({ attributes: sector }))
          }
        })
        .finally(() => {
          this.loadingSectors = false
        })
    },

    clickOnSector (sector) {
      const gymSector = this.gymSectors.find(gSector => gSector.id === sector.id)
      this.sectorHeight = gymSector.three_d_height
      this.sectorElevated = gymSector.three_d_elevated
      this.startEditSector(gymSector)
    },

    startEditSector (sector) {
      this.editSector = sector
      if (sector.three_d_height) {
        this.sectorHeight = sector.three_d_height
      }
      this.sectorElevated = sector.three_d_elevated || 0
      this.startEditing = true
      setTimeout(() => {
        this.$refs.gymSpaceThreeDEditor.startEditingSector(sector)
      }, 100)
    },

    emitLabelPosition () {
      this.labelPositionProps = {
        x: parseInt(this.labelX),
        y: parseFloat(this.labelY.toString().replace(',', '.')),
        z: parseInt(this.labelZ),
        id: this.editLabelPositionSector.id
      }
    },

    editLabelPosition (sector) {
      this.editLabelPositionSector = sector
      if (sector.three_d_label_options) {
        this.labelX = sector.three_d_label_options?.x === null ? 50 : sector.three_d_label_options.x
        this.labelZ = sector.three_d_label_options?.z === null ? 50 : sector.three_d_label_options.z
        this.labelY = sector.three_d_label_options?.y === null ? 0.2 : sector.three_d_label_options.y
      } else {
        this.labelX = 50
        this.labelZ = 50
        this.labelY = 0.2
      }
      this.startEditing = true
    },

    initSectorHeight (height) {
      this.sectorHeight = height
    },

    cancel () {
      this.$refs.gymSpaceThreeDEditor.endEditingSector()
      this.editSector = null
      if (this.editLabelPositionSector !== null) {
        if (this.editLabelPositionSector.three_d_label_options) {
          this.labelX = this.editLabelPositionSector.three_d_label_options?.x === null ? 50 : this.editLabelPositionSector.three_d_label_options.x
          this.labelZ = this.editLabelPositionSector.three_d_label_options?.z === null ? 50 : this.editLabelPositionSector.three_d_label_options.z
          this.labelY = this.editLabelPositionSector.three_d_label_options?.y === null ? 0.2 : this.editLabelPositionSector.three_d_label_options.y
        } else {
          this.labelX = 50
          this.labelZ = 50
          this.labelY = 0.2
        }
        this.labelPositionProps = {
          x: parseInt(this.labelX),
          y: parseFloat(this.labelY.toString().replace(',', '.')),
          z: parseInt(this.labelZ),
          id: this.editLabelPositionSector.id
        }
      }
      this.editLabelPositionSector = null
      this.startEditing = false
    },

    save () {
      const points = this.$refs.gymSpaceThreeDEditor.getSectorPoints()
      this.$refs.gymSpaceThreeDEditor.endEditingSector()
      new GymSectorApi(this.$axios, this.$auth).update(
        {
          gym_id: this.gymSpace.gym.id,
          gym_space_id: this.gymSpace.id,
          id: this.editSector.id,
          three_d_path: points,
          three_d_height: this.sectorHeight,
          three_d_elevated: this.sectorElevated
        })
        .then(() => {
          this.getSectors()
          this.$refs.gymSpaceThreeDEditor.sectorsBuilder()
        })
        .finally(() => {
          this.editLoading = false
          this.editSector = null
          this.startEditing = false
        })
    },

    saveLabelPosition () {
      this.savingLabelPosition = true
      new GymSectorApi(this.$axios, this.$auth).update(
        {
          gym_id: this.gymSpace.gym.id,
          gym_space_id: this.gymSpace.id,
          id: this.editLabelPositionSector.id,
          three_d_label_options: {
            x: parseInt(this.labelX),
            y: parseFloat(this.labelY.toString().replace(',', '.')),
            z: parseInt(this.labelZ)
          }
        })
        .then(() => {
          this.getSectors()
          this.$refs.gymSpaceThreeDEditor.sectorsBuilder()
        })
        .finally(() => {
          this.savingLabelPosition = false
          this.editLabelPositionSector = null
          this.startEditing = false
        })
    },

    switchRepresentationTo (representationType) {
      this.loadingSwitch = true
      new GymSpaceApi(this.$axios, this.$auth)
        .update({
          gym_id: this.gymSpace.gym.id,
          id: this.gymSpace.id,
          representation_type: representationType
        })
        .finally(() => {
          location.reload()
        })
    },

    deleteSectorPath (sector) {
      this.editLoading = true
      this.$refs.gymSpaceThreeDEditor.endEditingSector()
      new GymSectorApi(this.$axios, this.$auth)
        .deleteThreeDPath(this.gymSpace.gym.id, this.gymSpace.id, sector.id)
        .then(() => {
          this.getSectors()
          this.$refs.gymSpaceThreeDEditor.sectorsBuilder()
        })
        .finally(() => {
          this.editLoading = false
          this.editSector = null
          this.startEditing = false
        })
    }
  }
}
</script>
<style lang="scss">
.sectors-list-three-d {
  position: absolute;
  top: 0;
  left: 0;
  will-change: opacity;
  transition: opacity 0.2s;
  opacity: 1;
  .sector-label-in-space {
    position: absolute;
    top: 0;
    left: 0;
    white-space: nowrap;
    background-color: rgba(255, 255, 255, 0.8);
    font-size: 0.6em;
    padding: 2px 3px;
  }
  &.--in-dragging-scene {
    opacity: 0.3;
    .sector-label-in-space {
      background-color: rgba(255, 255, 255, 0);
    }
  }
}
</style>
