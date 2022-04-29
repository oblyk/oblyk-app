<template>
  <v-btn
    v-if="inMyTickList"
    text
    color="red"
    :loading="loadingDelete"
    @click="removeFromTickList()"
  >
    <v-icon left>
      {{ mdiDelete }}
    </v-icon>
    {{ $t('actions.removeFromMyTickList') }}
  </v-btn>
</template>

<script>
import { mdiDelete } from '@mdi/js'
import TickListApi from '~/services/oblyk-api/TickListApi'

export default {
  name: 'RemoveFromTickListBtn',
  props: {
    cragRoute: Object
  },

  data () {
    return {
      mdiDelete,
      loadingDelete: false
    }
  },

  computed: {
    inMyTickList () {
      const tickList = this.$auth.user.tick_list || []
      return (tickList.includes(this.cragRoute.id))
    }
  },

  methods: {
    removeFromTickList () {
      this.loadingDelete = true
      new TickListApi(this.$axios, this.$auth)
        .delete(this.cragRoute.id)
        .then((resp) => {
          this.$auth.fetchUser()
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'tickList')
        })
        .finally(() => {
          this.loadingDelete = false
        })
    }
  }
}
</script>
