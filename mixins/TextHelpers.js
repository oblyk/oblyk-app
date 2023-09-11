export const TextHelpers = {
  methods: {
    removeAccented (string) {
      return string.normalize('NFD').replace(/[\u0300-\u036F]/g, '')
    },

    capitalize (string) {
      return `${string.charAt(0).toUpperCase()}${string.slice(1).toLowerCase()}`
    }
  }
}
