<template>
  <div class="close-form-btn">
    <v-btn
      class="close-btn"
      icon
      :large="!isMobile"
      @click="backTo"
    >
      <v-icon>{{ mdiClose }}</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mdiClose } from '@mdi/js'

export default {
  name: 'CloseForm',
  props: {
    backToUrl: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      mdiClose,
      isMobile: false
    }
  },

  mounted () {
    this.onResize()
  },

  methods: {
    backTo () {
      if (this.backToUrl) {
        this.$router.push(this.backToUrl)
      } else {
        this.$router.go(-1)
      }
    },

    onResize () {
      this.isMobile = window.innerWidth < 600
    }
  }
}
</script>
<style lang="scss" scoped>
.close-form-btn {
  position: fixed;
  top: 74px;
  right: 10px;
  .close-btn {
    float: right;
  }
}
@media only screen and (max-width: 600px) {
  .close-form-btn {
    top: 50px;
    right: 4px;
  }
}

</style>
