<template>
  <p
    v-if="!loadingPartnerFigures"
    class="text-center"
  >
    <span v-html="$t('common.pages.partner.figuresGlobal', { global: globalCount })" />
    <span
      v-if="newWeekly > 1"
      v-html="$t('common.pages.partner.figuresWeekly', { weekly: newWeekly })"
    />
  </p>
</template>

<script>
import PartnerApi from '~/services/oblyk-api/PartnerApi'

export default {
  name: 'PartnerFigures',

  data () {
    return {
      loadingPartnerFigures: true,
      globalCount: null,
      newWeekly: null
    }
  },

  mounted () {
    this.getPartnerFigures()
  },

  methods: {
    getPartnerFigures () {
      this.loadingPartnerFigures = true
      new PartnerApi(this.$axios, this.$auth)
        .figures()
        .then((resp) => {
          this.globalCount = resp.data.count_global
          this.newWeekly = resp.data.count_last_week
        })
        .finally(() => {
          this.loadingPartnerFigures = false
        })
    }
  }
}
</script>
