<template>
  <v-card
    :to="presentation ? gymGrade.path : null"
    :hover="presentation"
  >
    <v-card-title>
      {{ gymGrade.name }}
    </v-card-title>
    <v-card-text>
      <p>
        <strong>
          {{ $t('components.gymGrade.system') }} :
        </strong>
        <span v-html="$t(`components.gymGrade.gradeSystem.${gymGrade.difficulty_system}`)" />
      </p>
      <p>
        <strong>
          {{ $t('components.gymGrade.value') }} :
        </strong>
        <span v-if="gymGrade.use_grade_system" v-html="$t('models.gymGrade.use_grade_system')" />
        <span v-if="gymGrade.use_point_system" v-html="$t('models.gymGrade.use_point_system')" />
        <span v-if="gymGrade.use_point_division_system" v-html="$t('models.gymGrade.use_point_division_system')" />
      </p>
      <v-simple-table>
        <template #default>
          <tbody>
            <tr
              v-for="gradeLine in gymGrade.gradeLines"
              :key="gradeLine.id"
              @click="!presentation ? $router.push(`/a${gradeLine.path}/edit`) : null"
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
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <div v-if="!presentation" class="text-right mt-4">
        <v-btn
          color="error"
          class="ml-2"
          :loading="loadingDelete"
          outlined
          @click="deleteGrade()"
        >
          {{ $t('actions.delete') }}
        </v-btn>

        <v-btn
          v-if="gymGrade.need_grade_line"
          color="primary"
          class="ml-2"
          outlined
          :to="`${gymGrade.path}/grade-lines/new`"
        >
          <v-icon left>
            {{ mdiPlus }}
          </v-icon>
          {{ $t('actions.addLevel') }}
        </v-btn>

        <v-btn
          color="primary"
          class="ml-2"
          :to="`${gymGrade.path}/edit`"
          outlined
        >
          {{ $t('actions.edit') }}
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiCircle, mdiPlus } from '@mdi/js'
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
      mdiCircle,
      mdiPlus,
      loadingDelete: false
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
