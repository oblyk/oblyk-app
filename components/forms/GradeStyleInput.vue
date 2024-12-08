<template>
  <v-input :prepend-icon="prependIcon">
    <fieldset class="full-width custom-fieldset border rounded mt-n1 pb-1 px-1">
      <legend class="v-label custom-fieldset-label">
        Représentation de la cotation ou des prises sur la fiche
      </legend>
      <div class="d-flex">
        <v-sheet
          class="activable-v-sheet pa-1 rounded"
          :class="gradeStyle === 'tag_and_hold' ? '--active' : null"
          @click="selectGrade('tag_and_hold')"
        >
          <v-img
            contain
            src="/svg/grade_styles/hold_and_tag_style.svg"
            height="24"
            width="24"
          />
        </v-sheet>
        <v-sheet
          class="activable-v-sheet pa-1 rounded"
          :class="gradeStyle === 'diagonal_label' ? '--active' : null"
          @click="selectGrade('diagonal_label')"
        >
          <v-img
            contain
            src="/svg/grade_styles/diagonal_style.svg"
            height="24"
            width="24"
          />
        </v-sheet>
        <v-sheet
          class="activable-v-sheet pa-1 rounded"
          :class="gradeStyle === 'circle' ? '--active' : null"
          @click="selectGrade('circle')"
        >
          <v-img
            contain
            src="/svg/grade_styles/circle_style.svg"
            height="24"
            width="24"
          />
        </v-sheet>
        <v-sheet
          class="activable-v-sheet pa-1 rounded"
          :class="gradeStyle === 'none' ? '--active' : null"
          @click="selectGrade('none')"
        >
          <v-icon>
            {{ mdiClose }}
          </v-icon>
        </v-sheet>
      </div>
    </fieldset>
  </v-input>
</template>

<script>
import { mdiClose } from '@mdi/js'

export default {
  name: 'GradeStyleInput',
  props: {
    value: {
      type: String,
      required: true
    },
    dense: {
      type: Boolean,
      default: false
    },
    prependIcon: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      gradeStyle: this.value,

      mdiClose
    }
  },

  methods: {
    selectGrade (style) {
      this.gradeStyle = style
      this.$emit('input', this.gradeStyle)
    }
  }
}
</script>
