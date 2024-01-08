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
        required
        dense
      />

      <div v-if="isEditingForm()">
        <v-select
          v-model="data.label_direction"
          :prepend-icon="mdiViewList"
          :label="$t('models.gymLabelTemplate.label_direction')"
          :items="direction_items"
          item-text="text"
          item-value="value"
          outlined
          dense
        />
        <v-select
          v-model="data.label_arrangement"
          :prepend-icon="mdiFormatListText"
          :label="$t('models.gymLabelTemplate.label_arrangement')"
          :items="label_arrangement_items"
          item-text="text"
          item-value="value"
          outlined
          dense
        />
        <gym-label-font-input
          v-model="data.font_family"
          :label="$t('models.gymLabelTemplate.font_family')"
          :prepend-icon="mdiFormatLetterCase"
          dense
        />
        <border-input v-model="data.border_style" />
        <label-layout-option-input v-model="data.layout_options" />
        <v-select
          v-model="data.qr_code_position"
          :prepend-icon="mdiQrcode"
          :label="$t('models.gymLabelTemplate.qr_code_position')"
          :items="qr_code_position_items"
          item-text="text"
          item-value="value"
          outlined
          dense
        />
        <v-select
          v-model="data.grade_style"
          :prepend-icon="mdiExponent"
          :label="$t('models.gymLabelTemplate.grade_style')"
          :items="grade_style_items"
          item-text="text"
          item-value="value"
          outlined
          dense
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
        <v-checkbox
          v-for="(display, displayIndex) in displayList"
          :key="`display-form-index-${displayIndex}`"
          v-model="data[display]"
          :label="$t(`models.gymLabelTemplate.${display}`)"
          hide-details
        />
      </div>
    </div>

    <submit-form
      class="mt-auto px-4"
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
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
  mdiFormatListText,
  mdiFormatLetterCase,
  mdiQrcode,
  mdiExponent,
  mdiFileExportOutline,
  mdiPhoneRotateLandscape
} from '@mdi/js'
import { FormHelpers } from '~/mixins/FormHelpers'
import SubmitForm from '~/components/forms/SubmitForm'
import GymLabelTemplateApi from '~/services/oblyk-api/GymLabelTemplateApi'
import GymLabelTemplate from '~/models/GymLabelTemplate'
import GymLabelFontInput from '~/components/forms/GymLabelFontInput.vue'
import BorderInput from '~/components/forms/BorderInput.vue'
import LabelLayoutOptionInput from '~/components/forms/LabelLayoutOptionInput.vue'

export default {
  name: 'GymLabelTemplateForm',
  components: {
    LabelLayoutOptionInput,
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
      data: {
        id: this.gymLabelTemplate?.id,
        name: this.gymLabelTemplate?.name,
        label_direction: this.gymLabelTemplate?.label_direction || 'one_by_row',
        layout_options: this.gymLabelTemplate?.layout_options || { 'page-margin': '10mm' },
        border_style: this.gymLabelTemplate?.border_style || { 'border-color': '#000000', 'border-width': '0.3mm', 'border-style': 'solid', 'border-radius': '3mm' },
        font_family: this.gymLabelTemplate?.font_family || 'lato',
        qr_code_position: this.gymLabelTemplate?.qr_code_position || 'in_label',
        label_arrangement: this.gymLabelTemplate?.label_arrangement || 'rectangular_horizontal',
        grade_style: this.gymLabelTemplate?.grade_style || 'tag_and_hold',
        display_points: this.gymLabelTemplate?.display_points,
        display_openers: this.gymLabelTemplate?.display_openers,
        display_opened_at: this.gymLabelTemplate?.display_opened_at,
        display_name: this.gymLabelTemplate?.display_name,
        display_description: this.gymLabelTemplate?.display_description,
        display_anchor: this.gymLabelTemplate?.display_anchor,
        display_climbing_style: this.gymLabelTemplate?.display_climbing_style,
        display_grade: this.gymLabelTemplate?.display_grade,
        display_tag_and_hold: this.gymLabelTemplate?.display_tag_and_hold,
        page_format: this.gymLabelTemplate?.page_format || 'A4',
        page_direction: this.gymLabelTemplate?.page_direction || 'portrait',
        gym_id: this.gym.id
      },
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
      direction_items: [
        { value: 'one_by_row', text: this.$t('models.gymLabelTemplate.label_direction_list.one_by_row') },
        { value: 'two_by_row', text: this.$t('models.gymLabelTemplate.label_direction_list.two_by_row') },
        { value: 'three_by_row', text: this.$t('models.gymLabelTemplate.label_direction_list.three_by_row') },
        { value: 'four_by_row', text: this.$t('models.gymLabelTemplate.label_direction_list.four_by_row') }
        // { value: 'circular', text: this.$t('models.gymLabelTemplate.label_direction_list.circular') }
      ],
      qr_code_position_items: [
        { value: 'in_label', text: this.$t('models.gymLabelTemplate.qr_code_position_list.in_label') },
        { value: 'footer', text: this.$t('models.gymLabelTemplate.qr_code_position_list.footer') },
        { value: 'none', text: this.$t('models.gymLabelTemplate.qr_code_position_list.none') }
      ],
      page_format_items: [
        { value: 'A3', text: this.$t('models.gymLabelTemplate.page_format_list.A3') },
        { value: 'A4', text: this.$t('models.gymLabelTemplate.page_format_list.A4') },
        { value: 'A5', text: this.$t('models.gymLabelTemplate.page_format_list.A5') },
        { value: 'A6', text: this.$t('models.gymLabelTemplate.page_format_list.A6') },
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

      mdiAlphaA,
      mdiViewList,
      mdiFormatListText,
      mdiFormatLetterCase,
      mdiQrcode,
      mdiExponent,
      mdiFileExportOutline,
      mdiPhoneRotateLandscape
    }
  },

  mounted () {
    if (!this.isEditingForm()) {
      this.data.display_points = false
      this.data.display_openers = true
      this.data.display_opened_at = true
      this.data.display_name = true
      this.data.display_description = false
      this.data.display_anchor = false
      this.data.display_climbing_style = true
      this.data.display_grade = true
      this.data.display_tag_and_hold = true
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
    }
  }
}
</script>
