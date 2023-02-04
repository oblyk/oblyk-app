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
    <v-card-actions>
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
        v-if="editable"
        color="error"
        class="ml-2"
        :loading="loadingDelete"
        text
        @click="deleteGrade()"
      >
        <v-icon left>
          {{ mdiTrashCan }}
        </v-icon>
        {{ $t('actions.delete') }}
      </v-btn>

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
        v-if="editable"
        color="primary"
        class="ml-2"
        :to="`${gymGrade.path}/edit`"
        text
      >
        <v-icon left>
          {{ mdiPencil }}
        </v-icon>
        {{ $t('actions.edit') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mdiCircle, mdiPlus, mdiPencil, mdiTrashCan } from '@mdi/js'
import GymGradeApi from '~/services/oblyk-api/GymGradeApi'

export default {
  name: 'GymGradeCard',
  props: {
    gymGrade: {
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
      mdiTrashCan
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
