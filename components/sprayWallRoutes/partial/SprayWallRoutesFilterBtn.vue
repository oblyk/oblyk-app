<template>
  <div>
    <v-btn
      text
      small
      :color="active ? '#743ad5' : null"
      class="rounded-pill"
      :class="active ? 'v-btn--active' : ''"
      @click="openModal"
    >
      {{ $t('common.filters') }}
      <v-icon
        right
        small
        :color="active ? '#743ad5' : null"
      >
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
          <v-skeleton-loader v-if="loadingAvailableFilters" type="chip" />
          <div v-else>
            <p class="mb-2">
              {{ $t('components.gymAdmin.styles') }}
            </p>
            <div class="mx-n1">
              <v-chip
                v-for="(styleCount, style) in styles"
                :key="`style-index-${style}`"
                outlined
                style="margin: 2px"
                @click="pushStyleFilter(style)"
              >
                <v-icon left>
                  {{ MC_ClimbingStylesByStyle[style].icon }}
                </v-icon>
                {{ MC_ClimbingStylesByStyle[style].text }}
                <v-avatar
                  right
                  class="back-app-color"
                >
                  {{ styleCount }}
                </v-avatar>
              </v-chip>
            </div>
            <p class="mb-2 mt-4">
              {{ $t('components.input.gymOpener') }}
            </p>
            <v-chip
              v-for="(climber, climberIndex) in climbers"
              :key="`climber-${climberIndex}`"
              outlined
              class="mr-1"
              @click="pushClimberFilter(climber)"
            >
              <v-avatar left>
                <v-img :src="imageVariant(climber.attachments.avatar, { fit: 'crop', height: 100, width: 100 })" />
              </v-avatar>
              {{ climber.full_name }}
              <v-icon
                v-if="climber.friend"
                size="15"
                style="margin-left: 3px"
                color="amber"
              >
                {{ mdiStar }}
              </v-icon>
              <v-avatar
                right
                class="back-app-color"
              >
                {{ climber.spray_wall_routes_count }}
              </v-avatar>
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
import { mdiFilter, mdiStar } from '@mdi/js'
import { ClimbingStylesMixin } from '~/mixins/ClimbingStylesMixin'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  name: 'SprayWallRoutesFilterBtn',
  mixins: [ClimbingStylesMixin, ImageVariantHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    },
    sprayWall: {
      type: Object,
      required: true
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
      loadingAvailableFilters: true,
      styles: null,
      climbers: null,

      mdiFilter,
      mdiStar
    }
  },

  methods: {
    openModal () {
      if (this.styles === null || this.climbers === null) {
        this.getAvailableFilters()
      } else {
        this.loadingAvailableFilters = false
      }
      this.filterModal = true
    },

    closeModal () {
      this.filterModal = false
    },

    getAvailableFilters () {
      this.loadingAvailableFilters = true
      new OblykApi(this.$axios, this.$auth)
        .get(`/gyms/${this.gym.id}/spray_walls/${this.sprayWall.id}/spray_wall_routes/available_filters`)
        .then((resp) => {
          this.styles = resp.data.styles
          this.climbers = resp.data.climbers
        })
        .finally(() => {
          this.loadingAvailableFilters = false
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
    },

    pushClimberFilter (climber) {
      this.filterCallback(
        {
          type: 'user',
          value: climber.id,
          text: climber.full_name,
          avatar: this.imageVariant(climber.attachments.avatar, { fit: 'crop', height: 100, width: 100 })
        }
      )
      this.filterModal = false
    }
  }
}
</script>
