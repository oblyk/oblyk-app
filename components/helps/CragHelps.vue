<template>
  <div>
    <h3 class="mt-4 mb-2">
      {{ $t('helps.crag.title') }}
    </h3>
    <v-expansion-panels focusable>
      <!-- Delete my account -->
      <v-expansion-panel>
        <v-expansion-panel-header v-html="$t('helps.crag.addApproach.title')" />
        <v-expansion-panel-content class="pt-4">
          <p>coucou</p>
          <p v-html="$t('helps.crag.addApproach.explain')" />
          <ul>
            <li>{{ $t('helps.crag.addApproach.findCrag') }}</li>
            <li>{{ $t('helps.crag.addApproach.mapTab') }}</li>
            <li>{{ $t('helps.crag.addApproach.addApproachBtn') }}</li>
            <li>{{ $t('helps.crag.addApproach.descriptionAndType') }}</li>
            <li>{{ $t('helps.crag.addApproach.drawApproach') }}</li>
          </ul>
          <p class="mt-5 text--disabled" v-html="$t('helps.crag.addApproach.tips')" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  name: 'CragHelps'
}
</script>
