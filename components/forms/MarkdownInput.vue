<template>
  <div class="pb-3">
    <v-textarea
      v-model="body"
      outlined
      :label="label"
      hide-details
      :placeholder="placeholder"
      :auto-grow="autoGrow"
      :rows="rows"
      :autofocus="autofocus"
      :disabled="disabled"
      @focus="showTips = true"
      @blur="onBlur"
      @input="onChange"
    />
    <v-dialog
      v-model="markdownModal"
      width="600"
    >
      <template #activator="{ on, attrs }">
        <small
          v-if="!hideDetail"
          class="markdown-tips"
          :class="tipsClass"
          v-bind="attrs"
          v-on="on"
          v-html="$t('components.markdown.tips')"
        />
      </template>
      <v-card>
        <v-card-title class="headline">
          {{ $t('components.markdown.modalTitle') }}
        </v-card-title>
        <v-card-text>
          <markdown-explain />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import MarkdownExplain from '@/components/ui/MarkdownExplain'

export default {
  name: 'MarkdownInput',
  components: { MarkdownExplain },
  props: {
    value: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    hideDetail: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 5
    },
    autoGrow: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    blurCallback: {
      type: Function,
      default: null
    },
    persistentHint: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      markdownModal: false,
      showTips: false,
      body: this.value
    }
  },

  computed: {
    tipsClass () {
      return this.showTips || this.persistentHint ? 'tips-show' : 'tips-hide'
    }
  },

  watch: {
    value () {
      this.body = this.value
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.body)
    },

    onBlur () {
      this.showTips = false
      if (this.blurCallback) {
        this.blurCallback()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.markdown-tips {
  transition: opacity 0.3s;
}
.tips-show {
  opacity: 1;
}
.tips-hide {
  opacity: 0;
}
</style>
