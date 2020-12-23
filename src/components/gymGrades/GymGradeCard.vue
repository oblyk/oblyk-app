<template>
  <v-card
    :to="presentation ? gymGrade.url() : null"
    :hover="presentation"
  >
    <v-card-title>
      {{ gymGrade.name }}
    </v-card-title>
    <v-card-text>
      <strong>
        {{ $t('components.gymGrade.system') }} :
      </strong>
      {{ $t(`components.gymGrade.gradeSystem.${gymGrade.difficulty_system}`) }}
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr
              v-for="gradeLine in gymGrade.grade_lines"
              :key="gradeLine.id"
              @click="!presentation ? $router.push(gradeLineModel(gradeLine).url('edit')) : null"
            >
              <td>{{ gradeLine.order }}</td>
              <td>
                <v-icon
                  v-for="(color, index) in gradeLine.colors"
                  :key="index"
                  :style="`color: ${color}`"
                >
                  mdi-circle
                </v-icon>
                {{ gradeLine.name }}
                <strong>
                  ~{{ gradeLine.grade_text}}
                </strong>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <div class="text-right mt-4" v-if="!presentation">
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
          color="primary"
          class="ml-2"
          outlined
          :to="gymGrade.url('grade-lines/new')"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          {{ $t('actions.addLevel') }}
        </v-btn>

        <v-btn
          color="primary"
          class="ml-2"
          :to="gymGrade.url('edit')"
          outlined
        >
          {{ $t('actions.edit') }}
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import GymGradeLine from '@/models/GymGradeLine'
import GymGradeApi from '@/services/oblyk-api/gymGradeApi'

export default {
  name: 'GymGradeCard',
  props: {
    gymGrade: Object,
    presentation: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  data () {
    return {
      loadingDelete: false
    }
  },

  methods: {
    gradeLineModel: function (gradeLine) {
      return new GymGradeLine(gradeLine)
    },

    deleteGrade: function () {
      if (confirm(this.$t('actions.areYouSur'))) {
        this.loadingDelete = true
        GymGradeApi
          .delete(this.gymGrade)
          .then(() => {
            this.$router.push(this.gymGrade.listUrl())
          })
          .catch(err => {
            console.error(err)
          })
          .then(() => {
            this.loadingDelete = false
          })
      }
    }
  }
}
</script>
