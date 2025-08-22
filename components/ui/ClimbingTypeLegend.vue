<template>
  <div>
    <div
      v-for="(style, styleIndex) in ['sport_climbing', 'bouldering', 'multi_pitch', 'trad_climbing', 'aid_climbing', 'deep_water', 'via_ferrata']"
      :key="`style-index-${styleIndex}`"
      class="mr-3 d-inline-block"
    >
      <climbing-style-icon
        :climbing-style="style"
        small
        class="vertical-align-sub"
      />
      {{ $t(`models.climbs.${style}`) }}
    </div>
  </div>
</template>

<script>
import ClimbingStyleIcon from '~/components/crags/ClimbingStyleIcon.vue'

export default {
  name: 'ClimbingTypeLegend',
  components: { ClimbingStyleIcon }
}
</script>
