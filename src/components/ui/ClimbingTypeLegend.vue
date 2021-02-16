<template>
  <div>
    <span class="climbs-pastille sport_climbing mr-3">
      {{ $t('models.climbs.sport_climbing') }}
    </span>
    <span class="climbs-pastille bouldering mr-3">
      {{ $t('models.climbs.bouldering') }}
    </span>
    <span class="climbs-pastille multi_pitch mr-3">
      {{ $t('models.climbs.multi_pitch') }}
    </span>
    <span class="climbs-pastille trad_climbing mr-3">
      {{ $t('models.climbs.trad_climbing') }}
    </span>
    <span class="climbs-pastille aid_climbing mr-3">
      {{ $t('models.climbs.aid_climbing') }}
    </span>
    <span class="climbs-pastille deep_water mr-3">
      {{ $t('models.climbs.deep_water') }}
    </span>
    <span class="climbs-pastille via_ferrata">
      {{ $t('models.climbs.via_ferrata') }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'ClimbingTypeLegend'
}
</script>
