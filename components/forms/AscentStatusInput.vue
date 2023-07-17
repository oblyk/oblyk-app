<template>
  <v-select
    ref="ascentStatusInput"
    v-model="ascentStatus"
    v-disabled-icon-focus
    :items="ascentStatuses"
    item-text="text"
    item-value="value"
    :label="$t('components.input.ascentStatus')"
    outlined
    clearable
    @change="onChange"
    @focus="onFocus"
  >
    <template #selection="data">
      <v-chip
        v-bind="data.attrs"
        :input-value="data.selected"
      >
        <v-icon
          color="amber darken-1"
          left
          small
        >
          {{ data.item.icon }}
        </v-icon>
        {{ data.item.text }}
      </v-chip>
    </template>
    <template #item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item" />
      </template>
      <template v-else>
        <v-list-item-content>
          <v-list-item-title>
            <v-icon
              left
              small
              color="amber darken-1"
            >
              {{ data.item.icon }}
            </v-icon>
            {{ data.item.text }}
          </v-list-item-title>
        </v-list-item-content>
      </template>
    </template>
  </v-select>
</template>

<script>
import { mdiCropSquare, mdiCheckboxMarkedCircle, mdiRecordCircle, mdiFlash, mdiEye, mdiAutorenew } from '@mdi/js'
import { InputHelpers } from '@/mixins/InputHelpers'

export default {
  name: 'AscentStatusInput',
  mixins: [InputHelpers],
  props: {
    value: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      ascentStatuses: [
        { text: this.$t('models.ascentStatus.project'), value: 'project', icon: mdiCropSquare },
        { text: this.$t('models.ascentStatus.sent'), value: 'sent', icon: mdiCheckboxMarkedCircle },
        { text: this.$t('models.ascentStatus.red_point'), value: 'red_point', icon: mdiRecordCircle },
        { text: this.$t('models.ascentStatus.flash'), value: 'flash', icon: mdiFlash },
        { text: this.$t('models.ascentStatus.onsight'), value: 'onsight', icon: mdiEye },
        { text: this.$t('models.ascentStatus.repetition'), value: 'repetition', icon: mdiAutorenew }
      ],
      ascentStatus: this.value
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.ascentStatus)
    },

    onFocus () {
      this.$refs.ascentStatusInput.isMenuActive = true
    }
  }
}
</script>
