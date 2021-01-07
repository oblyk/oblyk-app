import moment from 'moment'
export const DateHelpers = {
  methods: {
    today: function () {
      return moment()
    },

    humanizeDate: function (date, format = 'LL') {
      moment.locale(this.$vuetify.lang.current)
      return moment(date).format(format)
    }
  }
}
