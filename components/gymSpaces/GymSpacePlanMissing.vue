<template>
  <div class="explain-plan-missing">
    <p class="text-center">
      <v-icon large>
        mdi-map
      </v-icon>
    </p>
    <p
      class="text-center"
      v-html="$t('components.gymSpace.explainMissingPlan', { name: gymSpace.name })"
    />
    <p class="text-center">
      <v-btn
        :to="`${gymSpace.path}/upload-plan`"
        outlined
      >
        {{ $t('actions.uploadMap') }}
      </v-btn>
    </p>
  </div>
</template>
<script>
export default {
  name: 'GymSpacePlanMissing',
  props: {
    gymSpace: Object
  }
}
</script>
<style lang="scss" scoped>
.explain-plan-missing {
  width: 100%;
  margin-top: 5em;
}
</style>
