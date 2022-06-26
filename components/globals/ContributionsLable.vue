<template>
  <nuxt-link
    class="text--disabled text-decoration-underline"
    :to="versionPath"
  >
    <strong>{{ versionsCount || 0 }}</strong>
    {{ $tc(translateKey, versionsCount) }}
  </nuxt-link>
</template>

<script>
export default {
  name: 'ContributionsLabel',
  props: {
    versionType: {
      type: String,
      default: null
    },
    versionId: {
      type: [String, Number],
      default: null
    },
    versionsCount: {
      type: [String, Number],
      default: null
    },
    translateKey: {
      type: String,
      default: 'components.version.contribution'
    }
  },

  computed: {
    versionPath () {
      return `/versions/${this.versionType}/${this.versionId}/changes`
    }
  }
}
</script>
