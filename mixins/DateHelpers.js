export const DateHelpers = {
  methods: {
    today () {
      return this.$moment()
    },

    utcDate () {
      return this.$moment.utc().format()
    },

    humanizeDate (date, format = 'LL') {
      this.$moment.locale(this.$vuetify.lang.current)
      return this.$moment(date).format(format)
    },

    yearsOld (dateOfBirth, toS = true) {
      const yearsOld = this.$moment().diff(this.$moment(dateOfBirth), 'years')
      return toS ? `${yearsOld}${this.$t('date.yearsOld')}` : yearsOld
    },

    dateFromNow (date) {
      this.$moment.locale(this.$vuetify.lang.current)
      return this.$moment(date).fromNow()
    },

    dateFromToday (date) {
      const today = this.$moment().format('YYYY-MM-DD')
      this.$moment.locale(this.$vuetify.lang.current)
      if (date === today) {
        return this.$t('common.today')
      } else {
        return this.$moment(today).to(this.$moment(date))
      }
    },

    feedDateFromNow (date) {
      const breakingDate = this.$moment().subtract(15, 'day').format('YYYY-MM-DD')
      if (this.dateIsAfterDate(
        date,
        breakingDate
      )) {
        return `${this.$t('common.at')} ${this.humanizeDate(date)}`
      } else {
        return this.dateFromNow(date)
      }
    },

    dateIsAfterDate (firstDate, secondDate) {
      return this.$moment(secondDate).isAfter(this.$moment(firstDate))
    },

    humanizeDateDuration (date) {
      this.$moment.locale(this.$vuetify.lang.current)
      return this.$moment.duration(this.$moment().diff(this.$moment(date), 'minutes'), 'minutes').humanize()
    },

    isSameDay (firstDate, secondDate) {
      return this.$moment(firstDate).format('YYYY-MM-DD') === this.$moment(secondDate).format('YYYY-MM-DD')
    },

    isoDate (date) {
      return this.$moment(date).format('YYYY-MM-DD')
    }
  }
}
