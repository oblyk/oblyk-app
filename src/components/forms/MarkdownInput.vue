<template>
  <div class="pb-3">
    <v-textarea
      outlined
      v-model="body"
      :label="label"
      hide-details
      @focus="showTips = true"
      @blur="showTips = false"
      @input="onChange"
    />
    <v-dialog
      v-model="markdownModal"
      width="600"
    >
      <template v-slot:activator="{ on, attrs }">
        <small
          class="markdown-tips"
          v-if="!hideDetail"
          v-bind:class="tipsClass"
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
    value: String,
    label: String,
    hideDetail: {
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
    tipsClass: function () {
      return this.showTips ? 'tips-show' : 'tips-hide'
    }
  },

  methods: {
    onChange: function () {
      this.$emit('input', this.body)
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
