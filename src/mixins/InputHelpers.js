export const InputHelpers = {
  directives: {
    disabledIconFocus: {
      bind (el) {
        el.querySelectorAll('.v-input__icon button').forEach(x => x.setAttribute('tabindex', -1))
      }
    }
  },

  methods: {
    onMenuFocus: function () {
      console.log(this.$refs)
    }
  }
}
