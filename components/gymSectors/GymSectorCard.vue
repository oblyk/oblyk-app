<template>
  <v-list-item
    :class="bindClass"
    class="rounded"
    :to="!callback ? gymSector.app_path : null"
  >
    <v-list-item-avatar tile>
      <gym-sector-avatar :gym-sector="gymSector" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        <v-icon
          left
          small
          color="primary"
        >
          {{ mdiTextureBox }}
        </v-icon>
        {{ gymSector.name }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ gymSector.gym_space.name }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
import { mdiTextureBox } from '@mdi/js'
import GymSectorAvatar from '~/components/gymSectors/GymSectorAvatar'

export default {
  name: 'GymSectorCard',
  components: { GymSectorAvatar },
  props: {
    gymSector: {
      type: Object,
      required: true
    },
    callback: {
      type: Function,
      default: null
    },
    bordered: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      mdiTextureBox
    }
  },

  computed: {
    bindClass () {
      const classList = []
      if (this.bordered) {
        classList.push('border')
      }
      return classList.join(' ')
    }
  }
}
</script>
