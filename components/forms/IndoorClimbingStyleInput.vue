<template>
  <v-autocomplete
    v-model="climbingStyles"
    :items="favoriteClimbingStyles || climbingStyleList"
    outlined
    chips
    :label="label || $t('components.input.climbingStyle')"
    item-text="text"
    item-value="value"
    multiple
    :disabled="loadingClimbingStyle"
    :loading="loadingClimbingStyle"
    @change="onChange"
  >
    <template #selection="data">
      <v-chip
        v-bind="data.attrs"
        :input-value="data.selected"
        close
        @click="data.select"
        @click:close="remove(data.item)"
      >
        <v-icon
          left
          :color="data.item.color"
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
              size="35"
              class="mr-3"
              left
              :color="data.item.color"
            >
              {{ data.item.icon }}
            </v-icon>
            {{ data.item.text }}
          </v-list-item-title>
        </v-list-item-content>
      </template>
    </template>
  </v-autocomplete>
</template>

<script>
import {
  oblykClimbingStyleBoulder,
  oblykClimbingStyleCoordination,
  oblykClimbingStyleEndurance,
  oblykClimbingStyleFinger,
  oblykClimbingStyleGrip,
  oblykClimbingStylePhysics,
  oblykClimbingStyleResistance,
  oblykClimbingStyleSmallPeople,
  oblykClimbingStyleTallPeople,
  oblykClimbingStyleTechnical
} from '~/assets/oblyk-icons'
import GymClimbingStyleApi from '~/services/oblyk-api/GymClimbingStyleApi'

export default {
  name: 'IndoorClimbingStylesInput',
  props: {
    value: {
      type: Array,
      default: null
    },
    gym: {
      type: Object,
      required: true
    },
    dense: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    tabindex: {
      type: Number,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    climbingType: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      loadingClimbingStyle: true,
      climbingStyleList: [
        { text: this.$t('models.climbingStyle.boulder'), value: 'boulder', icon: oblykClimbingStyleBoulder, color: null },
        { text: this.$t('models.climbingStyle.endurance'), value: 'endurance', icon: oblykClimbingStyleEndurance, color: null },
        { text: this.$t('models.climbingStyle.resistance'), value: 'resistance', icon: oblykClimbingStyleResistance, color: null },
        { text: this.$t('models.climbingStyle.technical'), value: 'technical', icon: oblykClimbingStyleTechnical, color: null },
        { text: this.$t('models.climbingStyle.physics'), value: 'physics', icon: oblykClimbingStylePhysics, color: null },
        { text: this.$t('models.climbingStyle.finger'), value: 'finger', icon: oblykClimbingStyleFinger, color: null },
        { text: this.$t('models.climbingStyle.grip'), value: 'grip', icon: oblykClimbingStyleGrip, color: null },
        { text: this.$t('models.climbingStyle.coordination'), value: 'coordination', icon: oblykClimbingStyleCoordination, color: null },
        { text: this.$t('models.climbingStyle.tall_people'), value: 'tall_people', icon: oblykClimbingStyleTallPeople, color: null },
        { text: this.$t('models.climbingStyle.small_people'), value: 'small_people', icon: oblykClimbingStyleSmallPeople, color: null }
      ],
      climbingStyles: this.value,
      gymClimbingStyles: {}
    }
  },

  computed: {
    favoriteClimbingStyles () {
      if (this.gymClimbingStyles === null) {
        return null
      }

      const favoris = []
      const others = []
      const items = []
      for (const climbingStyle of this.climbingStyleList) {
        const gymStyle = this.gymClimbingStyles[this.climbingType]?.find(style => style.style === climbingStyle.value)
        if (gymStyle) {
          climbingStyle.color = gymStyle.color
          favoris.push(climbingStyle)
        } else {
          others.push(climbingStyle)
        }
      }
      if (favoris.length > 0) {
        items.push({ header: this.$t('components.gymClimbingStyles.favorites') })
      }
      for (const style of favoris) {
        items.push(style)
      }
      if (others.length > 0 && favoris.length > 0) {
        items.push({ divider: true })
        items.push({ header: this.$t('common.others') })
      }
      for (const style of others) {
        items.push(style)
      }
      return items
    }
  },

  watch: {
    value () {
      this.climbingStyles = this.value
    }
  },

  mounted () {
    this.getGymClimbingStyle()
  },

  methods: {
    getGymClimbingStyle () {
      this.loadingClimbingStyle = true
      new GymClimbingStyleApi(this.$axios, this.$auth)
        .all(this.gym.id)
        .then((resp) => {
          this.gymClimbingStyles = resp.data
        })
        .finally(() => {
          this.loadingClimbingStyle = false
        })
    },

    onChange () {
      this.$emit('input', this.climbingStyles)
    },

    remove (item) {
      const index = this.climbingStyles.indexOf(item.value)
      if (index >= 0) {
        this.climbingStyles.splice(index, 1)
      }
    }
  }
}
</script>
