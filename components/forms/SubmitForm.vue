<template>
  <div class="submit-form-area">
    <overlay-form
      :overlay="overlay"
      :progressable="progressable"
      :progress-value="progressValue"
    />

    <v-btn
      v-if="goBackBtn"
      icon
      @click="goBackClick"
    >
      <v-icon>{{ mdiArrowLeft }}</v-icon>
    </v-btn>
    <v-btn
      elevation="0"
      color="primary"
      :tabindex="tabindex"
      :type="submitBtnColor"
      class="float-right"
    >
      {{ $t(submitLocalKey) }}
    </v-btn>
    <slot />
  </div>
</template>

<script>
import { mdiArrowLeft } from '@mdi/js'
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
    tabindex: {
      type: Number,
      default: null
    },
    goBackBtn: {
      type: Boolean,
      default: true
    },
    goBackCallback: {
      type: Function,
      default: null
    },
    progressable: {
      type: Boolean,
      default: false
    },
    progressValue: {
      type: Number,
      default: null
    }
  },

  data () {
    return {
      mdiArrowLeft
    }
  },

  methods: {
    goBackClick () {
      if (this.goBackCallback) {
        this.goBackCallback()
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.submit-form-area {
  min-height: 2.5em;
}
</style>
