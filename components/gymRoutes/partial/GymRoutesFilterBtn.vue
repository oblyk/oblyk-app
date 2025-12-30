<template>
  <div>
    <v-btn
      icon
      @click="openModal"
    >
      <v-icon :color="active ? '#743ad5' : null">
        {{ mdiFilter }}
      </v-icon>
    </v-btn>

    <v-dialog
      v-model="filterModal"
      max-width="500"
    >
      <v-card>
        <v-card-title>
          <v-icon left>
            {{ mdiFilter }}
          </v-icon>
          {{ $t('actions.filter') }}
        </v-card-title>
        <v-card-text>
          <p class="mb-2">
            {{ $t('components.gymAdmin.styles') }}
          </p>
          <v-skeleton-loader v-if="loadingStyle" type="chip" />
          <div
            v-else
            class="mx-n1"
          >
            <v-chip
              v-for="(styleCount, style) in styles"
              :key="`style-index-${style}`"
              outlined
              style="margin: 2px"
              class="pr-1"
              @click="pushStyleFilter(style)"
            >
              <v-icon left>
                {{ MC_ClimbingStylesByStyle[style].icon }}
              </v-icon>
              {{ MC_ClimbingStylesByStyle[style].text }}
              <strong class="ml-2 px-2 rounded back-app-color">
                {{ styleCount }}
              </strong>
            </v-chip>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            @click="closeModal"
          >
            {{ $t('actions.close') }}
          </v-btn>
          <v-btn
            elevation="0"
            class="ml-auto"
            color="primary"
            @click="closeModal"
          >
            {{ $t('actions.ok') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiFilter } from '@mdi/js'
import { ClimbingStylesMixin } from '~/mixins/ClimbingStylesMixin'
import GymApi from '~/services/oblyk-api/GymApi'

export default {
  name: 'GymRoutesFilterBtn',
  mixins: [ClimbingStylesMixin],
  props: {
    gym: {
      type: Object,
      required: true
    },
    gymSpace: {
      type: Object,
      default: null
    },
    filterCallback: {
      type: Function,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      filterModal: false,
      loadingStyle: true,
      styles: null,

      mdiFilter
    }
  },

  methods: {
    openModal () {
      if (this.styles === null) {
        this.getRoutesByStyles()
      } else {
        this.loadingStyle = false
      }
      this.filterModal = true
    },

    closeModal () {
      this.filterModal = false
    },

    getRoutesByStyles () {
      this.loadingStyle = true
      new GymApi(this.$axios, this.$auth)
        .routesByStyles(this.gym.id, { gym_space_id: this.gymSpace?.id })
        .then((resp) => {
          this.styles = resp.data
        })
        .finally(() => {
          this.loadingStyle = false
        })
    },

    pushStyleFilter (style) {
      this.filterCallback(
        {
          type: 'style',
          value: style,
          text: this.MC_ClimbingStylesByStyle[style].text,
          icon: this.MC_ClimbingStylesByStyle[style].icon
        }
      )
      this.filterModal = false
    }
  }
}
</script>
