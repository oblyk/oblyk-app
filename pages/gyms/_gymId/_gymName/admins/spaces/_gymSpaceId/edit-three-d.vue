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
          <v-btn
            v-if="gymSpace"
            :to="gymSpace.path"
            large
            icon
          >
            <v-icon>
              {{ mdiArrowLeft }}
            </v-icon>
          </v-btn>
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
              <v-btn
                text
                block
                :to="`${gymSpace.path}/sectors/new?redirect_to=${$route.fullPath}`"
              >
                <v-icon left>
                  {{ mdiVectorSquarePlus }}
                </v-icon>
                Ajouter un secteur
              </v-btn>
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
      </v-sheet>
    </v-col>
    <v-col cols="8" class="pb-0 pl-0">
      <client-only>
        <gym-space-three-d-editor
          v-if="gymSpace"
          ref="gymSpaceThreeDEditor"
          :gym-space="gymSpace"
          :sector-click-callback="clickOnSector"
          :editing-sector-height="sectorHeight"
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
  mdiCamera
} from '@mdi/js'
import { GymSpaceConcern } from '~/concerns/GymSpaceConcern'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import GymSectorApi from '~/services/oblyk-api/GymSectorApi'
import GymSector from '~/models/GymSector'
const GymSpaceThreeDEditor = () => import('~/components/gymSpaces/GymSpaceThreeDEditor')

export default {
  components: { GymSpaceThreeDEditor },
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

      mdiArrowLeft,
      mdiVectorSquarePlus,
      mdiFormatColorFill,
      mdiDotsVertical,
      mdiTrashCan,
      mdiPencil,
      mdiCamera
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

    showSector (sector) {
      if (this.showSectorId === sector.id) {
        this.showSectorId = null
      } else {
        this.showSectorId = sector.id
      }
    },

    clickOnSector (sector) {
      const gymSector = this.gymSectors.find(gSector => gSector.id === sector.id)
      this.sectorHeight = gymSector.three_d_height
      this.startEditSector(gymSector)
    },

    startEditSector (sector) {
      this.editSector = sector
      if (sector.three_d_height) {
        this.sectorHeight = sector.three_d_height
      }
      this.startEditing = true
      setTimeout(() => {
        this.$refs.gymSpaceThreeDEditor.startEditingSector(sector)
      }, 100)
    },

    cancel () {
      this.$refs.gymSpaceThreeDEditor.endEditingSector()
      this.editSector = null
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
          three_d_height: this.sectorHeight
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
