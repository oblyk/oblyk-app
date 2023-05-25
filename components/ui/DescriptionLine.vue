<template>
  <div>
    <p class="mb-0 text-truncate">
      <v-icon
        small
        left
        :color="iconColor"
      >
        {{ icon }}
      </v-icon>
      {{ itemTitle }}
    </p>
    <div class="pl-7">
      <slot
        v-if="hasCustomContent"
        name="content"
      />
      <div v-else>
        <span v-if="itemValue" class="font-weight-bold">
          {{ itemValue }} {{ itemSuffix }}
        </span>
        <span v-else class="text--disabled">
          {{ $t('common.noInformation') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DescriptionLine',
  props: {
    icon: {
      type: String,
      default: null
    },
    iconColor: {
      type: String,
      default: null
    },
    itemTitle: {
      type: String,
      default: null
    },
    itemValue: {
      type: [String, Number],
      default: null
    },
    itemSuffix: {
      type: String,
      default: null
    }
  },

  computed: {
    hasCustomContent () {
      return !!this.$slots.content
    }
  }
}
</script>
