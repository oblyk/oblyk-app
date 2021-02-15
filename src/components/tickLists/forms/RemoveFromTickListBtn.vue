<template>
  <v-btn
    text
    color="red"
    v-if="inMyTickList"
    :loading="loadingDelete"
    @click="removeFromTickList()"
  >
    <v-icon left>
      mdi-delete
    </v-icon>
    {{  $t('actions.removeFromMyTickList') }}
  </v-btn>
</template>

<script>
import TickListApi from '@/services/oblyk-api/TickListApi'
import store from '@/store'

export default {
  name: 'RemoveFromTickListBtn',
  props: {
    cragRoute: Object
  },

  data () {
    return {
      loadingDelete: false
    }
  },

  computed: {
    inMyTickList: function () {
      const tickList = store.getters['auth/getTickList'] || []
      return (tickList.includes(this.cragRoute.id))
    }
  },

  methods: {
    removeFromTickList: function () {
      this.loadingDelete = true
      TickListApi
        .delete(this.cragRoute.id)
        .then(resp => {
          store.dispatch('auth/updateTickList', { tick_list: resp.data })
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'tickList')
        })
        .finally(() => {
          this.loadingDelete = false
        })
    }
  }
}
</script>
