<template>
  <div
    class="oblyk-alert"
    :class="`oblyk-alert-${alert.alert_type}`"
  >
    <markdown-text
      v-if="alert.description"
      :text="alert.description"
    />
  </div>
</template>

<script>
import MarkdownText from '@/components/ui/MarkdownText'

export default {
  name: 'AlertFeedCard',
  components: { MarkdownText },
  props: {
    alert: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.oblyk-alert {
  border-left-style: solid;
  border-width: 4px;
  padding: 1px 15px;
  &.oblyk-alert-good {
    border-color: #4caf50;
    color: #388e3c;
  }
  &.oblyk-alert-warning {
    border-color: #ffc107;
  }
  &.oblyk-alert-info {
    border-color: #03a9f4;
  }
  &.oblyk-alert-bad {
    border-color: #d32f2f;
    color: #ef5350;
  }
}
</style>
