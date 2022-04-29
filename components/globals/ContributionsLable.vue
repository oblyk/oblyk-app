<template>
  <nuxt-link class="contributions-link text--disabled" :to="versionPath()">
    <strong>{{ versionsCount || 0 }}</strong>
    {{ $tc('components.version.contribution', versionsCount) }}
  </nuxt-link>
</template>

<script>
export default {
  name: 'ContributionsLabel',
  props: {
    versionType: { type: String, default: null },
    versionId: { type: [String, Number], default: null },
    versionsCount: { type: [String, Number], default: null }
  },

  methods: {
    versionPath () {
      return `/versions/${this.versionType}/${this.versionId}/changes`
    }
  }
}
</script>

<style lang="scss" scoped>
.contributions-link {
  color: inherit;
  text-decoration: none;
}
</style>
