import moment from 'moment'
export const DateHelpers = {
  methods: {
    today: function () {
      return moment()
    },

    humanizeDate: function (date) {
      moment.locale(this.$vuetify.lang.current)
      return moment(date).format('LL')
    }
  }
}
