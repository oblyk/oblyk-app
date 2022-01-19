<template>
  <v-list-item>
    <v-list-item-content style="max-width: 60px">
      <v-list-item-title>
        <v-chip>
          L.{{ index + 1 }}
        </v-chip>
      </v-list-item-title>
    </v-list-item-content>
    <v-list-item-content>
      <v-list-item-title>
        <strong>
          {{ section.grade }}
        </strong> |
        <span class="span-comma">
          <span v-if="section.height">
            {{ section.height }} {{ $t('common.meters') }}
          </span>
          <span v-if="section.bolt_type">
            {{ $t(`models.boltType.${section.bolt_type}`) }}
          </span>
          <span v-if="section.anchor_type">
            {{ $t('models.cragRoute.anchor') }} :
            {{ $t(`models.anchorType.${section.anchor_type}`) }}
          </span>
        </span>
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ section.description }}
      </v-list-item-subtitle>
      <v-list-item-subtitle>
        <small
          v-for="(tag, index) in section.tags"
          :key="`route-section-tag-${index}`"
        >
          #{{ $t(`models.tags.${tag}`) }}
        </small>
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
export default {
  name: 'CragRouteSectionItemList',
  props: {
    cragRoute: Object,
    section: Object,
    index: Number
  }
}
</script>
