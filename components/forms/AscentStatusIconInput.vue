<template>
  <v-dialog
    v-model="ascentModal"
    width="500"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        color="amber darken-1"
        :title="statusTitle"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>
          {{ statusIcon }}
        </v-icon>
      </v-btn>
    </template>

    <v-card class="pa-4">
      <v-card-title class="px-2">
        {{ $t('components.input.ascentStatusIcon') }}
      </v-card-title>
      <v-sheet
        v-for="(status, ascentStatusIndex) in ascentStatuses"
        :key="`ascent-status-index-${ascentStatusIndex}`"
        class="pa-2 rounded-sm activable-v-sheet mb-2"
        :class="status.value === ascentStatus ? '--active' : '--inactive'"
        @click="onSelect(status.value)"
      >
        <v-icon
          color="amber darken-1"
          class="mr-2"
        >
          {{ status.icon }}
        </v-icon>
        {{ status.text }}
      </v-sheet>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  mdiCropSquare,
  mdiCheckboxMarkedCircle,
  mdiRecordCircle,
  mdiFlash,
  mdiEye,
  mdiAutorenew
} from '@mdi/js'

export default {
  name: 'AscentStatusIconInput',
  props: {
    value: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      ascentModal: false,
      ascentStatuses: [
        { text: this.$t('models.ascentStatus.project'), value: 'project', icon: mdiCropSquare },
        { text: this.$t('models.ascentStatus.sent'), value: 'sent', icon: mdiCheckboxMarkedCircle },
        { text: this.$t('models.ascentStatus.red_point'), value: 'red_point', icon: mdiRecordCircle },
        { text: this.$t('models.ascentStatus.flash'), value: 'flash', icon: mdiFlash },
        { text: this.$t('models.ascentStatus.onsight'), value: 'onsight', icon: mdiEye },
        { text: this.$t('models.ascentStatus.repetition'), value: 'repetition', icon: mdiAutorenew }
      ],
      ascentStatus: this.value,

      mdiEye,
      mdiFlash,
      mdiCropSquare,
      mdiCheckboxMarkedCircle,
      mdiRecordCircle
    }
  },

  computed: {
    statusIcon () {
      for (const status of this.ascentStatuses) {
        if (status.value === this.ascentStatus) {
          return status.icon
        }
      }
      return mdiCheckboxMarkedCircle
    },

    statusTitle () {
      for (const status of this.ascentStatuses) {
        if (status.value === this.ascentStatus) {
          return status.text
        }
      }
      return this.$t('models.ascentStatus.sent')
    }
  },

  methods: {
    onSelect (status) {
      this.ascentStatus = status
      this.ascentModal = false
      this.$emit('input', this.ascentStatus)
    }
  }
}
</script>
