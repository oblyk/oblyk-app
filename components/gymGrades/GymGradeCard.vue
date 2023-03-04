<template>
  <v-card>
    <v-card-title>
      {{ gymGrade.name }}
    </v-card-title>
    <v-card-text>
      <p class="mb-1">
        <strong>
          {{ $t('components.gymGrade.whichGradeSystem') }} :
        </strong>
        <span v-if="gymGrade.difficulty_by_grade" v-html="$t('models.gymGrade.difficulty_by_grade')" />
        <span v-if="gymGrade.difficulty_by_level" v-html="$t('models.gymGrade.difficulty_by_level')" />
      </p>
      <p class="mb-1">
        <strong>
          {{ $t('components.gymGrade.whichIdentificationSystem') }} :
        </strong>
        <span v-if="gymGrade.tag_color" v-html="$t('models.gymGrade.tag_color')" />
        <span v-if="gymGrade.hold_color" v-html="$t('models.gymGrade.hold_color')" />
      </p>
      <p>
        <strong>{{ $t('components.gymGrade.whichPointSystem') }} :</strong>
        <span v-html="$t(`models.gymGrade.point_system_types.${gymGrade.point_system_type}`)" />
      </p>
      <v-simple-table>
        <template #default>
          <tbody>
            <tr
              v-for="gradeLine in gymGrade.gradeLines"
              :key="gradeLine.id"
            >
              <td class="smallest-table-column">
                {{ gradeLine.order }}
              </td>
              <td class="smallest-table-column">
                <strong>
                  {{ gradeLine.gradeValue }}
                </strong>
              </td>
              <td class="smallest-table-column">
                <v-icon
                  v-for="(color, index) in gradeLine.colors"
                  :key="index"
                  :style="`color: ${color}`"
                >
                  {{ mdiCircle }}
                </v-icon>
              </td>
              <td>
                {{ gradeLine.name }}
              </td>
              <td
                v-if="editable"
                class="text-right"
              >
                <v-btn
                  icon
                  :to="`${gradeLine.path}/edit`"
                >
                  <v-icon small>
                    {{ mdiPencil }}
                  </v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
    <v-card-actions v-if="gymAuthCan(gym, 'manage_space')">
      <v-spacer />

      <!-- buttons in presentation mode -->
      <v-btn
        v-if="presentation"
        color="primary"
        text
        :to="gymGrade.path"
      >
        {{ $t('actions.see') }}
      </v-btn>

      <!-- Buttons in editable mode -->
      <v-btn
        v-if="editable && gymGrade.need_grade_line"
        color="primary"
        class="ml-2"
        text
        :to="`${gymGrade.path}/grade-lines/new`"
      >
        <v-icon left>
          {{ mdiPlus }}
        </v-icon>
        {{ $t('actions.addLevel') }}
      </v-btn>

      <v-btn
        v-if="editable && !$vuetify.breakpoint.mobile"
        text
        color="primary"
        :to="`${gymGrade.path}/edit`"
      >
        <v-icon left>
          {{ mdiPencil }}
        </v-icon>
        {{ $t('actions.edit') }}
      </v-btn>

      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            elevation="0"
            :loading="loadingDelete"
            class="ml-2"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon left>
              {{ mdiDotsVertical }}
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            :to="`${gymGrade.path}/edit`"
          >
            <v-list-item-icon>
              <v-icon>{{ mdiPencil }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ $t('actions.edit') }}
            </v-list-item-title>
          </v-list-item>
          <v-divider />
          <v-list-item @click="deleteGrade()">
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
    </v-card-actions>
  </v-card>
</template>

<script>
import {
  mdiCircle,
  mdiPlus,
  mdiPencil,
  mdiTrashCan,
  mdiDotsVertical
} from '@mdi/js'
import GymGradeApi from '~/services/oblyk-api/GymGradeApi'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'

export default {
  name: 'GymGradeCard',
  mixins: [GymRolesHelpers],
  props: {
    gymGrade: {
      type: Object,
      required: true
    },
    gym: {
      type: Object,
      required: true
    },
    presentation: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  data () {
    return {
      loadingDelete: false,

      mdiCircle,
      mdiPlus,
      mdiPencil,
      mdiTrashCan,
      mdiDotsVertical
    }
  },

  computed: {
    editable () {
      return !this.presentation
    }
  },

  methods: {
    deleteGrade () {
      if (confirm(this.$t('actions.areYouSur'))) {
        this.loadingDelete = true
        new GymGradeApi(this.$axios, this.$auth)
          .delete(this.gymGrade)
          .then(() => {
            this.$router.push(this.gymGrade.listPath)
          })
          .catch((err) => {
            this.$root.$emit('alertFromApiError', err, 'gymGrade')
          })
          .then(() => {
            this.loadingDelete = false
          })
      }
    }
  }
}
</script>
