import moment from 'moment'
export const DateHelpers = {
  methods: {
    today: function () {
      return moment()
    },

    utcDate: function () {
      return moment.utc().format()
    },

    humanizeDate: function (date, format = 'LL') {
      moment.locale(this.$vuetify.lang.current)
      return moment(date).format(format)
    },

    yearsOld: function (dateOfBirth, toS = true) {
      const yearsOld = moment().diff(moment(dateOfBirth), 'years')
      return toS ? `${yearsOld}${this.$t('date.yearsOld')}` : yearsOld
    },

    dateFromNow: function (date) {
      moment.locale(this.$vuetify.lang.current)
      return moment(date).fromNow()
    },

    dateIsAfterDate: function (firstDate, secondDate) {
      return moment(secondDate).isAfter(moment(firstDate))
    },

    humanizeDateDuration: function (date) {
      moment.locale(this.$vuetify.lang.current)
      return moment.duration(moment().diff(moment(date), 'minutes'), 'minutes').humanize()
    },

    isSameDay: function (firstDate, secondDate) {
      return moment(firstDate).format('YYYY-MM-DD') === moment(secondDate).format('YYYY-MM-DD')
    },

    isoDate: function (date) {
      return moment(date).format('YYYY-MM-DD')
    }
  }
}
