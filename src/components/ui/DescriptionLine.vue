<template>
  <div>
    <p class="mb-0 font-weight-bold">
      <v-icon small left>
        {{ icon }}
      </v-icon>
      {{ itemTitle }}
    </p>
    <div class="pl-7">
      <span v-if="itemValue">
        {{ itemValue }} {{ itemSuffix }}
      </span>
      <span v-else class="text--disabled">
        {{ $t('common.noInformation') }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DescriptionLine',
  props: {
    icon: String,
    itemTitle: String,
    itemValue: [String, Number],
    itemSuffix: String
  }
}
</script>
