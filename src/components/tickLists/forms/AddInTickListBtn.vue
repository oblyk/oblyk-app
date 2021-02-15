<template>
  <v-btn
    text
    color="primary"
    :loading="loadingAdd"
    v-if="!inMyTickList"
    @click="addInTickList()"
  >
    <v-icon left>
      mdi-crop-free
    </v-icon>
    {{  $t('actions.addInMyTickList') }}
  </v-btn>
</template>

<script>
import TickListApi from '@/services/oblyk-api/TickListApi'
import store from '@/store'

export default {
  name: 'AddInTickListBtn',
  props: {
    cragRoute: Object
  },

  data () {
    return {
      loadingAdd: false
    }
  },

  computed: {
    inMyTickList: function () {
      const tickList = store.getters['auth/getTickList'] || []
      return (tickList.includes(this.cragRoute.id))
    }
  },

  methods: {
    addInTickList: function () {
      this.loadingAdd = true
      TickListApi
        .create(this.cragRoute.id)
        .then(resp => {
          store.dispatch('auth/updateTickList', { tick_list: resp.data })
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'tickList')
        })
        .then(() => {
          this.loadingAdd = false
        })
    }
  }
}
</script>
