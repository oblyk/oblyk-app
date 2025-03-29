<template>
  <v-list-item
    color="primary"
    class="rounded-list-item border"
  >
    <v-list-item-avatar
      v-if="ascentGymRoute.color_system_line"
      size="50"
    >
      <v-icon
        size="30"
        :color="ascentGymRoute.color_system_line.hex_color"
      >
        {{ mdiCircle }}
      </v-icon>
    </v-list-item-avatar>
    <v-list-item-avatar
      v-else
      size="50"
      :style="`border: solid 4px ${gradeValueToColor(ascentGymRoute.max_grade_value)}`"
      class="text-h6"
    >
      {{ ascentGymRoute.max_grade_text }}
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        {{ $tc('common.count', ascentGymRoute.quantity, { count: ascentGymRoute.quantity }) }}
        <strong v-if="!ascentGymRoute.color_system_line">{{ ascentGymRoute.max_grade_text }}</strong>
        <strong v-if="ascentGymRoute.color_system_line">{{ hexColorToName(ascentGymRoute.color_system_line.hex_color) }}</strong>
        <span v-if="['red_point', 'flash', 'onsight'].includes(ascentGymRoute.ascent_status)">
          {{ $t('common.made') }}
        </span>
        {{ $t(`models.ascentStatus.${ascentGymRoute.ascent_status}`).toLowerCase() }}
        <ascent-gym-route-icon
          :gym-route="ascentGymRoute.gym_route"
          :ascent="ascentGymRoute"
        />
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ $t(`models.climbs.${ascentGymRoute.climbing_type}`) }} · {{ ascentGymRoute.height }}m
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>
              {{ mdiDotsVertical }}
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-dialog
            v-model="editDialog"
            width="500"
          >
            <template #activator="{ on, attrs }">
              <v-list-item
                v-bind="attrs"
                v-on="on"
              >
                <v-list-item-icon>
                  <v-icon>
                    {{ mdiPencil }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ $t('actions.edit') }}
                </v-list-item-title>
              </v-list-item>
            </template>
            <v-card>
              <v-card-title>
                {{ $t('components.ascentGymRoute.edit') }}
              </v-card-title>
              <v-card-text>
                <ascent-gym-edit-form
                  :ascent-gym-route="ascentGymRoute"
                  :callback="edit"
                  :cancel-callback="closeEditMoral"
                />
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-divider />
          <v-list-item @click="deleteAscent">
            <v-list-item-icon>
              <v-icon>
                {{ mdiTrashCan }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ $t('actions.delete') }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mdiCircle, mdiTrashCan, mdiPencil, mdiDotsVertical } from '@mdi/js'
import { GradeMixin } from '~/mixins/GradeMixin'
import AscentGymRouteApi from '~/services/oblyk-api/AscentGymRouteApi'
import AscentGymEditForm from '~/components/ascentGymRoutes/forms/AscentGymEditForm'
import { HoldColorsHelpers } from '~/mixins/HoldColorsHelpers'
import AscentGymRouteIcon from '~/components/ascentGymRoutes/AscentGymRouteIcon'

export default {
  name: 'AscentGymRouteLine',
  components: { AscentGymRouteIcon, AscentGymEditForm },
  mixins: [GradeMixin, HoldColorsHelpers],
  props: {
    ascentGymRoute: {
      type: Object,
      required: true
    },
    deleteCallback: {
      type: Function,
      default: null
    },
    editCallback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      editDialog: false,

      mdiCircle,
      mdiTrashCan,
      mdiPencil,
      mdiDotsVertical
    }
  },

  methods: {
    deleteAscent () {
      if (confirm(this.$t('common.areYouSurToDelete'))) {
        new AscentGymRouteApi(this.$axios, this.$auth)
          .delete(this.ascentGymRoute.id)
          .then(() => {
            this.deleteCallback()
          })
      }
    },

    closeEditMoral () {
      this.editDialog = false
    },

    edit () {
      this.editDialog = false
      this.editCallback()
    }
  }
}
</script>
