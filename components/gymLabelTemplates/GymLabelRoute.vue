<template>
  <div
    class="gym-route-row no-break"
    :style="borderStyle()"
    :class="gymLabelTemplate.label_arrangement"
  >
    <div
      class="grade"
      :class="gymLabelTemplate.qr_code_position === 'in_label' && gymLabelTemplate.label_arrangement === 'rectangular_vertical' ? '--with-qrcode' : ''"
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
      <grade-style-none
        v-if="gymLabelTemplate.grade_style === 'none'"
        :gym-route="gymRoute"
        :gym-label-template="gymLabelTemplate"
      />
      <div
        v-if="gymLabelTemplate.qr_code_position === 'in_label' && gymLabelTemplate.label_arrangement === 'rectangular_vertical'"
        class="qrcode"
      >
        <div v-html="gymRoute.qrcode" />
      </div>
    </div>
    <div class="information">
      <p v-if="gymLabelTemplate.display_name">
        <b>{{ gymRoute.name }}</b>
      </p>
      <p v-if="(gymLabelTemplate.display_openers && gymRoute.openers.length > 0) || gymLabelTemplate.display_opened_at">
        Ouvert
        <span v-if="gymLabelTemplate.display_openers && gymRoute.openers.length > 0">
          par {{ openersToS }}
        </span>
        <span v-if="gymLabelTemplate.display_opened_at">
          le {{ humanizeDate(gymRoute.opened_at) }}
        </span>
      </p>
      <markdown-text
        v-if="gymLabelTemplate.display_description && gymRoute.description"
        class="route-description"
        :text="gymRoute.description"
      />
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
import MarkdownText from '~/components/ui/MarkdownText'
import { ClimbingStylesHelpers } from '~/mixins/ClimbingStylesHelpers'
import GradeStyleNone from '~/components/gymLabelTemplates/GradeStyles/GradeStyleNone'
import GradeStyleTagAndHold from '~/components/gymLabelTemplates/GradeStyles/GradeStyleTagAndHold'
import GradeStyleDiagonalLabel from '~/components/gymLabelTemplates/GradeStyles/GradeStyleDiagonalLabel'

export default {
  name: 'GymLabelRoute',
  components: { GradeStyleDiagonalLabel, GradeStyleTagAndHold, GradeStyleNone, MarkdownText },
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
        const openers = this.gymRoute.openers
        const lastOpener = openers.pop()
        return `${openers.map(opener => opener.name).join(', ')} et ${lastOpener.name}`
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
    }
  }
}
</script>
<style lang="scss">
.gym-route-row {
  display: flex;
  &.rectangular_horizontal {
    flex-direction: row;
    height: 2.7cm;
    .grade {}
  }
  &.rectangular_vertical {
    flex-direction: column-reverse;
    height: 5.4cm;
    width: 2.7cm;
  }
  .grade {
    flex: initial;
    height: 100%;
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
    height: 100%;
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
      margin-bottom: -0.6mm;
      margin-left: 0.6mm;
      height: 2.3cm !important;
      width: 2.3cm !important;
    }
  }
}
</style>
