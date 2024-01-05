<template>
  <v-container fluid>
    <spinner v-if="loadingGymLabelTemplate || gym === null" />
    <div v-else>
      <v-breadcrumbs :items="breadcrumbs" />
      <v-row class="gym-label-container">
        <v-col
          cols="4"
          class="full-height"
        >
          <v-card class="full-height d-flex flex-column">
            <v-card-title class="py-2 border-bottom">
              <v-icon left>
                {{ mdiTune }}
              </v-icon>
              Paramètre de l'étiquette
            </v-card-title>
            <div class="py-4 attributes-list flex-grow-1 flex-shrink-0 overflow-y-auto">
              <div
                v-if="!editing"
                class="d-flex flex-column full-height"
              >
                <div class="px-4 overflow-y-auto">
                  <description-line
                    :icon="mdiAlphaA"
                    :item-title="$t('models.gymLabelTemplate.name')"
                    :item-value="gymLabelTemplate.name"
                    class="mb-3"
                  />
                  <description-line
                    :icon="mdiViewList"
                    :item-title="$t('models.gymLabelTemplate.label_direction')"
                    :item-value="$t(`models.gymLabelTemplate.label_direction_list.${gymLabelTemplate.label_direction}`)"
                    class="mb-3"
                  />
                  <description-line
                    :icon="mdiFormatLetterCase"
                    :item-title="$t('models.gymLabelTemplate.font_family')"
                    :item-value="gymLabelTemplate.font.name"
                    class="mb-5"
                  >
                    <template #content>
                      <div
                        class="svg-container --full-height"
                        style="height: 15px"
                        :style="$vuetify.theme.dark ? 'fill: white' : 'fill: black'"
                        v-html="gymLabelTemplate.font.svg_preview"
                      />
                    </template>
                  </description-line>
                  <description-line
                    :icon="mdiBorderAll"
                    :item-title="$t('models.gymLabelTemplate.border_style')"
                    class="mb-5"
                  >
                    <template #content>
                      <v-chip
                        outlined
                        title="Style de bordure"
                      >
                        <v-icon left>
                          {{ mdiFormatLineStyle }}
                        </v-icon>
                        {{ $t(`models.gymLabelTemplate.border_styles.${gymLabelTemplate.border_style['border-style']}`) }}
                      </v-chip>
                      <v-chip
                        v-if="gymLabelTemplate.border_style['border-style'] !== 'none'"
                        outlined
                        title="Couleur des bordures"
                      >
                        <v-icon
                          left
                          :color="gymLabelTemplate.border_style['border-color']"
                        >
                          {{ mdiCircle }}
                        </v-icon>
                        Couleur
                      </v-chip>
                      <v-chip
                        v-if="gymLabelTemplate.border_style['border-style'] !== 'none'"
                        outlined
                        title="Épaisseur des bordures"
                      >
                        <v-icon left>
                          {{ mdiFormatLineWeight }}
                        </v-icon>
                        {{ gymLabelTemplate.border_style['border-width'] }}
                      </v-chip>
                      <v-chip
                        v-if="gymLabelTemplate.border_style['border-style'] !== 'none'"
                        outlined
                        title="Arrondi des bordures"
                      >
                        <v-icon left>
                          {{ mdiSquareRoundedOutline }}
                        </v-icon>
                        {{ gymLabelTemplate.border_style['border-radius'] }}
                      </v-chip>
                    </template>
                  </description-line>
                  <description-line
                    :icon="mdiTune"
                    :item-title="$t('models.gymLabelTemplate.layout_options')"
                    class="mb-5"
                  >
                    <template #content>
                      <v-chip
                        outlined
                        title="Marge d'impression"
                      >
                        <v-icon left>
                          {{ mdiCropFree }}
                        </v-icon>
                        {{ gymLabelTemplate.layout_options['page-margin'] }}
                      </v-chip>
                    </template>
                  </description-line>
                  <description-line
                    :icon="mdiQrcode"
                    :item-title="$t('models.gymLabelTemplate.qr_code_position')"
                    :item-value="$t(`models.gymLabelTemplate.qr_code_position_list.${gymLabelTemplate.qr_code_position}`)"
                    class="mb-3"
                  />
                  <description-line
                    :icon="mdiFormatListText"
                    :item-title="$t('models.gymLabelTemplate.label_arrangement')"
                    :item-value="$t(`models.gymLabelTemplate.label_arrangement_list.${gymLabelTemplate.label_arrangement}`)"
                    class="mb-3"
                  />
                  <description-line
                    :icon="mdiExponent"
                    :item-title="$t('models.gymLabelTemplate.grade_style')"
                    :item-value="$t(`models.gymLabelTemplate.grade_style_list.${gymLabelTemplate.grade_style}`)"
                    class="mb-3"
                  />
                  <description-line
                    :icon="mdiFileExportOutline"
                    :item-title="$t('models.gymLabelTemplate.page_format')"
                    :item-value="gymLabelTemplate.page_format"
                    class="mb-3"
                  />
                  <description-line
                    :icon="mdiPhoneRotateLandscape"
                    :item-title="$t('models.gymLabelTemplate.page_direction')"
                    :item-value="$t(`models.gymLabelTemplate.page_direction_list.${gymLabelTemplate.page_direction}`)"
                    class="mb-3"
                  />
                  <description-line
                    :icon="mdiEyeSettings"
                    item-title="Options d'affichage"
                    class="mb-3"
                  >
                    <template #content>
                      <p
                        v-for="(displayType, displayTypeIndex) in displayList"
                        :key="`display-type-index-${displayTypeIndex}`"
                        class="mb-0"
                      >
                        <v-icon
                          left
                          small
                        >
                          {{ gymLabelTemplate[displayType] ? mdiCheckboxMarked : mdiCheckboxBlankOutline }}
                        </v-icon>
                        {{ $t(`models.gymLabelTemplate.${displayType}`) }}
                      </p>
                    </template>
                  </description-line>
                </div>

                <!-- Edit and more options -->
                <div class="px-4 pt-4 text-right mt-auto">
                  <v-btn
                    outlined
                    text
                    @click="editing = true"
                  >
                    <v-icon left>
                      {{ mdiPencil }}
                    </v-icon>
                    {{ $t('actions.edit') }}
                  </v-btn>
                  <v-btn
                    v-if="gymLabelTemplate.archived_at !== null"
                    outlined
                    text
                    @click="unarchived"
                  >
                    <v-icon left>
                      {{ mdiPower }}
                    </v-icon>
                    {{ $t('actions.activate') }}
                  </v-btn>
                  <v-menu>
                    <template #activator="{ on, attrs }">
                      <v-btn
                        :loading="loadingAction"
                        icon
                        text
                        outlined
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon>
                          {{ mdiDotsVertical }}
                        </v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="editing = true">
                        <v-list-item-icon>
                          <v-icon>
                            {{ mdiPencil }}
                          </v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                          {{ $t('actions.edit') }}
                        </v-list-item-title>
                      </v-list-item>
                      <v-divider />
                      <v-list-item
                        v-if="gymLabelTemplate.archived_at === null"
                        @click="archived()"
                      >
                        <v-list-item-icon>
                          <v-icon color="red">
                            {{ mdiPower }}
                          </v-icon>
                        </v-list-item-icon>
                        <v-list-item-title class="red--text">
                          {{ $t('actions.deactivate') }}
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="deleteGymLabel()">
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
                </div>
              </div>
              <div
                v-else
                class="full-height"
              >
                <gym-label-template-form
                  :gym="gym"
                  :gym-label-template="gymLabelTemplate"
                  submit-methode="put"
                  :callback="updateCallback"
                  :finish-callback="finishEditing"
                />
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col
          cols="8"
          class="full-height"
        >
          <v-card class="full-height d-flex flex-column">
            <v-card-title class="d-flex py-2 border-bottom">
              <div>
                <v-icon left>
                  {{ mdiEyeOutline }}
                </v-icon>
                Prévisualisation
              </div>
              <div class="ml-auto d-flex">
                <v-btn
                  target="_blank"
                  :to="`${gymLabelTemplate.path}/print?preview_routes_set=${previewRouteSet}&reference=Prévisualisation`"
                  icon
                >
                  <v-icon>
                    {{ mdiPrinter }}
                  </v-icon>
                </v-btn>
                <v-btn
                  :loading="loadingPreview"
                  icon
                  @click="preview"
                >
                  <v-icon>
                    {{ mdiRefresh }}
                  </v-icon>
                </v-btn>
                <v-select
                  v-model="previewRouteSet"
                  :items="previewSets"
                  item-text="text"
                  item-value="value"
                  class="ml-1"
                  label="Lignes pour la prévisualisation"
                  outlined
                  dense
                  hide-details
                  @input="iframeRefreshKey += 1"
                />
              </div>
            </v-card-title>
            <iframe
              :ref="`preview-refresh-${iframeRefreshKey}`"
              :src="`${gymLabelTemplate.path}/print?preview=true&preview_index=${iframeRefreshKey}&preview_routes_set=${previewRouteSet}&reference=Prévisualisation`"
              class="label-template-viewer"
            />
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import {
  mdiAlphaA,
  mdiViewList,
  mdiFormatLetterCase,
  mdiQrcode,
  mdiFormatListText,
  mdiExponent,
  mdiEyeSettings,
  mdiCheckboxMarked,
  mdiCheckboxBlankOutline,
  mdiPhoneRotateLandscape,
  mdiFileExportOutline,
  mdiRefresh,
  mdiTune,
  mdiEyeOutline,
  mdiPrinter,
  mdiBorderAll,
  mdiCircle,
  mdiFormatLineWeight,
  mdiFormatLineStyle,
  mdiSquareRoundedOutline,
  mdiPencil,
  mdiDotsVertical,
  mdiDelete,
  mdiPower,
  mdiCropFree
} from '@mdi/js'
import { GymLabelTemplateConcern } from '~/concerns/GymLabelTemplateConcern'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import Spinner from '~/components/layouts/Spiner'
import DescriptionLine from '~/components/ui/DescriptionLine'
import GymLabelTemplateForm from '~/components/gymLabelTemplates/forms/GymLabelTemplateForm'
import GymLabelTemplateApi from '~/services/oblyk-api/GymLabelTemplateApi'
import GymLabelTemplate from '~/models/GymLabelTemplate'

export default {
  components: { GymLabelTemplateForm, DescriptionLine, Spinner },
  mixins: [GymLabelTemplateConcern, GymFetchConcern],
  meta: { orphanRoute: true },
  middleware: ['auth', 'gymAdmin'],

  data () {
    return {
      loadingPreview: false,
      loadingAction: false,
      pdfPreview: null,
      displayList: [
        'display_points',
        'display_openers',
        'display_opened_at',
        'display_name',
        'display_description',
        'display_anchor',
        'display_climbing_style',
        'display_grade',
        'display_tag_and_hold'
      ],
      previewSets: [
        { value: 'simple', text: 'Voies simple' },
        { value: 'multi_pitch', text: 'Voies avec plusieurs longueurs' }
      ],
      previewRouteSet: 'simple',
      editing: false,
      iframeRefreshKey: 0,

      mdiAlphaA,
      mdiViewList,
      mdiFormatLetterCase,
      mdiQrcode,
      mdiFormatListText,
      mdiExponent,
      mdiEyeSettings,
      mdiCheckboxMarked,
      mdiCheckboxBlankOutline,
      mdiPhoneRotateLandscape,
      mdiFileExportOutline,
      mdiRefresh,
      mdiTune,
      mdiEyeOutline,
      mdiPrinter,
      mdiBorderAll,
      mdiCircle,
      mdiFormatLineWeight,
      mdiFormatLineStyle,
      mdiSquareRoundedOutline,
      mdiPencil,
      mdiDotsVertical,
      mdiDelete,
      mdiPower,
      mdiCropFree
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Étiquette : %{name}'
      },
      en: {
        metaTitle: 'Label : %{name}'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle', { name: this.gymLabelTemplate?.name })
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
          text: this.$t('components.gymAdmin.labelTemplate'),
          to: `${this.gym?.adminPath}/label-templates`,
          exact: true
        },
        {
          text: this.gymLabelTemplate?.name,
          to: `${this.gym?.adminPath}/label-templates/${this.gymLabelTemplate?.id}`,
          exact: true
        }
      ]
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.editing = urlParams.get('start_editing') === 'true'
  },

  methods: {
    updateCallback (gymLabelTemplate) {
      this.gymLabelTemplate = gymLabelTemplate
      this.preview()
    },

    finishEditing () {
      this.editing = false
    },

    preview () {
      this.iframeRefreshKey += 1
    },

    archived () {
      if (confirm(this.$t('common.areYouSurArchived'))) {
        this.loadingAction = true
        new GymLabelTemplateApi(this.$axios, this.$auth)
          .archived(this.gym.id, this.gymLabelTemplate.id)
          .then((resp) => {
            this.gymLabelTemplate = new GymLabelTemplate({ attributes: resp.data })
          })
          .finally(() => {
            this.loadingAction = false
          })
      }
    },

    unarchived () {
      this.loadingAction = true
      new GymLabelTemplateApi(this.$axios, this.$auth)
        .unarchived(this.gym.id, this.gymLabelTemplate.id)
        .then((resp) => {
          this.gymLabelTemplate = new GymLabelTemplate({ attributes: resp.data })
        })
        .finally(() => {
          this.loadingAction = false
        })
    },

    deleteGymLabel () {
      if (confirm(this.$t('common.areYouSurToDelete'))) {
        this.loadingAction = true
        new GymLabelTemplateApi(this.$axios, this.$auth)
          .delete({
            gym_id: this.gym.id,
            id: this.gymLabelTemplate.id
          })
          .then(() => {
            this.$router.push(`${this.gym.adminPath}/label-templates`)
          })
          .finally(() => {
            this.loadingAction = false
          })
      }
    }
  }
}
</script>

<style lang="scss">
.gym-label-container {
  height: calc(100vh - 125px);
  .label-template-viewer {
    height: 100%;
    width: 100%;
    border: none;
  }
  .attributes-list {
    max-height: calc(100% - 45px);
  }
}
</style>
