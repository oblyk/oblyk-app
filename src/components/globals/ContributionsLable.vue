<template>
  <router-link class="contributions-link text--disabled" :to="versionPath()">
    <strong>{{ versionsCount || 0 }}</strong>
    {{ $tc('components.version.contribution', versionsCount) }}
  </router-link>
</template>

<script>
export default {
  name: 'ContributionsLabel',
  props: {
    versionType: String,
    versionId: [String, Number],
    versionsCount: [String, Number]
  },

  methods: {
    versionPath: function () {
      return `/versions/${this.versionType.toLowerCase()}/${this.versionId}/changes`
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
