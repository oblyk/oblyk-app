<template>
  <v-select
    v-model="grade"
    :items="gradesList"
    item-value="value"
    item-text="text"
    :label="$t(translateKey)"
    :hide-details="hideDetails"
    :dense="dense"
    outlined
    clearable
    @change="onChange"
  />
</template>

<script>
export default {
  name: 'GradeSelectInput',
  props: {
    value: [String, Number],
    hideDetails: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    },
    translateKey: {
      type: String,
      default: 'models.user.grade_max'
    }
  },

  data () {
    return {
      gradesList: [
        { text: '3a', value: 13 },
        { text: '3b', value: 15 },
        { text: '3c', value: 17 },
        { text: '4a', value: 19 },
        { text: '4b', value: 21 },
        { text: '4c', value: 23 },
        { text: '5a', value: 25 },
        { text: '5b', value: 27 },
        { text: '5c', value: 29 },
        { text: '6a', value: 31 },
        { text: '6b', value: 33 },
        { text: '6c', value: 35 },
        { text: '7a', value: 37 },
        { text: '7b', value: 39 },
        { text: '7c', value: 41 },
        { text: '8a', value: 43 },
        { text: '8b', value: 45 },
        { text: '8c', value: 47 },
        { text: '9a', value: 49 },
        { text: '9b', value: 51 },
        { text: '9c', value: 53 }
      ],
      grade: this.value
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.grade)
    }
  }
}
</script>
