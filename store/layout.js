export const state = () => ({
  layoutPadding: true
})

export const mutations = {
  LAYOUT_PADDING (state, layoutPadding) {
    state.layoutPadding = layoutPadding
  }
}
