<template>
  <v-btn
    v-if="!inMyTickList"
    text
    outlined
    color="primary"
    :loading="loadingAdd"
    @click="addInTickList()"
  >
    <v-icon left>
      {{ mdiCropFree }}
    </v-icon>
    {{ $t('actions.addInMyTickList') }}
  </v-btn>
</template>

<script>
import { mdiCropFree } from '@mdi/js'
import TickListApi from '~/services/oblyk-api/TickListApi'

export default {
  name: 'AddInTickListBtn',
  props: {
    cragRoute: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiCropFree,
      loadingAdd: false
    }
  },

  computed: {
    inMyTickList () {
      const tickList = this.$auth.user.tick_list || []
      return (tickList.includes(this.cragRoute.id))
    }
  },

  methods: {
    addInTickList () {
      this.loadingAdd = true
      new TickListApi(this.$axios, this.$auth)
        .create(this.cragRoute.id)
        .then((resp) => {
          this.$auth.fetchUser()
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'tickList')
        })
        .then(() => {
          this.loadingAdd = false
        })
    }
  }
}
</script>
