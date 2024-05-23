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
          <span v-if="section.bolt_count">
            {{ $tc('components.cragRoute.pointCount', section.bolt_count, { count: section.bolt_count }) }}
          </span>
          <span v-if="section.anchor_type">
            <strong>{{ $t('models.cragRoute.anchor') }} :</strong>
            {{ $t(`models.anchorType.${section.anchor_type}`) }}
          </span>
        </span>
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ section.description }}
      </v-list-item-subtitle>
      <v-list-item-subtitle>
        <small
          v-for="(tag, tagIndex) in section.tags"
          :key="`route-section-tag-${tagIndex}`"
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
