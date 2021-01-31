<template>
  <div class="close-form-btn">
    <v-btn
      class="close-btn"
      @click="backTo"
      icon
      :large="!isMobile"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'CloseForm',
  props: {
    backToUrl: String
  },

  data () {
    return {
      isMobile: false
    }
  },

  mounted () {
    this.onResize()
  },

  methods: {
    backTo: function () {
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
