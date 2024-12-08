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

export const ClimbingStylesMixin = {
  data () {
    return {
      styles: [
        { value: 'boulder', icon: oblykClimbingStyleBoulder },
        { value: 'endurance', icon: oblykClimbingStyleEndurance },
        { value: 'resistance', icon: oblykClimbingStyleResistance },
        { value: 'technical', icon: oblykClimbingStyleTechnical },
        { value: 'physics', icon: oblykClimbingStylePhysics },
        { value: 'finger', icon: oblykClimbingStyleFinger },
        { value: 'grip', icon: oblykClimbingStyleGrip },
        { value: 'coordination', icon: oblykClimbingStyleCoordination },
        { value: 'tall_people', icon: oblykClimbingStyleTallPeople },
        { value: 'small_people', icon: oblykClimbingStyleSmallPeople }
      ]
    }
  }
}
