<template>
  <div>
    <v-select
      ref="indoorClimbingStyleInput"
      v-model="climbingStylesValue"
      :items="favoriteClimbingStyles || MD_ClimbingStyles"
      outlined
      chips
      :label="label || $t('components.input.climbingStyle')"
      item-text="text"
      item-value="value"
      multiple
      :prepend-inner-icon="icon"
      :disabled="loadingClimbingStyle"
      :loading="loadingClimbingStyle"
      :hide-details="hideDetails"
      readonly
      @click="openModal"
      @focus="openModal"
    >
      <template #selection="data">
        <v-chip
          v-bind="data.attrs"
          :input-value="data.selected"
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
    </v-select>
    <v-dialog
      v-model="styleModal"
      max-width="450"
      persistent
      :fullscreen="$vuetify.breakpoint.mobile"
    >
      <v-card class="d-flex flex-column">
        <v-sheet
          class="pa-4 v-card__title"
          style="position: sticky; top: 0; z-index: 1"
        >
          <v-icon left>
            {{ icon }}
          </v-icon>
          {{ $t('components.gymClimbingStyles.whichStyle') }}
        </v-sheet>
        <v-card-text>
          <div v-if="favoriteStyles.length > 0">
            <p class="font-weight-medium pl-2 mb-1 mt-2">
              {{ $t('common.myFavorites') }}
            </p>
            <climbing-style-btn
              v-for="(favoriteStyle, favoriteStyleIndex) in favoriteStyles"
              :key="`favorite-style-index-${favoriteStyleIndex}`"
              :climbing-style="favoriteStyle"
              :style-list="climbingStylesValue"
              @input="addStyle"
            />
          </div>
          <p
            v-if="favoriteStyles.length > 0"
            class="font-weight-medium pl-2 mb-1 mt-4"
          >
            {{ $t('common.others') }}
          </p>
          <climbing-style-btn
            v-for="(otherStyle, otherStyleIndex) in othersStyles"
            :key="`other-style-index-${otherStyleIndex}`"
            :climbing-style="otherStyle"
            :style-list="climbingStylesValue"
            @input="addStyle"
          />
        </v-card-text>
        <v-sheet
          class="pa-4 mt-auto d-flex"
          style="position: sticky; bottom: 0"
        >
          <v-btn
            text
            @click.prevent="closeModal"
          >
            {{ $t('actions.close') }}
          </v-btn>
          <v-btn
            color="primary"
            elevation="0"
            class="ml-auto"
            @click.prevent="closeModal"
          >
            {{ $t('actions.ok') }}
          </v-btn>
        </v-sheet>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ClimbingStylesMixin } from '~/mixins/ClimbingStylesMixin'
import GymClimbingStyleApi from '~/services/oblyk-api/GymClimbingStyleApi'
import ClimbingStyleBtn from '~/components/forms/ClimbingStyleBtn.vue'

export default {
  name: 'IndoorClimbingStylesInput',
  components: { ClimbingStyleBtn },
  mixins: [ClimbingStylesMixin],
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
    },
    icon: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      styleModal: false,
      openable: true,
      loadingClimbingStyle: true,
      climbingStylesValue: this.value,
      gymClimbingStyles: {},
      favoriteStyles: [],
      othersStyles: []
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
      for (const climbingStyle of this.MD_ClimbingStyles) {
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
      this.climbingStylesValue = this.value
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
          for (const climbingStyle of this.MD_ClimbingStyles) {
            const gymStyle = this.gymClimbingStyles[this.climbingType]?.find(style => style.style === climbingStyle.value)
            if (gymStyle) {
              climbingStyle.color = gymStyle.color
              this.favoriteStyles.push(climbingStyle)
            } else {
              this.othersStyles.push(climbingStyle)
            }
          }
        })
        .finally(() => {
          this.loadingClimbingStyle = false
        })
    },

    onChange () {
      this.$emit('input', this.climbingStylesValue)
    },

    addStyle (styleValue) {
      if (this.climbingStylesValue.includes(styleValue)) {
        const styleIndex = this.climbingStylesValue.indexOf(styleValue)
        this.climbingStylesValue.splice(styleIndex, 1)
      } else {
        this.climbingStylesValue.push(styleValue)
      }
      this.$emit('input', this.climbingStylesValue)
    },

    openModal () {
      if (!this.openable) {
        return false
      }
      this.styleModal = true
    },

    remove (item) {
      const index = this.climbingStylesValue.indexOf(item.value)
      if (index >= 0) {
        this.climbingStylesValue.splice(index, 1)
      }
    },

    closeModal () {
      this.openable = false
      setTimeout(() => { this.openable = true }, 200)
      this.styleModal = false
      this.$refs.indoorClimbingStyleInput.focus()
    }
  }
}
</script>
