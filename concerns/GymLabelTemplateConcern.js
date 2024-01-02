import GymLabelTemplate from '@/models/GymLabelTemplate'

export const GymLabelTemplateConcern = {
  data () {
    return {
      gymLabelTemplate: null,
      loadingGymLabelTemplate: true
    }
  },

  created () {
    if (this.$route.params.gymLabelTemplateId) { this.getGymLabelTemplate() }
  },

  methods: {
    getGymLabelTemplate () {
      this.loadingGymLabelTemplate = true
      new GymLabelTemplate({ axios: this.$axios, auth: this.$auth })
        ._find(
          this.$route.params.gymId,
          this.$route.params.gymLabelTemplateId
        )
        .then((resp) => {
          this.gymLabelTemplate = resp
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymLabelTemplate')
        }).finally(() => {
          this.loadingGymLabelTemplate = false
        })
    }
  }
}
