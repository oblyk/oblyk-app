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
    isEditingForm () {
      return this.submitMethode === 'put' || this.submitMethode === 'patch'
    },

    submitText () {
      return this.isEditingForm() ? 'actions.edit' : 'actions.create'
    }
  }
}
