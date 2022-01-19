export const TextHelpers = {
  methods: {
    removeAccented (string) {
      return string.normalize('NFD').replace(/[\u0300-\u036F]/g, '')
    }
  }
}
