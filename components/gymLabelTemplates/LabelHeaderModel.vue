<template>
  <div
    class="d-flex border --border-bold"
    style="height: 50px"
  >
    <div
      class="px-1 text-center label-head-part"
      :class="activePart === 'left' ? '--active' : null"
      style="padding-top: 12px; width: 70px"
      @click="clickPart('left')"
    >
      Gauche
    </div>
    <div
      class="flex-grow-1 border-x --border-bold text-center label-head-part"
      style="padding-top: 12px"
      :class="activePart === 'center' ? '--active' : null"
      @click="clickPart('center')"
    >
      Center
    </div>
    <div
      class="px-1 text-center label-head-part"
      style="padding-top: 12px; width: 70px"
      :class="activePart === 'right' ? '--active' : null"
      @click="clickPart('right')"
    >
      Droite
    </div>
  </div>
</template>
<script>
export default {
  name: 'LabelHeaderModel',
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
      this.callback(this.activePart)
    }
  }
}
</script>

<style lang="scss">
.label-head-part {
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
