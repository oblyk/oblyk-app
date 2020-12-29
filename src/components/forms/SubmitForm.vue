<template>
  <div>
    <overlay-form :overlay="overlay"/>

    <v-btn
      @click="$router.go(-1)"
      icon
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-btn
      color="primary"
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
      default: 'forms.submit'
    },
    submitBtnColor: {
      type: String,
      required: false,
      default: 'primary'
    }
  }
}
</script>
