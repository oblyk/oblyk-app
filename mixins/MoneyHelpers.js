export const MoneyHelpers = {
  methods: {
    humanizeAmount (amount) {
      const currencySymbole = {
        EUR: '€'
      }
      return `${(amount.cents / 100).toLocaleString()} ${currencySymbole[amount.currency]}`
    }
  }
}
