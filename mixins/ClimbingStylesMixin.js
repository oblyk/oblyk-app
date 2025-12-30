import {
  oblykBalance,
  oblykClamp,
  oblykClimbingStyleBoulder,
  oblykClimbingStyleCoordination,
  oblykClimbingStyleEndurance,
  oblykClimbingStyleFinger,
  oblykClimbingStyleGrip,
  oblykClimbingStylePhysics,
  oblykClimbingStyleResistance,
  oblykClimbingStyleSmallPeople,
  oblykClimbingStyleTallPeople,
  oblykClimbingStyleTechnical,
  oblykCommitment,
  oblykComplex,
  oblykCoreStrength,
  oblykDynamic,
  oblykPrecision,
  oblykPromptness,
  oblykSensation,
  oblykU10,
  oblykU12,
  oblykU14,
  oblykU16,
  oblykU18,
  oblykU8,
  oblykVolume
} from '~/assets/oblyk-icons'

export const ClimbingStylesMixin = {
  data () {
    return {
      MD_ClimbingStyles: [
        { value: 'boulder', icon: oblykClimbingStyleBoulder, text: this.$t('models.climbingStyle.boulder'), color: null },
        { value: 'endurance', icon: oblykClimbingStyleEndurance, text: this.$t('models.climbingStyle.endurance'), color: null },
        { value: 'resistance', icon: oblykClimbingStyleResistance, text: this.$t('models.climbingStyle.resistance'), color: null },
        { value: 'technical', icon: oblykClimbingStyleTechnical, text: this.$t('models.climbingStyle.technical'), color: null },
        { value: 'physics', icon: oblykClimbingStylePhysics, text: this.$t('models.climbingStyle.physics'), color: null },
        { value: 'finger', icon: oblykClimbingStyleFinger, text: this.$t('models.climbingStyle.finger'), color: null },
        { value: 'grip', icon: oblykClimbingStyleGrip, text: this.$t('models.climbingStyle.grip'), color: null },
        { value: 'coordination', icon: oblykClimbingStyleCoordination, text: this.$t('models.climbingStyle.coordination'), color: null },
        { value: 'tall_people', icon: oblykClimbingStyleTallPeople, text: this.$t('models.climbingStyle.tall_people'), color: null },
        { value: 'small_people', icon: oblykClimbingStyleSmallPeople, text: this.$t('models.climbingStyle.small_people'), color: null },
        { value: 'balance', icon: oblykBalance, text: this.$t('models.climbingStyle.balance'), color: null },
        { value: 'clamp', icon: oblykClamp, text: this.$t('models.climbingStyle.clamp'), color: null },
        { value: 'volume', icon: oblykVolume, text: this.$t('models.climbingStyle.volume'), color: null },
        { value: 'core_strength', icon: oblykCoreStrength, text: this.$t('models.climbingStyle.core_strength'), color: null },
        { value: 'commitment', icon: oblykCommitment, text: this.$t('models.climbingStyle.commitment'), color: null },
        { value: 'precision', icon: oblykPrecision, text: this.$t('models.climbingStyle.precision'), color: null },
        { value: 'promptness', icon: oblykPromptness, text: this.$t('models.climbingStyle.promptness'), color: null },
        { value: 'dynamic', icon: oblykDynamic, text: this.$t('models.climbingStyle.dynamic'), color: null },
        { value: 'complex', icon: oblykComplex, text: this.$t('models.climbingStyle.complex'), color: null },
        { value: 'sensation', icon: oblykSensation, text: this.$t('models.climbingStyle.sensation'), color: null },
        { value: 'u8', icon: oblykU8, text: this.$t('models.climbingStyle.u8'), color: null },
        { value: 'u10', icon: oblykU10, text: this.$t('models.climbingStyle.u10'), color: null },
        { value: 'u12', icon: oblykU12, text: this.$t('models.climbingStyle.u12'), color: null },
        { value: 'u14', icon: oblykU14, text: this.$t('models.climbingStyle.u14'), color: null },
        { value: 'u16', icon: oblykU16, text: this.$t('models.climbingStyle.u16'), color: null },
        { value: 'u18', icon: oblykU18, text: this.$t('models.climbingStyle.u18'), color: null }
      ]
    }
  },

  computed: {
    MC_ClimbingStylesByStyle () {
      const styles = {}
      for (const style of this.MD_ClimbingStyles) {
        styles[style.value] = style
      }
      return styles
    }
  }
}
