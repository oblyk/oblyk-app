<template>
  <svg
    :height="height"
    :width="svgWidth"
    style="margin-bottom: -5px"
  >
    <rect
      v-for="(item, itemIndex) in data"
      :key="`rect-index-${itemIndex}`"
      :width="barWidth"
      :height="rectHeight(item)"
      :x="rectX(itemIndex)"
      :y="rectY(item)"
      :fill="colors[itemIndex]"
    />
    <text
      v-if="title"
      x="0"
      y="7"
      font-size="0.7em"
      :fill="titleColor"
    >
      {{ title }}
    </text>
  </svg>
</template>
<script>
export default {
  name: 'Sparkbar',
  props: {
    data: {
      type: Array,
      required: true
    },
    colors: {
      type: Array,
      required: true
    },
    gutter: {
      type: Number,
      default: 1
    },
    barWidth: {
      type: Number,
      default: 5
    },
    height: {
      type: Number,
      default: 25
    },
    title: {
      type: String,
      default: null
    },
    titleColor: {
      type: String,
      default: 'black'
    }
  },

  computed: {
    maxValue () {
      return Math.max(...this.data)
    },

    svgWidth () {
      return this.data.length * (this.barWidth + this.gutter)
    }
  },

  methods: {
    rectX (index) {
      return index * (this.barWidth + this.gutter)
    },

    rectY (item) {
      return this.height - this.rectHeight(item)
    },

    rectHeight (item) {
      return this.height / this.maxValue * item
    }
  }
}
</script>
