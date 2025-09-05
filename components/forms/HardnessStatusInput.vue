<template>
  <v-input>
    <fieldset class="full-width custom-fieldset border rounded mt-n1 pb-0 px-2">
      <legend class="v-label custom-fieldset-label">
        {{ $t(labelKey) }}
      </legend>
      <div class="d-flex align-center">
        <v-chip-group
          v-model="hardnessStatus"
          active-class="primary--text"
          column
          @change="onChange"
        >
          <v-chip
            v-for="(item, itemIndex) in hardnessStatuses"
            :key="`item-index-${itemIndex}`"
            :value="item.value"
            outlined
          >
            {{ item.text }}
          </v-chip>
        </v-chip-group>
        <v-btn
          v-if="hardnessStatus !== null"
          class="ml-auto"
          small
          icon
          @click="clear"
        >
          <v-icon>
            {{ mdiClose }}
          </v-icon>
        </v-btn>
      </div>
    </fieldset>
  </v-input>
</template>

<script>
import { mdiScaleBalance, mdiClose } from '@mdi/js'
import { InputHelpers } from '@/mixins/InputHelpers'

export default {
  name: 'HardnessStatusInput',
  mixins: [InputHelpers],
  props: {
    value: {
      type: String,
      default: null
    },
    labelKey: {
      type: String,
      default: 'components.input.hardnessStatus'
    }
  },

  data () {
    return {
      hardnessStatuses: [
        { text: this.$t('models.hardnessStatusShort.easy_for_the_grade'), value: 'easy_for_the_grade' },
        { text: this.$t('models.hardnessStatusShort.this_grade_is_accurate'), value: 'this_grade_is_accurate' },
        { text: this.$t('models.hardnessStatusShort.sandbagged'), value: 'sandbagged' }
      ],
      hardnessStatus: this.value,

      mdiScaleBalance,
      mdiClose
    }
  },

  methods: {
    clear () {
      this.hardnessStatus = null
      this.onChange()
    },

    onChange () {
      this.$emit('input', this.hardnessStatus)
    },

    onFocus () {
      this.$refs.hardnessStatusInput.isMenuActive = true
    }
  }
}
</script>
