import {
  oblykClimbingStyleBoulder,
  oblykClimbingStyleCoordination,
  oblykClimbingStyleEndurance,
  oblykClimbingStyleFinger,
  oblykClimbingStyleGrip,
  oblykClimbingStylePhysics,
  oblykClimbingStyleResistance,
  oblykClimbingStyleSmallPeople,
  oblykClimbingStyleTallPeople,
  oblykClimbingStyleTechnical
} from '~/assets/oblyk-icons'

export const ClimbingStylesHelpers = {
  data () {
    return {
      climbingDataByStyles: {
        boulder: { text: this.$t('models.climbingStyle.boulder'), value: 'boulder', icon: oblykClimbingStyleBoulder, color: null },
        endurance: { text: this.$t('models.climbingStyle.endurance'), value: 'endurance', icon: oblykClimbingStyleEndurance, color: null },
        resistance: { text: this.$t('models.climbingStyle.resistance'), value: 'resistance', icon: oblykClimbingStyleResistance, color: null },
        technical: { text: this.$t('models.climbingStyle.technical'), value: 'technical', icon: oblykClimbingStyleTechnical, color: null },
        physics: { text: this.$t('models.climbingStyle.physics'), value: 'physics', icon: oblykClimbingStylePhysics, color: null },
        finger: { text: this.$t('models.climbingStyle.finger'), value: 'finger', icon: oblykClimbingStyleFinger, color: null },
        grip: { text: this.$t('models.climbingStyle.grip'), value: 'grip', icon: oblykClimbingStyleGrip, color: null },
        coordination: { text: this.$t('models.climbingStyle.coordination'), value: 'coordination', icon: oblykClimbingStyleCoordination, color: null },
        tall_people: { text: this.$t('models.climbingStyle.tall_people'), value: 'tall_people', icon: oblykClimbingStyleTallPeople, color: null },
        small_people: { text: this.$t('models.climbingStyle.small_people'), value: 'small_people', icon: oblykClimbingStyleSmallPeople, color: null }
      }
    }
  }
}
