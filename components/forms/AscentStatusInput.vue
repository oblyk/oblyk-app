<template>
  <v-input class="required-field">
    <fieldset class="full-width custom-fieldset border rounded mt-n1 pb-0 px-2">
      <legend class="v-label custom-fieldset-label">
        {{ $t('components.input.ascentStatus') }}
      </legend>
      <div>
        <v-chip-group
          v-model="ascentStatus"
          active-class="primary--text"
          column
          @change="onChange"
        >
          <v-chip
            v-for="(item, itemIndex) in ascentStatuses"
            :key="`item-index-${itemIndex}`"
            :value="item.value"
            outlined
          >
            <v-icon
              :color="ascentStatus === item.value ? 'green' : null"
              small
              left
            >
              {{ item.icon }}
            </v-icon>
            {{ item.text }}
          </v-chip>
        </v-chip-group>
      </div>
    </fieldset>
  </v-input>
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
    },
    withProject: {
      type: Boolean,
      default: true
    },
    withSent: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      ascentStatus: this.value
    }
  },

  computed: {
    ascentStatuses () {
      const statuses = []
      if (this.withProject) {
        statuses.push({ text: this.$t('models.ascentStatus.project'), value: 'project', icon: mdiCropSquare, color: 'pink lighten-3' })
      }
      if (this.withSent) {
        statuses.push({ text: this.$t('models.ascentStatus.sent'), value: 'sent', icon: mdiCheckboxMarkedCircle, color: 'green' })
      }
      statuses.push({ text: this.$t('models.ascentStatus.red_point'), value: 'red_point', icon: mdiRecordCircle, color: 'red darken-4' })
      statuses.push({ text: this.$t('models.ascentStatus.flash'), value: 'flash', icon: mdiFlash, color: 'light-blue accent-4' })
      statuses.push({ text: this.$t('models.ascentStatus.onsight'), value: 'onsight', icon: mdiEye, color: 'amber darken-1' })
      statuses.push({ text: this.$t('models.ascentStatus.repetition'), value: 'repetition', icon: mdiAutorenew, color: 'blue-grey darken-3' })
      return statuses
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.ascentStatus)
    }
  }
}
</script>
