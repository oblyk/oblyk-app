export const FormHelpers = {
  props: {
    submitMethode: String
  },

  data () {
    return {
      submitOverlay: false
    }
  },

  methods: {
    isEditingForm: function () {
      return this.submitMethode === 'put' || this.submitMethode === 'patch'
    },

    submitText: function () {
      return this.isEditingForm() ? 'forms.edit' : 'forms.create'
    }
  }
}
