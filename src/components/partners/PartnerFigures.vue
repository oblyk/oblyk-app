<template>
  <p
    class="text-center"
    v-if="!loadingPartnerFigures"
  >
    <span v-html="$t('common.pages.partner.figuresGlobal', { global: globalCount })"/>
    <span
      v-if="newWeekly > 1"
      v-html="$t('common.pages.partner.figuresWeekly', { weekly: newWeekly })"
    />
  </p>
</template>

<script>
import PartnerApi from '@/services/oblyk-api/PartnerApi'

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
    getPartnerFigures: function () {
      this.loadingPartnerFigures = true
      PartnerApi
        .figures()
        .then(resp => {
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
