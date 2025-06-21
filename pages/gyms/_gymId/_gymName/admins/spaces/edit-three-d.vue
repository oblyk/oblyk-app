<template>
  <div
    class="app-height"
    style="position: relative"
  >
    <div
      v-if="gym"
      class="full-height"
    >
      <client-only>
        <gym-three-d-editor
          ref="gymThreeDEditor"
          :gym="gym"
          :space-click-callback="startEditSpace"
          :asset-click-callback="startEditAsset"
          :editing-space-elevation="spaceElevation"
          :editing-space-rotation="spaceRotation"
          :editing-asset-elevation="assetElevation"
          :editing-asset-rotation="assetRotation"
          :edit-label-position="labelPositionProps"
        />
      </client-only>
      <v-sheet
        class="rounded pa-4 ma-1"
        style="position: absolute; left: 5px; top: 5px; max-height: calc(100vh - 65px); overflow-y: auto; width: 300px"
      >
        <div
          v-if="startEditingSpace === false && startEditingAsset === false && advancedOptions === false"
          class="d-flex border-bottom pb-2"
        >
          <v-btn
            large
            icon
            :to="`${gym.path}/spaces`"
          >
            <v-icon>
              {{ mdiArrowLeft }}
            </v-icon>
          </v-btn>
          <h2 class="text-center flex-grow-1 pt-1">
            Éditeur 3D
          </h2>
        </div>

        <!-- Tabs Spaces & Assets-->
        <div v-if="startEditingSpace === false && startEditingAsset === false && advancedOptions === false">
          <v-tabs
            v-model="tab"
            height="32"
            fixed-tabs
            class="mb-2"
          >
            <v-tab>
              Espaces
            </v-tab>
            <v-tab>
              Décorations
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-skeleton-loader
                v-if="loadingSpaces"
                type="list-item,list-item"
              />
              <div v-else>
                <v-list-item
                  v-for="(space, spaceIndex) in gymSpaces"
                  :key="`space-${spaceIndex}`"
                  class="px-0"
                  @mouseenter="highlightSpace(space)"
                >
                  <v-list-item-avatar
                    v-if="space.attachments.three_d_picture.attached"
                  >
                    <v-img
                      :src="imageVariant(space.attachments.three_d_picture, { fit: 'scale-down', height: 100, width: 100 })"
                    />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ space.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle
                      v-if="!space.have_three_d || !space.attachments.three_d_picture.attached || space.representation_type !== '3d'"
                    >
                      <v-chip
                        v-if="!space.have_three_d"
                        small
                        color="amber darken-2"
                        outlined
                        :to="`${space.path}/upload-3d?redirect_to=${$route.fullPath}`"
                      >
                        <v-icon left x-small>
                          {{ mdiCubeOutline }}
                        </v-icon>
                        Fichier 3D manquant
                      </v-chip>
                      <v-chip
                        v-if="space.have_three_d && !space.attachments.three_d_picture.attached"
                        small
                        color="amber darken-2"
                        outlined
                        :to="`${gym.adminPath}/spaces/${space.id}/take-three-d-picture`"
                      >
                        <v-icon left x-small>
                          {{ mdiCamera }}
                        </v-icon>
                        Capture manquante
                      </v-chip>
                      <v-chip
                        v-if="space.representation_type !== '3d'"
                        small
                        color="amber darken-2"
                        outlined
                        title="Ce secteur est représenté en 2D sur les pages dédiées aux grimpeurs et grimpeuses"
                        :to="`${space.path}/edit?redirect_to=${$route.fullPath}`"
                      >
                        2D
                      </v-chip>
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
                          v-if="space.have_three_d"
                          @click="startEditSpace(space)"
                        >
                          <v-list-item-icon>
                            <v-icon>{{ mdiCursorMove }}</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>
                            {{ $t('actions.move') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          v-if="space.have_three_d"
                          :to="`${gym.adminPath}/spaces/${space.id}/take-three-d-picture`"
                        >
                          <v-list-item-icon>
                            <v-icon>{{ mdiCamera }}</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>
                            Prendre la capture
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          v-if="space.have_three_d"
                          :to="`${gym.adminPath}/spaces/${space.id}/edit-three-d?redirect_to=${$route.fullPath}`"
                        >
                          <v-list-item-icon>
                            <v-icon>{{ mdiVectorDifferenceAb }}</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>
                            Éditer les secteurs
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          :to="`${space.path}/upload-3d?redirect_to=${$route.fullPath}`"
                        >
                          <v-list-item-icon>
                            <v-icon>
                              {{ mdiImport }}
                            </v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>
                            <span v-text="space.have_three_d ? 'Réimporter le 3D' : 'Importer un 3D'" />
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          :to="`${space.path}/edit?redirect_to=${$route.fullPath}`"
                        >
                          <v-list-item-icon>
                            <v-icon>
                              {{ mdiPencil }}
                            </v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>
                            {{ $t('actions.edit') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          v-if="space.have_three_d"
                          @click="startAdvancedOptions(space)"
                        >
                          <v-list-item-icon>
                            <v-icon>{{ mdiTune }}</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>
                            {{ $t('common.advancedOptions') }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-list-item-action>
                </v-list-item>
              </div>
              <div class="text-center mt-4">
                <v-btn
                  text
                  :to="`${gym.path}/spaces/new?redirect_to=${$route.fullPath}`"
                >
                  <v-icon left>
                    {{ mdiShapeSquarePlus }}
                  </v-icon>
                  Ajouter un espace
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
                  v-if="gym.representation_type === '2d_picture'"
                  class="border mb-0"
                >
                  <p class="font-weight-bold mb-1">
                    Note :
                  </p>
                  <p class="mb-1">
                    Votre salle est paramétrée pour utiliser la représentation 2D.
                  </p>
                  <p>
                    Quand vous aurez fini de créer vos 3D, cliquer sur <strong>[passer en 3D]</strong>.
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
                  v-if="gym.representation_type === '3d'"
                  class="border mb-0"
                >
                  <p class="mb-2">
                    Passer la représentation générale de votre salle en 2D.
                  </p>
                  <p>
                    Chaque espace peut être en 3D ou en 2D, pensez à paraméter chacun d'eux selon ce que vous voulez faire.
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
            </v-tab-item>
            <v-tab-item>
              <v-skeleton-loader
                v-if="loadingThreeDElement"
                type="list"
              />
              <div v-else>
                <v-list-item
                  v-for="(threeDElement, threeDElementIndex) in threeDElements"
                  :key="`three-d-element-${threeDElementIndex}`"
                  class="px-0"
                  @mouseenter="highlightAsset(threeDElement)"
                >
                  <v-list-item-avatar
                    v-if="threeDElement.gym_three_d_asset.attachments.picture.attached"
                  >
                    <v-img :src="imageVariant(threeDElement.gym_three_d_asset.attachments.picture, { fit: 'scale-down', height: 100, width: 100 })" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ threeDElement.gym_three_d_asset.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ threeDElement.gym_three_d_asset.description }}
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
                          @click="startEditAsset(threeDElement)"
                        >
                          <v-list-item-icon>
                            <v-icon>{{ mdiCursorMove }}</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>
                            {{ $t('actions.move') }}
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="deleteThreeDElement(threeDElement)">
                          <v-list-item-icon>
                            <v-icon color="red">
                              {{ mdiTrashCan }}
                            </v-icon>
                          </v-list-item-icon>
                          <v-list-item-title class="red--text">
                            {{ $t('actions.delete') }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-list-item-action>
                </v-list-item>
              </div>

              <!-- ADD ASSET BUTTON AND MODAL-->
              <div class="mt-4">
                <div class="text-center">
                  <v-btn
                    text
                    @click="openAssetModal"
                  >
                    <v-icon left>
                      {{ mdiShapeSquarePlus }}
                    </v-icon>
                    Ajouter une décoration
                  </v-btn>
                </div>
                <v-dialog
                  v-model="addAssetsModal"
                  width="500"
                >
                  <v-card>
                    <v-card-title>
                      <v-icon left class="mr-4">
                        {{ mdiSprout }}
                      </v-icon>
                      Liste des décorations
                    </v-card-title>
                    <div class="px-4 pb-4">
                      <div v-if="loadingThreeDAsset">
                        Chargement des décorations
                      </div>
                      <div v-else>
                        <v-list>
                          <v-list-item
                            v-for="(asset, assetIndex) in threeDAssets"
                            :key="`asset-${assetIndex}`"
                          >
                            <v-list-item-avatar v-if="asset.attachments.picture.attached">
                              <v-img :src="imageVariant(asset.attachments.picture, { fit: 'scale-down', height: 100, width: 100 })" />
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <div class="d-flex">
                                <div>
                                  <v-list-item-title>
                                    {{ asset.name }}
                                  </v-list-item-title>
                                  <v-list-item-subtitle class="text-wrap">
                                    {{ asset.description }}
                                  </v-list-item-subtitle>
                                </div>
                                <div class="ml-auto">
                                  <v-btn
                                    text
                                    outlined
                                    class="ml-auto"
                                    :disabled="loadingAddAsset"
                                    @click="addAsset(asset)"
                                  >
                                    <v-icon left>
                                      {{ mdiPlus }}
                                    </v-icon>
                                    {{ $t('actions.add') }}
                                  </v-btn>
                                </div>
                              </div>
                            </v-list-item-content>
                            <v-list-item-action
                              v-if="asset.gym_id !== null || $auth.user.super_admin"
                            >
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
                                    :to="`${gym.adminPath}/three-d-assets/${asset.id}/edit`"
                                  >
                                    <v-list-item-icon>
                                      <v-icon>{{ mdiPencil }}</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title>
                                      {{ $t('actions.edit') }}
                                    </v-list-item-title>
                                  </v-list-item>
                                </v-list>
                              </v-menu>
                            </v-list-item-action>
                          </v-list-item>
                        </v-list>
                        <div class="text-center mt-4">
                          <v-btn
                            text
                            :to="`${gym.adminPath}/three-d-assets/new`"
                          >
                            <v-icon left>
                              {{ mdiImport }}
                            </v-icon>
                            Importer une décoration
                          </v-btn>
                        </div>
                      </div>
                    </div>
                  </v-card>
                </v-dialog>
              </div>
            </v-tab-item>
          </v-tabs-items>
        </div>

        <!-- SPACE EDIT -->
        <div v-if="editSpace !== null">
          <p class="border-bottom pb-2">
            Edition de : <strong class="text-decoration-underline">{{ editSpace.name }}</strong>
          </p>
          <p class="font-weight-bold mb-1">
            Position de l'espace
          </p>
          <p class="text--disabled">
            Glissez déposez l'espace pour le positionner par rapport aux autres. Vous pouvez le surélever par rapport au sol ou le faire tourner.
          </p>
          <v-text-field
            v-model="spaceElevation"
            label="Hauteur par rapport au sol"
            suffix="mètre"
            type="number"
            step="0.1"
            dense
            outlined
          />
          <v-text-field
            v-model="spaceRotation.y"
            label="Rotation de l'espace"
            suffix="deg"
            type="number"
            outlined
            dense
          />
          <p class="font-weight-bold mb-1">
            Position du label
          </p>
          <p class="text--disabled">
            Par défaut le label de l'espace est centre sur l'espace, soit :
            50% de la dimension de l'espace sur X, Y et Z.
          </p>
          <v-text-field
            v-model="labelX"
            label="Centrage X"
            suffix="%"
            type="number"
            outlined
            dense
            @input="emitLabelPosition"
          />
          <v-text-field
            v-model="labelZ"
            label="Centrage Z"
            suffix="%"
            type="number"
            outlined
            dense
            @input="emitLabelPosition"
          />
          <v-text-field
            v-model="labelY"
            label="Centrage haut / bas"
            suffix="%"
            type="number"
            outlined
            dense
            @input="emitLabelPosition"
          />
          <div class="text-right">
            <v-btn
              text
              outlined
              small
              @click="cancelEditingSpace"
            >
              {{ $t('actions.cancel') }}
            </v-btn>
            <v-btn
              small
              color="primary"
              elevation="0"
              :loading="editSpaceLoading"
              @click="saveSpace"
            >
              {{ $t('actions.save') }}
            </v-btn>
          </div>
        </div>

        <!-- ADVANCED OPTIONS -->
        <div v-if="advancedOptions">
          <p class="text-decoration-underline mt-2">
            Options avancées de : <strong>{{ editAdvancedOptionSpace.name }}</strong>
          </p>
          <v-checkbox
            v-model="three_d_parameters.color_correction_sketchup_exports"
            label="Corriger les couleurs des exports Sketchup"
            hide-details
          />
          <v-checkbox
            v-model="three_d_parameters.highlight_edges"
            label="Marquer les arrêtes pour améliorer la lisibilité des structures"
          />
          <div class="text-right">
            <v-btn
              text
              outlined
              small
              @click="cancelEditingAdvancedOptions"
            >
              {{ $t('actions.cancel') }}
            </v-btn>
            <v-btn
              small
              color="primary"
              elevation="0"
              :loading="editSpaceLoading"
              @click="saveAdvancedOptions"
            >
              {{ $t('actions.save') }}
            </v-btn>
          </div>
        </div>

        <!-- ASSET EDIT -->
        <div v-if="editAsset !== null">
          <p>
            Edition de : <strong class="text-decoration-underline">{{ editAsset.gym_three_d_asset.name }}</strong>
          </p>
          <p>
            Déplacer la décoration pour la placer<br>
            dans votre espace 3D
          </p>
          <v-text-field
            v-model="assetElevation"
            label="Hauteur par rapport au sol"
            suffix="mètre"
            type="number"
            step="0.1"
            outlined
            dense
          />
          <v-text-field
            v-model="assetRotation.y"
            label="Rotation de la décoration"
            suffix="deg"
            type="number"
            outlined
            dense
          />
          <div class="d-flex">
            <v-btn
              small
              icon
              :loading="editAssetLoading"
              @click="deleteThreeDElement(editAsset)"
            >
              <v-icon
                small
                color="red"
              >
                {{ mdiTrashCan }}
              </v-icon>
            </v-btn>
            <v-btn
              text
              outlined
              small
              class="ml-auto"
              @click="cancelEditingAsset"
            >
              {{ $t('actions.cancel') }}
            </v-btn>
            <v-btn
              small
              color="primary"
              elevation="0"
              :loading="editAssetLoading"
              @click="saveAsset"
            >
              {{ $t('actions.save') }}
            </v-btn>
          </div>
        </div>
      </v-sheet>
    </div>
    <div
      v-else
      class="text-center mt-16"
    >
      {{ $t('common.loading') }}
    </div>
  </div>
</template>

<script>
import {
  mdiCubeOutline,
  mdiArrowLeft,
  mdiShapeSquarePlus,
  mdiImport,
  mdiVectorDifferenceAb,
  mdiSprout,
  mdiPlus,
  mdiDotsVertical,
  mdiPencil,
  mdiTrashCan,
  mdiCursorMove,
  mdiCamera,
  mdiMenuRight,
  mdiMenuDown,
  mdiTune
} from '@mdi/js'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import GymSpaceApi from '~/services/oblyk-api/GymSpaceApi'
import GymSpace from '~/models/GymSpace'
import GymThreeDElementApi from '~/services/oblyk-api/GymThreeDElementApi'
import GymThreeDElement from '~/models/GymThreeDElement'
import GymThreeDAssetApi from '~/services/oblyk-api/GymThreeDAssetApi'
import GymThreeDAsset from '~/models/GymThreeDAsset'
import GymApi from '~/services/oblyk-api/GymApi'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
const GymThreeDEditor = () => import('~/components/gyms/GymThreeDEditor')

export default {
  components: { GymThreeDEditor },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern, ImageVariantHelpers],
  middleware: ['auth', 'gymAdmin'],

  data () {
    return {
      startEditingSpace: false,
      editSpace: null,
      editSpaceLoading: false,
      gymSpaces: [],
      loadingSpaces: true,
      showSpaceId: null,
      spaceElevation: 0,
      spaceRotation: {
        x: 0,
        y: 0,
        z: 0
      },
      tab: 0,
      labelX: null,
      labelZ: null,
      labelY: null,
      labelPositionProps: null,
      saveLabelPosition: null,

      loadingThreeDElement: true,
      threeDElements: [],
      addAssetsModal: false,

      editAsset: null,
      startEditingAsset: false,
      editAssetLoading: false,
      loadingThreeDAsset: true,
      loadingAddAsset: false,
      assetElevation: 0,
      assetRotation: {
        x: 0,
        y: 0,
        z: 0
      },
      threeDAssets: [],

      editAdvancedOptionSpace: null,
      advancedOptions: false,
      three_d_parameters: {
        color_correction_sketchup_exports: null,
        highlight_edges: null
      },

      loadingSwitch: false,
      showMoreOption: false,

      mdiCubeOutline,
      mdiArrowLeft,
      mdiShapeSquarePlus,
      mdiImport,
      mdiVectorDifferenceAb,
      mdiSprout,
      mdiPlus,
      mdiDotsVertical,
      mdiPencil,
      mdiTrashCan,
      mdiCursorMove,
      mdiCamera,
      mdiMenuRight,
      mdiMenuDown,
      mdiTune
    }
  },

  watch: {
    gym () {
      if (this.gym && this.gym.representation_type === '2d_picture') {
        this.showMoreOption = true
      }
    }
  },

  mounted () {
    this.getSpaces()
    this.getThreeDElements()
  },

  methods: {
    getSpaces () {
      this.loadingSpaces = true
      new GymSpaceApi(this.$axios, this.$auth)
        .all(
          this.$route.params.gymId
        )
        .then((resp) => {
          this.gymSpaces = []
          for (const space of resp.data) {
            this.gymSpaces.push(new GymSpace({ attributes: space }))
          }
        })
        .finally(() => {
          this.loadingSpaces = false
        })
    },

    getThreeDElements () {
      this.loadingThreeDElement = true
      new GymThreeDElementApi(this.$axios, this.$auth)
        .all(this.$route.params.gymId)
        .then((resp) => {
          this.threeDElements = []
          for (const space of resp.data) {
            this.threeDElements.push(new GymThreeDElement({ attributes: space }))
          }
        })
        .finally(() => {
          this.loadingThreeDElement = false
        })
    },

    showSpace (space) {
      if (this.showSpaceId === space.id) {
        this.showSpaceId = null
      } else {
        this.showSpaceId = space.id
      }
    },

    startEditSpace (space) {
      this.editSpace = space
      if (space.three_d_position?.y) {
        this.spaceElevation = space.three_d_position.y
      }
      if (space.three_d_rotation) {
        this.spaceRotation = space.three_d_rotation
      } else {
        this.spaceRotation = { x: 0, y: 0, z: 0 }
      }
      if (space.three_d_label_options) {
        const labelOptions = { ...space.three_d_label_options }
        this.labelX = labelOptions?.x === null ? 50 : labelOptions.x
        this.labelY = labelOptions?.y === null ? 50 : labelOptions.y
        this.labelZ = labelOptions?.z === null ? 50 : labelOptions.z
      } else {
        this.labelX = 50
        this.labelY = 50
        this.labelZ = 50
      }
      this.saveLabelPosition = {
        x: this.labelX,
        y: this.labelY,
        z: this.labelZ
      }
      this.startEditingSpace = true
      setTimeout(() => {
        this.$refs.gymThreeDEditor.startEditingSpace(space)
      }, 100)
    },

    emitLabelPosition () {
      this.labelPositionProps = {
        x: parseInt(this.labelX),
        y: parseInt(this.labelY),
        z: parseInt(this.labelZ),
        id: this.editSpace.id
      }
    },

    saveSpace () {
      this.editSpaceLoading = true
      const position = this.$refs.gymThreeDEditor.getSpacePosition()
      const xyz = {
        x: position.x,
        y: position.y,
        z: position.z
      }
      const rotation = {
        x: this.spaceRotation.x,
        y: this.spaceRotation.y,
        z: this.spaceRotation.z
      }
      const threeDLabelOptions = {
        x: parseInt(this.labelX),
        y: parseInt(this.labelY),
        z: parseInt(this.labelZ)
      }
      this.$refs.gymThreeDEditor.endEditingSpace()
      new GymSpaceApi(this.$axios, this.$auth)
        .update({
          gym_id: this.gym.id,
          id: this.editSpace.id,
          three_d_position: xyz,
          three_d_rotation: rotation,
          three_d_label_options: threeDLabelOptions
        })
        .finally(() => {
          this.editSpaceLoading = false
          this.editSpace = null
          this.startEditingSpace = false
        })
    },

    cancelEditingSpace () {
      this.$refs.gymThreeDEditor.cancelEditingSpace()
      this.labelPositionProps = {
        x: parseInt(this.saveLabelPosition.x),
        y: parseInt(this.saveLabelPosition.y),
        z: parseInt(this.saveLabelPosition.z),
        id: this.editSpace.id
      }
      this.labelX = null
      this.labelZ = null
      this.labelY = null
      this.editSpace = null
      this.startEditingSpace = false
    },

    // ASSETS
    getThreeDAssets () {
      this.loadingThreeDAsset = true
      new GymThreeDAssetApi(this.$axios, this.$auth)
        .all(this.$route.params.gymId)
        .then((resp) => {
          this.threeDAssets = []
          for (const space of resp.data) {
            this.threeDAssets.push(new GymThreeDAsset({ attributes: space }))
          }
        })
        .finally(() => {
          this.loadingThreeDAsset = false
        })
    },

    openAssetModal () {
      if (this.threeDAssets.length === 0) {
        this.getThreeDAssets()
      }
      this.addAssetsModal = true
    },

    addAsset (asset) {
      this.loadingAddAsset = true
      new GymThreeDElementApi(this.$axios, this.$auth)
        .create(
          {
            gym_id: this.gym.id,
            gym_three_d_asset_id: asset.id,
            three_d_position: {
              x: 0,
              y: 0,
              z: 0
            }
          }
        ).then(() => {
          location.reload()
        })
        .finally(() => {
          this.loadingAddAsset = false
        })
    },

    startEditAsset (asset) {
      this.editAsset = asset
      if (asset.three_d_position?.y !== null) {
        this.assetElevation = asset.three_d_position.y
      }
      this.assetRotation = asset.three_d_rotation
      this.startEditingAsset = true
      setTimeout(() => {
        this.$refs.gymThreeDEditor.startEditingAsset(asset)
      }, 100)
    },

    cancelEditingAsset () {
      this.$refs.gymThreeDEditor.cancelEditingAsset()
      this.editAsset = null
      this.startEditingAsset = false
    },

    deleteThreeDElement (asset) {
      this.editAssetLoading = true
      new GymThreeDElementApi(this.$axios, this.$auth)
        .delete(this.gym.id, asset.id)
        .finally(() => {
          location.reload()
        })
    },

    saveAsset () {
      this.editAssetLoading = true
      const position = this.$refs.gymThreeDEditor.getAssetPosition()
      const xyz = {
        x: position.x,
        y: position.y,
        z: position.z
      }
      const rotation = {
        x: this.assetRotation.x,
        y: this.assetRotation.y,
        z: this.assetRotation.z
      }
      this.$refs.gymThreeDEditor.endEditingAsset()
      new GymThreeDElementApi(this.$axios, this.$auth)
        .update({
          gym_id: this.gym.id,
          id: this.editAsset.id,
          three_d_position: xyz,
          three_d_rotation: rotation
        })
        .finally(() => {
          this.editAssetLoading = false
          this.editAsset = null
          this.startEditingAsset = false
        })
    },

    highlightSpace (space) {
      if (this.$refs.gymThreeDEditor) {
        this.$refs.gymThreeDEditor.unGlossyInteractiveElements()
        this.$refs.gymThreeDEditor.glossySpace(space.id)
      }
    },

    highlightAsset (asset) {
      if (this.$refs.gymThreeDEditor) {
        this.$refs.gymThreeDEditor.unGlossyInteractiveElements()
        this.$refs.gymThreeDEditor.glossyAsset(asset.id)
      }
    },

    switchRepresentationTo (representationType) {
      this.loadingSwitch = true
      new GymApi(this.$axios, this.$auth)
        .update({ id: this.gym.id, representation_type: representationType })
        .finally(() => {
          location.reload()
        })
    },

    startAdvancedOptions (space) {
      this.advancedOptions = true
      this.editAdvancedOptionSpace = space
      const sketchup = space.three_d_parameters?.color_correction_sketchup_exports === undefined ? true : space.three_d_parameters?.color_correction_sketchup_exports
      const edges = space.three_d_parameters?.highlight_edges === undefined ? true : space.three_d_parameters?.highlight_edges
      this.three_d_parameters.color_correction_sketchup_exports = sketchup
      this.three_d_parameters.highlight_edges = edges
    },

    saveAdvancedOptions () {
      this.editSpaceLoading = true
      new GymSpaceApi(this.$axios, this.$auth)
        .update({
          gym_id: this.gym.id,
          id: this.editAdvancedOptionSpace.id,
          three_d_parameters: this.three_d_parameters
        })
        .finally(() => {
          location.reload()
        })
    },

    cancelEditingAdvancedOptions () {
      this.advancedOptions = false
      this.editAdvancedOptionSpace = null
    }
  }
}
</script>

<style lang="scss">
.spaces-list-three-d {
  position: absolute;
  top: 0;
  left: 0;
  will-change: opacity;
  transition: opacity 0.2s;
  opacity: 1;
  .space-label-in-space {
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
    .space-label-in-space {
      background-color: rgba(255, 255, 255, 0);
    }
  }
}
</style>
