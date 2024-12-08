<template>
  <div
    class="gym-route-row no-break"
    :style="borderStyle()"
    :class="gymLabelTemplate.label_arrangement"
  >
    <!-- Grade (and QrCode in vertical label) -->
    <div
      class="grade"
      :class="gymLabelTemplate.qr_code_position === 'in_label' && gymLabelTemplate.label_arrangement === 'rectangular_vertical' ? '--with-qrcode' : ''"
    >
      <div class="grade-and-visual-part">
        <div
          v-if="gymLabelTemplate.grade_style !== 'none'"
          class="visual-part"
          :style="`width: ${gymLabelTemplate.label_options.visual.width}`"
        >
          <grade-style-tag-and-hold
            v-if="gymLabelTemplate.grade_style === 'tag_and_hold'"
            :gym-route="gymRoute"
            :gym-label-template="gymLabelTemplate"
          />
          <grade-style-diagonal-label
            v-if="gymLabelTemplate.grade_style === 'diagonal_label'"
            :gym-route="gymRoute"
            :gym-label-template="gymLabelTemplate"
          />
          <grade-style-circle-label
            v-if="gymLabelTemplate.grade_style === 'circle'"
            :gym-route="gymRoute"
            :gym-label-template="gymLabelTemplate"
          />
        </div>
        <div
          class="grade-part"
          :style="`width: ${gymLabelTemplate.label_options.grade.width}`"
        >
          <gym-label-grade
            :gym-route="gymRoute"
            :gym-label-template="gymLabelTemplate"
          />
        </div>
      </div>

      <!-- QrCode in vertical label -->
      <div
        v-if="gymLabelTemplate.qr_code_position === 'in_label' && gymLabelTemplate.label_arrangement === 'rectangular_vertical'"
        class="qrcode"
      >
        <div v-html="gymRoute.qrcode" />
      </div>
    </div>

    <!-- Information -->
    <div
      class="information"
      :style="`${fontFamilyStyle()} ${justifyInformation()} font-size: ${gymLabelTemplate.label_options.information.font_size}`"
    >
      <div
        v-if="gymLabelTemplate.display_name && gymRoute.name"
        class="gym-route-name ellipsis-text"
      >
        {{ gymRoute.name }}
      </div>
      <div
        v-if="gymLabelTemplate.display_description && gymRoute.description"
        class="route-description"
        v-html="gymRoute.description"
      />
      <p
        v-if="(gymLabelTemplate.display_openers && gymRoute.openers.length > 0) || gymLabelTemplate.display_opened_at"
        class="openers-and-opened-at ellipsis-text"
      >
        <span v-if="gymLabelTemplate.display_opened_at">
          {{ humanizeDate(gymRoute.opened_at, 'DATE_SHORT') }}
        </span>
        <span
          v-if="gymLabelTemplate.display_openers && gymRoute.openers.length > 0"
          v-text="openersToS"
        />
      </p>
      <p v-if="gymLabelTemplate.display_anchor && gymRoute.anchor_number">
        Relais n°{{ gymRoute.anchor_number }}
      </p>
      <p
        v-if="gymLabelTemplate.display_climbing_style"
        class="climbing-styles"
      >
        <span
          v-for="(style, styleIndex) in climbingStyles()"
          :key="`style-index-${styleIndex}`"
          class="climbing-style"
        >
          <v-icon :color="styleColor(style)">
            {{ climbingDataByStyles[style].icon }}
          </v-icon>
          {{ climbingDataByStyles[style].text }}
        </span>
      </p>
    </div>

    <!-- QrCode (in horizontal label) -->
    <div
      v-if="gymLabelTemplate.qr_code_position === 'in_label' && gymLabelTemplate.label_arrangement === 'rectangular_horizontal'"
      class="qrcode"
    >
      <div v-html="gymRoute.qrcode" />
    </div>
  </div>
</template>

<script>

import { DateHelpers } from '~/mixins/DateHelpers'
import { ClimbingStylesHelpers } from '~/mixins/ClimbingStylesHelpers'
import GradeStyleTagAndHold from '~/components/gymLabelTemplates/GradeStyles/GradeStyleTagAndHold'
import GradeStyleDiagonalLabel from '~/components/gymLabelTemplates/GradeStyles/GradeStyleDiagonalLabel'
import GradeStyleCircleLabel from '~/components/gymLabelTemplates/GradeStyles/GradeStyleCircleLabel'
import GymLabelGrade from '~/components/gymLabelTemplates/GymLabelGrade'

export default {
  name: 'GymLabelRoute',
  components: {
    GradeStyleCircleLabel,
    GymLabelGrade,
    GradeStyleDiagonalLabel,
    GradeStyleTagAndHold
  },
  mixins: [DateHelpers, ClimbingStylesHelpers],
  props: {
    gymLabelTemplate: {
      type: Object,
      required: true
    },
    gymRoute: {
      type: Object,
      required: true
    },
    gym: {
      type: Object,
      required: true
    }
  },

  computed: {
    openersToS () {
      if (this.gymRoute.openers.length === 1) {
        return this.gymRoute.openers[0].name
      } else {
        const openers = this.gymRoute.openers.map((opener) => { return opener.name })
        const lastOpener = openers.pop()
        return `${openers.join(', ')} et ${lastOpener}`
      }
    }
  },

  methods: {
    climbingStyles () {
      const styles = []
      for (const section of this.gymRoute.sections) {
        for (const style of section.styles) {
          styles.push(style)
        }
      }
      return styles
    },

    styleColor (style) {
      const iconColors = this.gym.gym_climbing_styles.filter(climbingStyle => climbingStyle.climbing_type === this.gymRoute.climbing_type)
      return (iconColors.find(iconStyle => iconStyle.style === style) || {}).color
    },

    borderStyle () {
      const color = this.gymLabelTemplate.border_style['border-color']
      const width = this.gymLabelTemplate.border_style['border-width']
      const style = this.gymLabelTemplate.border_style['border-style']
      const radius = this.gymLabelTemplate.border_style['border-radius']
      return `border-color: ${color}; border-width: ${width}; border-style: ${style}; border-radius: ${radius};`
    },

    fontFamilyStyle () {
      for (const font of this.gymLabelTemplate.fonts) {
        if (font.ref === this.gymLabelTemplate.label_options.information.font_family) {
          return `font-family: ${font.name}; line-height: ${font.line_height};`
        }
      }
    },

    justifyInformation () {
      if (this.gymLabelTemplate.label_arrangement === 'rectangular_vertical') {
        return `justify-content: ${this.gymLabelTemplate.label_options.rectangular_vertical.top.vertical_align};`
      } else {
        return ';'
      }
    }
  }
}
</script>
<style lang="scss">
.gym-route-row {
  display: flex;
  .gym-route-name {
    font-weight: bold;
    margin-bottom: 1mm;
  }
  .openers-and-opened-at {
    font-size: 0.9em;
  }
  &.rectangular_horizontal {
    flex-direction: row;
  }
  &.rectangular_vertical {
    flex-direction: column-reverse;
    .information {
      width: 100%;
    }
  }
  .grade {
    flex: initial;
    &.--with-qrcode {
      display: flex;
      justify-content: space-between;
    }
  }
  .information {
    padding-left: 3mm;
    padding-right: 3mm;
    flex: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .route-description {
      font-style: italic;
      margin-top: 0.6mm;
    }
  }
  .climbing-styles {
    margin-top: 0.6mm;
    margin-left: -1.2mm;
    .climbing-style {
      padding-left: 1.5mm;
      font-size: 10pt;
    }
  }
  .qrcode {
    flex: initial;
    text-align: center;
    display: flex;
    flex-direction: column;
    padding: 1.4mm;
    justify-content: center;
    svg {
      margin-top: 1.4mm;
      height: calc(100% - 2.8mm) !important;
    }
  }
  .grade-and-visual-part {
    height: 100%;
    display: flex;
  }
}
</style>
