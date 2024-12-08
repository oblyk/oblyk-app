<template>
  <v-form
    class="full-height d-flex flex-column"
    @submit.prevent="submit()"
  >
    <div class="overflow-y-auto px-4 mb-5 pt-1">
      <v-text-field
        v-model="data.name"
        :prepend-icon="mdiAlphaA"
        :label="$t('models.gymLabelTemplate.name')"
        class="required-field"
        outlined
        hide-details
        required
        dense
      />
      <div v-if="isEditingForm()">
        <v-tabs
          v-model="step"
          class="mb-2"
          fixed-tabs
        >
          <v-tab>
            Étiquettes
          </v-tab>
          <v-tab>
            Disposition
          </v-tab>
          <v-tab>
            Page
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="step">
          <!-- Label part -->
          <v-tab-item>
            <div class="border rounded pa-2 mb-6">
              Dans la section <strong>"Étiquettes"</strong> on se concentre sur le rendu d'une étiquette, donc d'une voie ou d'un bloc sur votre fiche.
            </div>
            <border-input v-model="data.border_style" />
            <suffix-input
              v-if="data.label_arrangement === 'rectangular_horizontal'"
              key="data.label_options.rectangular_horizontal.height"
              v-model="data.label_options.rectangular_horizontal.height"
              suffix="mm"
              label="Hauteur d'une étiquette"
              dense
              :prepend-icon="mdiArrowExpandVertical"
            />
            <suffix-input
              v-if="data.label_arrangement === 'rectangular_vertical'"
              key="data.label_options.rectangular_vertical.top.height"
              v-model="data.label_options.rectangular_vertical.top.height"
              suffix="mm"
              label="Hauteur de la partie haute de l'étiquette"
              dense
              :prepend-icon="mdiArrowExpandVertical"
            />
            <suffix-input
              v-if="data.label_arrangement === 'rectangular_vertical'"
              key="data.label_options.rectangular_vertical.bottom.height"
              v-model="data.label_options.rectangular_vertical.bottom.height"
              suffix="mm"
              label="Hauteur de la partie basse de l'étiquette"
              dense
              :prepend-icon="mdiArrowExpandVertical"
            />
            <p class="text-decoration-underline mb-0">
              Style de l'étiquette :
            </p>
            <p class="text--disabled mb-1">
              Cliquez sur une section de l'étiquette pour la pérsonnaliser
            </p>
            <label-tag-model
              :type="data.label_arrangement"
              activable
              :callback="activeLabelPart"
            />
            <div class="text-right mb-4 mt-2">
              <v-dialog
                v-model="labelArrangementDialog"
                width="500"
              >
                <template #activator="{ on, attrs }">
                  <v-btn
                    text
                    outlined
                    small
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon left>
                      {{ mdiTableRow }}
                    </v-icon>
                    Changer le style d'étiquette
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <v-icon left>
                      {{ mdiTableRow }}
                    </v-icon>
                    Style de l'étiquette
                  </v-card-title>

                  <div class="px-4 pb-4">
                    <div
                      class="mb-3 hoverable pa-3 border rounded"
                      @click="selectLabelArrangement('rectangular_horizontal')"
                    >
                      <p class="font-weight-bold mb-2">
                        <v-icon
                          left
                          :color="data.label_arrangement === 'rectangular_horizontal' ? 'primary' : ''"
                        >
                          {{ data.label_arrangement === 'rectangular_horizontal' ? mdiRadioboxMarked : mdiRadioboxBlank }}
                        </v-icon>
                        Style 1 : Cotation, information et QrCode côte à côte
                      </p>
                      <label-tag-model type="rectangular_horizontal" />
                    </div>
                    <div
                      class="hoverable pa-3 border rounded"
                      @click="selectLabelArrangement('rectangular_vertical')"
                    >
                      <p class="font-weight-bold mb-2">
                        <v-icon
                          left
                          :color="data.label_arrangement === 'rectangular_vertical' ? 'primary' : ''"
                        >
                          {{ data.label_arrangement === 'rectangular_vertical' ? mdiRadioboxMarked : mdiRadioboxBlank }}
                        </v-icon>
                        Style 2 : information, cotation et QrCode en dessous
                      </p>
                      <label-tag-model type="rectangular_vertical" />
                    </div>
                  </div>
                </v-card>
              </v-dialog>
            </div>

            <!-- Visual Part -->
            <div v-if="labelPart === 'visual'">
              <grade-style-input
                key="data.grade_style"
                v-model="data.grade_style"
                :prepend-icon="mdiExponent"
              />
              <suffix-input
                key="data.label_options.visual.width"
                v-model="data.label_options.visual.width"
                suffix="mm"
                label="Largeur de la section"
                :prepend-icon="mdiArrowExpandHorizontal"
                dense
              />
            </div>

            <!-- Grade Part -->
            <div v-if="labelPart === 'grade'">
              <suffix-input
                key="data.label_options.grade.width"
                v-model="data.label_options.grade.width"
                suffix="mm"
                label="Largeur de la section"
                :prepend-icon="mdiArrowExpandHorizontal"
                dense
              />
              <suffix-input
                key="data.label_options.grade.font_size"
                v-model="data.label_options.grade.font_size"
                suffix="pt"
                label="Taille de la police"
                :prepend-icon="mdiFormatFontSizeIncrease"
                dense
              />
              <v-select
                key="data.label_options.grade.text_transform"
                v-model="data.label_options.grade.text_transform"
                :prepend-icon="mdiFormatLetterCase"
                label="Case de la cotation"
                :items="text_transform_items"
                item-text="text"
                item-value="value"
                outlined
                dense
              />
              <gym-label-font-input
                key="data.label_options.grade.font_family"
                v-model="data.label_options.grade.font_family"
                :prepend-icon="mdiFormatFont"
                dense
              />
              <v-checkbox
                v-for="(display, displayIndex) in ['display_points', 'display_grade']"
                :key="`display-form-index-${displayIndex}`"
                v-model="data[display]"
                :label="$t(`models.gymLabelTemplate.${display}`)"
                hide-details
              />
            </div>

            <!-- Information part -->
            <div v-if="labelPart === 'information'">
              <suffix-input
                key="data.label_options.information.font_size"
                v-model="data.label_options.information.font_size"
                suffix="pt"
                label="Taille de la police"
                :prepend-icon="mdiFormatFontSizeIncrease"
                dense
              />
              <gym-label-font-input
                key="data.label_options.infromation.font_family"
                v-model="data.label_options.information.font_family"
                :prepend-icon="mdiFormatFont"
                dense
              />
              <v-select
                v-if="data.label_arrangement === 'rectangular_vertical'"
                key="data.label_options.rectangular_vertical.top.vertical_align"
                v-model="data.label_options.rectangular_vertical.top.vertical_align"
                :prepend-icon="mdiFormatAlignTop"
                label="Alignement vertical du contenu de la section"
                :items="informationVerticals"
                item-text="text"
                item-value="value"
                outlined
                dense
              />
              <v-checkbox
                v-for="(display, displayIndex) in ['display_openers', 'display_opened_at', 'display_name', 'display_description', 'display_anchor', 'display_climbing_style']"
                :key="`display-form-index-${displayIndex}`"
                v-model="data[display]"
                :label="$t(`models.gymLabelTemplate.${display}`)"
                hide-details
              />
            </div>

            <!-- QrCode Part -->
            <div v-if="labelPart === 'qr_code'">
              <v-select
                key="data.qr_code_position"
                v-model="data.qr_code_position"
                :prepend-icon="mdiQrcode"
                :label="$t('models.gymLabelTemplate.qr_code_position')"
                :items="qr_code_position_items"
                item-text="text"
                item-value="value"
                outlined
                dense
              />
            </div>
          </v-tab-item>

          <!-- Arrangement part -->
          <v-tab-item>
            <div class="border rounded pa-2 mb-6">
              Dans la section <strong>"Disposition"</strong> on paramètre comment les étiquettes sont disposées sur la fiche.
            </div>
            <label-by-row-input
              v-model="data.label_direction"
              :prepend-icon="mdiViewList"
              dense
            />
            <label-vertical-align-input
              v-model="data.layout_options.align_items"
              :prepend-icon="mdiFormatAlignTop"
              dense
            />
            <suffix-input
              v-model="data.layout_options.row_gap"
              suffix="mm"
              label="Espacement vertical entre les étiquettes"
              dense
              :prepend-icon="mdiArrowExpandVertical"
            />
            <suffix-input
              v-if="data.label_direction !== 'one_by_row'"
              v-model="data.layout_options.column_gap"
              suffix="mm"
              label="Espacement horizontal entre les étiquettes"
              dense
              :prepend-icon="mdiArrowExpandHorizontal"
            />
          </v-tab-item>

          <!-- Page part -->
          <v-tab-item>
            <div class="border rounded pa-2 mb-6">
              <p>
                Dans la section <strong>"Page"</strong> vous pouvez paramétrer les paramètres globaux de votre fiche.
              </p>
              <p>
                Dans les champs de texte, vous pouvez utiliser les codes suivants pour qu'ils soient remplacés par les valeurs correspondantes lors de l'impression.
              </p>
              <ul class="pl-4">
                <li><strong>%type_de_groupe%</strong> : sera égale à "secteur" si vous imprimez par secteur, ou "relais" si vous imprimez pas relais.</li>
                <li><strong>%reference%</strong> : prendra le nom du secteur ou numéro du relais.</li>
                <li><strong>%salle%</strong> : prendra le nom de votre salle.</li>
              </ul>
            </div>

            <p class="text-decoration-underline mb-2 mt-3 font-weight-bold">
              Paramètres globaux :
            </p>
            <div class="border rounded pa-2 back-app-color">
              <gym-label-font-input
                v-model="data.font_family"
                :label="$t('models.gymLabelTemplate.font_family')"
                :prepend-icon="mdiFormatLetterCase"
                dense
              />
              <layout-page-margin-input
                v-model="data.layout_options.page_margin"
              />
              <v-row>
                <v-col>
                  <v-select
                    v-model="data.page_format"
                    :prepend-icon="mdiFileExportOutline"
                    :label="$t('models.gymLabelTemplate.page_format')"
                    :items="page_format_items"
                    item-text="text"
                    item-value="value"
                    hide-details
                    outlined
                    dense
                  />
                </v-col>
                <v-col>
                  <v-select
                    v-model="data.page_direction"
                    :prepend-icon="mdiPhoneRotateLandscape"
                    :label="$t('models.gymLabelTemplate.page_direction')"
                    :items="page_direction_items"
                    item-text="text"
                    item-value="value"
                    hide-details
                    outlined
                    dense
                  />
                </v-col>
              </v-row>
            </div>

            <!-- Header setting -->
            <p class="text-decoration-underline mb-1 mt-5 font-weight-bold">
              Entête de page :
            </p>
            <div class="border rounded pa-2 back-app-color">
              <v-checkbox
                v-model="data.header_options.display"
                label="Afficher une entête"
                class="mt-0"
                hide-details
              />
              <div
                v-if="data.header_options.display"
                class="pt-4"
              >
                <suffix-input
                  v-model="data.header_options.height"
                  suffix="mm"
                  label="Hauteur de l'entête"
                  dense
                />

                <div class="d-flex mb-6">
                  <div class="flex-shrink-0">
                    <v-img
                      contain
                      src="/svg/footer_header_margin/header_margin_x.svg"
                      height="90"
                      width="65"
                    />
                  </div>
                  <div class="flex-grow-1 pl-3">
                    <suffix-input
                      key="header_options.margin_x"
                      v-model="data.header_options.margin_x"
                      suffix="mm"
                      label="Marge droite / gauche *"
                      dense
                      hide-details
                    />
                    <p class="mb-0 mt-1">
                      * Réduit la largeur de l'entête par rapport au corps de la fiche.
                    </p>
                  </div>
                </div>

                <label-header-model
                  :callback="activeHeadPart"
                  class="mb-2"
                />

                <p
                  v-if="headPart === null"
                  class="text--disabled"
                >
                  Cliquez sur une section de l'entête pour la personnaliser
                </p>

                <!-- header left -->
                <v-sheet
                  v-if="headPart === 'left'"
                  class="pa-2 rounded"
                >
                  <v-checkbox
                    key="data.header_options.left.display"
                    v-model="data.header_options.left.display"
                    label="Afficher la section de gauche"
                    class="mt-0"
                  />
                  <v-select
                    v-if="data.header_options.left.display"
                    v-model="data.header_options.left.type"
                    label="Type d'élément"
                    :items="qrCodeOrLogo"
                    item-text="text"
                    item-value="value"
                    hide-details
                    outlined
                    dense
                  />
                </v-sheet>

                <!-- header center -->
                <v-sheet
                  v-if="headPart === 'center'"
                  class="pa-2 rounded"
                >
                  <div class="d-flex">
                    <suffix-input
                      key="header_options.center.font_size"
                      v-model="data.header_options.center.font_size"
                      suffix="pt"
                      label="Taille de la police"
                      dense
                    />
                    <text-align-input
                      key="header_options.center.text_align"
                      v-model="data.header_options.center.text_align"
                      dense
                      class="mx-1"
                    />
                    <div class="mt-1">
                      <color-picker-input
                        key="header_options.center.color"
                        v-model="data.header_options.center.color"
                        label="models.gymLabelTemplate.font_color"
                      />
                    </div>
                  </div>
                  <markdown-input
                    v-model="data.header_options.center.body"
                    label="Text du pied de page"
                    :rows="2"
                  />
                </v-sheet>

                <!-- header right -->
                <v-sheet
                  v-if="headPart === 'right'"
                  class="pa-2 rounded"
                >
                  <v-checkbox
                    key="data.header_options.right.display"
                    v-model="data.header_options.right.display"
                    label="Afficher la section de droite"
                    class="mt-0"
                  />
                  <v-select
                    v-if="data.header_options.right.display"
                    v-model="data.header_options.right.type"
                    label="Type d'élément"
                    :items="qrCodeOrLogo"
                    item-text="text"
                    item-value="value"
                    hide-details
                    outlined
                    dense
                  />
                </v-sheet>
              </div>
            </div>

            <!-- Footer setting -->
            <p class="text-decoration-underline mb-1 mt-5 font-weight-bold">
              Pied de page :
            </p>
            <div class="border rounded pa-2 back-app-color">
              <v-checkbox
                v-model="data.footer_options.display"
                label="Afficher un pied de page"
                class="mt-0"
                hide-details
              />
              <div
                v-if="data.footer_options.display"
                class="pt-4"
              >
                <suffix-input
                  v-model="data.footer_options.height"
                  suffix="mm"
                  label="Hauteur du pied de page"
                  dense
                />
                <div class="d-flex mb-6">
                  <div class="flex-shrink-0">
                    <v-img
                      contain
                      src="/svg/footer_header_margin/footer_margin_x.svg"
                      height="90"
                      width="65"
                    />
                  </div>
                  <div class="flex-grow-1 pl-3">
                    <suffix-input
                      key="footer_options.margin_x"
                      v-model="data.footer_options.margin_x"
                      suffix="mm"
                      label="Marge droite / gauche *"
                      dense
                      hide-details
                    />
                    <p class="mb-0 mt-1">
                      * Réduit la largeur du pied de page par rapport au corps de la fiche.
                    </p>
                  </div>
                </div>
                <label-footer-model
                  :callback="activeFooterPart"
                  class="mb-2"
                />

                <p
                  v-if="footerPart === null"
                  class="text--disabled text-center"
                >
                  Cliquez sur une section du pied de page pour la personnaliser
                </p>

                <!-- Footer top -->
                <v-sheet
                  v-if="footerPart === 'top'"
                  class="pa-2 rounded"
                >
                  <div class="d-flex">
                    <suffix-input
                      key="footer_options.center_top.font_size"
                      v-model="data.footer_options.center_top.font_size"
                      suffix="pt"
                      label="Taille de la police"
                      dense
                    />
                    <text-align-input
                      key="footer_options.center_top.text_align"
                      v-model="data.footer_options.center_top.text_align"
                      dense
                      class="mx-1"
                    />
                    <div class="mt-1">
                      <color-picker-input
                        key="footer_options.center_top.color"
                        v-model="data.footer_options.center_top.color"
                        label="models.gymLabelTemplate.font_color"
                      />
                    </div>
                  </div>
                  <markdown-input
                    v-model="data.footer_options.center_top.body"
                    label="Text du pied de page"
                    :rows="2"
                  />
                </v-sheet>

                <!-- Footer bottom -->
                <v-sheet
                  v-if="footerPart === 'bottom'"
                  class="pa-2 rounded"
                >
                  <div class="d-flex">
                    <suffix-input
                      key="footer_options.center_bottom.font_size"
                      v-model="data.footer_options.center_bottom.font_size"
                      suffix="pt"
                      label="Taille de la police"
                      dense
                    />
                    <text-align-input
                      key="footer_options.center_bottom.text_align"
                      v-model="data.footer_options.center_bottom.text_align"
                      dense
                      class="mx-1"
                    />
                    <div class="mt-1">
                      <color-picker-input
                        key="footer_options.center_bottom.color"
                        v-model="data.footer_options.center_bottom.color"
                        label="models.gymLabelTemplate.font_color"
                      />
                    </div>
                  </div>
                  <markdown-input
                    v-model="data.footer_options.center_bottom.body"
                    label="Text de la partie référence"
                    :rows="1"
                  />
                </v-sheet>

                <!-- Footer right -->
                <v-sheet
                  v-if="footerPart === 'right'"
                  class="pa-2 rounded"
                >
                  <v-checkbox
                    key="data.footer_options.right.display"
                    v-model="data.footer_options.right.display"
                    label="Afficher la section de droite"
                    class="mt-0"
                  />
                  <v-select
                    v-if="data.footer_options.right.display"
                    v-model="data.footer_options.right.type"
                    label="Type d'élément"
                    :items="qrCodeOrLogo"
                    item-text="text"
                    item-value="value"
                    hide-details
                    outlined
                    dense
                  />
                </v-sheet>

                <!-- Footer left -->
                <v-sheet
                  v-if="footerPart === 'left'"
                  class="pa-2 rounded"
                >
                  <v-checkbox
                    key="data.footer_options.left.display"
                    v-model="data.footer_options.left.display"
                    label="Afficher la section de gauche"
                    class="mt-0"
                  />
                  <v-select
                    v-if="data.footer_options.left.display"
                    v-model="data.footer_options.left.type"
                    label="Type d'élément"
                    :items="qrCodeOrLogo"
                    item-text="text"
                    item-value="value"
                    hide-details
                    outlined
                    dense
                  />
                </v-sheet>
              </div>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </div>

    <submit-form
      class="mt-auto px-4"
      :overlay="submitOverlay"
      :submit-local-key="isEditingForm() ? 'actions.update' : 'actions.create'"
      :go-back-btn="false"
    >
      <template
        v-if="isEditingForm()"
        #default
      >
        <v-btn
          outlined
          text
          @click="finishCallback"
        >
          {{ $t('actions.finish') }}
        </v-btn>
      </template>
    </submit-form>
  </v-form>
</template>

<script>
import {
  mdiAlphaA,
  mdiViewList,
  mdiFormatLetterCase,
  mdiQrcode,
  mdiExponent,
  mdiFileExportOutline,
  mdiPhoneRotateLandscape,
  mdiArrowExpandVertical,
  mdiArrowExpandHorizontal,
  mdiRadioboxBlank,
  mdiRadioboxMarked,
  mdiFormatAlignTop,
  mdiTableRow,
  mdiFormatFontSizeIncrease,
  mdiFormatFont
} from '@mdi/js'
import { FormHelpers } from '~/mixins/FormHelpers'
import SubmitForm from '~/components/forms/SubmitForm'
import GymLabelTemplateApi from '~/services/oblyk-api/GymLabelTemplateApi'
import GymLabelTemplate from '~/models/GymLabelTemplate'
import GymLabelFontInput from '~/components/forms/GymLabelFontInput'
import BorderInput from '~/components/forms/BorderInput'
import LayoutPageMarginInput from '~/components/forms/LayoutPageMarginInput'
import MarkdownInput from '~/components/forms/MarkdownInput'
import SuffixInput from '~/components/forms/SuffixInput'
import TextAlignInput from '~/components/forms/TextAlignInput'
import ColorPickerInput from '~/components/forms/ColorPickerInput'
import LabelFooterModel from '~/components/gymLabelTemplates/LabelFooterModel'
import LabelTagModel from '~/components/gymLabelTemplates/LabelTagModel'
import GradeStyleInput from '~/components/forms/GradeStyleInput.vue'
import LabelVerticalAlignInput from '~/components/forms/LabelVerticalAlignInput.vue'
import LabelByRowInput from '~/components/forms/LabelByRowInput.vue'
import LabelHeaderModel from '~/components/gymLabelTemplates/LabelHeaderModel.vue'

export default {
  name: 'GymLabelTemplateForm',
  components: {
    LabelHeaderModel,
    LabelByRowInput,
    LabelVerticalAlignInput,
    GradeStyleInput,
    LabelTagModel,
    LabelFooterModel,
    ColorPickerInput,
    TextAlignInput,
    SuffixInput,
    MarkdownInput,
    LayoutPageMarginInput,
    BorderInput,
    GymLabelFontInput,
    SubmitForm
  },
  mixins: [FormHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    },
    gymLabelTemplate: {
      type: Object,
      default: null
    },
    callback: {
      type: Function,
      default: null
    },
    finishCallback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      step: 0,
      footerPart: null,
      labelPart: null,
      headPart: null,
      labelArrangementDialog: false,
      data: {
        id: this.gymLabelTemplate?.id,
        name: this.gymLabelTemplate?.name,
        label_direction: this.gymLabelTemplate?.label_direction,
        layout_options: this.gymLabelTemplate?.layout_options,
        label_options: this.gymLabelTemplate?.label_options,
        header_options: this.gymLabelTemplate?.header_options,
        footer_options: this.gymLabelTemplate?.footer_options,
        border_style: this.gymLabelTemplate?.border_style,
        font_family: this.gymLabelTemplate?.font_family,
        qr_code_position: this.gymLabelTemplate?.qr_code_position,
        label_arrangement: this.gymLabelTemplate?.label_arrangement,
        grade_style: this.gymLabelTemplate?.grade_style,
        display_points: this.gymLabelTemplate?.display_points,
        display_openers: this.gymLabelTemplate?.display_openers,
        display_opened_at: this.gymLabelTemplate?.display_opened_at,
        display_name: this.gymLabelTemplate?.display_name,
        display_description: this.gymLabelTemplate?.display_description,
        display_anchor: this.gymLabelTemplate?.display_anchor,
        display_climbing_style: this.gymLabelTemplate?.display_climbing_style,
        display_grade: this.gymLabelTemplate?.display_grade,
        display_tag_and_hold: this.gymLabelTemplate?.display_tag_and_hold,
        page_format: this.gymLabelTemplate?.page_format,
        page_direction: this.gymLabelTemplate?.page_direction,
        gym_id: this.gym.id
      },
      direction_items: [
        { value: 'one_by_row', text: this.$t('models.gymLabelTemplate.label_direction_list.one_by_row') },
        { value: 'two_by_row', text: this.$t('models.gymLabelTemplate.label_direction_list.two_by_row') },
        { value: 'three_by_row', text: this.$t('models.gymLabelTemplate.label_direction_list.three_by_row') },
        { value: 'four_by_row', text: this.$t('models.gymLabelTemplate.label_direction_list.four_by_row') }
        // { value: 'circular', text: this.$t('models.gymLabelTemplate.label_direction_list.circular') }
      ],
      qr_code_position_items: [
        { value: 'in_label', text: this.$t('models.gymLabelTemplate.qr_code_position_list.in_label') },
        // { value: 'footer', text: this.$t('models.gymLabelTemplate.qr_code_position_list.footer') },
        { value: 'none', text: this.$t('models.gymLabelTemplate.qr_code_position_list.none') }
      ],
      text_transform_items: [
        { value: 'uppercase', text: 'Majuscule (6A, 7A+, etc.)' },
        { value: 'lowercase', text: 'Minuscule (6a, 7a+, etc.)' }
      ],
      page_format_items: [
        { value: 'A3', text: this.$t('models.gymLabelTemplate.page_format_list.A3') },
        { value: 'A4', text: this.$t('models.gymLabelTemplate.page_format_list.A4') },
        { value: 'A5', text: this.$t('models.gymLabelTemplate.page_format_list.A5') },
        { value: 'free', text: this.$t('models.gymLabelTemplate.page_format_list.free') }
      ],
      page_direction_items: [
        { value: 'portrait', text: this.$t('models.gymLabelTemplate.page_direction_list.portrait') },
        { value: 'landscape', text: this.$t('models.gymLabelTemplate.page_direction_list.landscape') },
        { value: 'free', text: this.$t('models.gymLabelTemplate.page_direction_list.free') }
      ],
      label_arrangement_items: [
        { value: 'rectangular_horizontal', text: this.$t('models.gymLabelTemplate.label_arrangement_list.rectangular_horizontal') },
        { value: 'rectangular_vertical', text: this.$t('models.gymLabelTemplate.label_arrangement_list.rectangular_vertical') }
      ],
      grade_style_items: [
        { value: 'none', text: this.$t('models.gymLabelTemplate.grade_style_list.none') },
        { value: 'tag_and_hold', text: this.$t('models.gymLabelTemplate.grade_style_list.tag_and_hold') },
        { value: 'diagonal_label', text: this.$t('models.gymLabelTemplate.grade_style_list.diagonal_label') }
      ],
      font_items: [
        { value: 'lato', text: 'Lato' },
        { value: 'unbounded', text: 'Unbounded' },
        { value: 'loved_by_the_king', text: 'Loved by the King' },
        { value: 'sue_ellen_francisco', text: 'Sue Ellen Francisco' }
      ],
      verticals: [
        { text: 'Aligné sur le haut de la page', value: 'start' },
        { text: 'Centrer sur la page', value: 'center' },
        { text: 'Aligné sur le bas de la page', value: 'end' }
      ],
      informationVerticals: [
        { text: "Aligné sur le haut de l'étiquette", value: 'start' },
        { text: "centré sur l'étiquette", value: 'center' },
        { text: "Aligné sur le bas de l'étiquette", value: 'end' }
      ],
      qrCodeOrLogo: [
        { text: 'QrCode des voies de la fiche', value: 'QrCode' },
        { text: 'Logo de la salle', value: 'logo' },
        { text: "Logo d'Oblyk", value: 'logo_oblyk' }
      ],

      mdiAlphaA,
      mdiViewList,
      mdiFormatLetterCase,
      mdiQrcode,
      mdiExponent,
      mdiFileExportOutline,
      mdiPhoneRotateLandscape,
      mdiArrowExpandVertical,
      mdiRadioboxBlank,
      mdiRadioboxMarked,
      mdiFormatAlignTop,
      mdiArrowExpandHorizontal,
      mdiTableRow,
      mdiFormatFontSizeIncrease,
      mdiFormatFont
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new GymLabelTemplateApi(this.$axios, this.$auth).update(this.data) : new GymLabelTemplateApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          const gymLabelTemplate = new GymLabelTemplate({ attributes: resp.data })
          if (this.callback) {
            this.callback(gymLabelTemplate)
          } else {
            this.$router.push({
              path: gymLabelTemplate.path,
              query: { start_editing: true }
            })
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymLabelTemplate')
        }).then(() => {
          this.submitOverlay = false
        })
    },

    selectLabelArrangement (arrangement) {
      this.data.label_arrangement = arrangement
      this.labelArrangementDialog = false
    },

    activeFooterPart (part) {
      this.footerPart = part
    },

    activeHeadPart (part) {
      this.headPart = part
    },

    activeLabelPart (part) {
      this.labelPart = part
    }
  }
}
</script>
