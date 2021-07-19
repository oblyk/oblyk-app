<template>
  <div class="submit-form-area">
    <overlay-form
      :overlay="overlay"
      :progressable="progressable"
      :progress-value="progressValue"
    />

    <v-btn
      v-if="goBackBtn"
      @click="$router.go(-1)"
      icon
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-btn
      color="primary"
      :tabindex="tabindex"
      :type="submitBtnColor"
      class="float-right"
    >
      {{ $t(submitLocalKey) }}
    </v-btn>
    <slot></slot>
  </div>
</template>
<script>
import OverlayForm from '@/components/forms/OverlayForm'

export default {
  name: 'SubmitForm',
  components: { OverlayForm },
  props: {
    overlay: Boolean,
    submitLocalKey: {
      type: String,
      required: false,
      default: 'actions.submit'
    },
    submitBtnColor: {
      type: String,
      required: false,
      default: 'primary'
    },
    tabindex: Number,
    goBackBtn: {
      type: Boolean,
      default: true
    },
    progressable: {
      type: Boolean,
      default: false
    },
    progressValue: Number
  }
}
</script>

<style lang="scss" scoped>
.submit-form-area {
  min-height: 2.5em;
}
</style>
