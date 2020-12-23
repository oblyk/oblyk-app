<template>
  <v-card
    :to="presentation ? gymGrade.url() : null"
    :hover="presentation"
  >
    <v-card-title>
      {{ gymGrade.name }}
      <v-btn
        v-if="!presentation"
        small
        color="primary"
        class="ml-2"
        :to="gymGrade.url('edit')"
        outlined
      >
        {{ $t('actions.edit') }}
      </v-btn>
    </v-card-title>
    <v-card-text>
      <strong>Système :</strong>
      {{ $t(`components.gymGrade.gradeSystem.${gymGrade.difficulty_system}`) }}
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Ordre
              </th>
              <th class="text-left">
                Nom
              </th>
              <th class="text-left">
                Couleur
              </th>
              <th class="text-left">
                cotation
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="gradeLine in gymGrade.grade_lines"
              :key="gradeLine.id"
            >
              <td>{{ gradeLine.order }}</td>
              <td>{{ gradeLine.name }}</td>
              <td>
                <v-icon
                  v-for="(color, index) in gradeLine.colors"
                  :key="index"
                  :style="`color: ${color}`"
                >
                  mdi-square
                </v-icon>
              </td>
              <td>
                ~{{ gradeLine.grade_text}}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'GymGradeCard',
  props: {
    gymGrade: Object,
    presentation: {
      type: Boolean,
      required: false,
      default: true
    }
  }
}
</script>
