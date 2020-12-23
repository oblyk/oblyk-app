<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      outlined
      v-model="data.name"
      :label="$t('models.gymGradeLine.name')"
      required
    />

    <v-text-field
      outlined
      v-model="data.grade_text"
      :label="$t('models.gymGradeLine.gradeText')"
      required
      hint="Exemple: 6a, 7a, 7c+, etc."
    />

    <v-text-field
      outlined
      v-model="data.order"
      type="number"
      min="1"
      max="50"
      :label="$t('models.gymGradeLine.order')"
      required
    />

    <v-combobox
      v-model="selectedColors"
      :items="colors"
      chips
      :label="$t('models.gymGradeLine.colors')"
      multiple
      outlined
    >
      <template v-slot:selection="{ attrs, item, select, selected }">
        <v-chip
          v-bind="attrs"
          :input-value="selected"
        >
          <v-icon left :style="`color: ${item.value}`">
            mdi-circle
          </v-icon>
          {{ $t(`colors.${item.text}`) }}
        </v-chip>
      </template>
    </v-combobox>

    <close-form />
    <submit-form
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
    >
      <v-btn
        outlined
        @click="deleteGradeLine()"
        class="float-right mr-2"
        color="error"
        v-if="isEditingForm()"
      >
        {{ $t('actions.delete') }}
      </v-btn>
    </submit-form>
  </v-form>
</template>
<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import GymGradeLineApi from '@/services/oblyk-api/gymGradeLineApi'
import CloseForm from '@/components/forms/CloseForm'

export default {
  name: 'GymGradeLineForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    gymGrade: Object,
    gymGradeLine: {
      type: Object,
      required: false
    }
  },

  data () {
    return {
      data: {
        id: (this.gymGradeLine || {}).id,
        name: (this.gymGradeLine || {}).name,
        colors: (this.gymGradeLine || {}).colors,
        grade_text: (this.gymGradeLine || {}).grade_text,
        order: (this.gymGradeLine || {}).order || this.gymGrade.next_grade_lines_order || 1,
        gym_id: this.gymGrade.gym.id,
        gym_grade_id: this.gymGrade.id
      },
      selectedColors: [],
      colors: [
        { text: 'noColor', value: '#00000000' },
        { text: 'white', value: '#f2f2f2' },
        { text: 'grey', value: '#999999' },
        { text: 'black', value: '#1a1a1a' },
        { text: 'pastelBlue', value: '#aaccff' },
        { text: 'blue', value: '#0055d4' },
        { text: 'navyBlue', value: '#003380' },
        { text: 'fluorescentBlue', value: '#2ad4ff' },
        { text: 'pastelGreen', value: '#afe9af' },
        { text: 'green', value: '#2ca02c' },
        { text: 'firGreen', value: '#165016' },
        { text: 'fluorescentGreen', value: '#00ff00' },
        { text: 'pastelPurple', value: '#e9afdd' },
        { text: 'purple', value: '#ab37c8' },
        { text: 'deepPurple', value: '#440055' },
        { text: 'fluorescentPink', value: '#ff2ad4' },
        { text: 'pastelRed', value: '#ffaaaa' },
        { text: 'red', value: '#ff0000' },
        { text: 'darkRed', value: '#800000' },
        { text: 'pastelOrange', value: '#ffccaa' },
        { text: 'orange', value: '#ff6600' },
        { text: 'pastelYellow', value: '#ffeeaa' },
        { text: 'yellow', value: '#ffcc00' },
        { text: 'fluorescentYellow', value: '#eaff09' },
        { text: 'brown', value: '#a05a2c' },
        { text: 'beige', value: '#f5f5dc' }
      ]
    }
  },

  created () {
    if (this.isEditingForm()) {
      for (const color of this.data.colors) {
        let colorName = null
        for (const arrayColor of this.colors) {
          if (arrayColor.value === color) {
            colorName = arrayColor.text
          }
        }
        this.selectedColors.push({ value: color, text: colorName })
      }
    }
  },

  watch: {
    selectedColors: function () {
      this.data.colors = this.selectedColors.map((color) => { return color.value })
    }
  },

  methods: {
    submit: function () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? GymGradeLineApi.update(this.data) : GymGradeLineApi.create(this.data)

      promise
        .then(() => {
          this.$router.push(this.gymGrade.url())
        })
        .catch(err => {
          console.error(err)
        }).then(() => {
          this.submitOverlay = false
        })
    },

    deleteGradeLine: function () {
      if (confirm(this.$t('actions.areYouSur'))) {
        this.submitOverlay = true
        GymGradeLineApi
          .delete(this.data)
          .then(() => {
            this.$router.push(this.gymGrade.url())
          })
          .catch(err => {
            console.error(err)
          })
          .then(() => {
            this.submitOverlay = false
          })
      }
    }
  }
}
</script>
