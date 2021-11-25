export const TextHelpers = {
  methods: {
    removeAccented: function (string) {
      return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    }
  }
}
