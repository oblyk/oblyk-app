<template>
  <div class="d-flex border --border-bold">
    <div
      class="border-right --border-bold px-1 text-center label-footer-part"
      :class="activePart === 'left' ? '--active' : null"
      style="padding-top: 21px; width: 70px"
      @click="clickPart('left')"
    >
      Gauche
    </div>
    <div class="flex-grow-1 flex-column">
      <div
        class="border-bottom --border-bold text-center label-footer-part"
        style="height: 35px; padding-top: 5px"
        :class="activePart === 'top' ? '--active' : null"
        @click="clickPart('top')"
      >
        Haut
      </div>
      <div
        class="text-center label-footer-part"
        style="height: 35px; padding-top: 5px"
        :class="activePart === 'bottom' ? '--active' : null"
        @click="clickPart('bottom')"
      >
        Bas
      </div>
    </div>
    <div
      class="border-left --border-bold px-1 text-center label-footer-part"
      style="padding-top: 21px; width: 70px"
      :class="activePart === 'right' ? '--active' : null"
      @click="clickPart('right')"
    >
      Droite
    </div>
  </div>
</template>
<script>
export default {
  name: 'LabelFooterModel',
  props: {
    callback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      activePart: null
    }
  },

  methods: {
    clickPart (part) {
      this.activePart = part === this.activePart ? null : part
      this.callback(part)
    }
  }
}
</script>

<style lang="scss">
.label-footer-part {
  cursor: pointer;
  &:hover {
    background-color: #31994e50;
  }
  &.--active {
    background-color: #31994e;
    color: white;
    font-weight: bold;
  }
}
</style>
