export const CragRouteHelpers = {
  methods: {
    isRopable (value) {
      const accepted = [
        'sport_climbing',
        'multi_pitch',
        'trad_climbing',
        'aid_climbing'
      ]
      return accepted.includes(value)
    },

    isAnchorable (value) {
      const accepted = [
        'sport_climbing',
        'multi_pitch',
        'trad_climbing',
        'aid_climbing'
      ]
      return accepted.includes(value)
    },

    isStartable (value) {
      const accepted = [
        'bouldering'
      ]
      return accepted.includes(value)
    },

    isReceptionable (value) {
      const accepted = [
        'bouldering'
      ]
      return accepted.includes(value)
    },

    isBoltable (value) {
      const accepted = [
        'sport_climbing',
        'multi_pitch',
        'trad_climbing'
      ]
      return accepted.includes(value)
    },

    isSectionnable (value) {
      const acceptable = [
        'multi_pitch',
        'trad_climbing',
        'aid_climbing',
        'via_ferrata'
      ]
      return acceptable.includes(value)
    }
  }
}
