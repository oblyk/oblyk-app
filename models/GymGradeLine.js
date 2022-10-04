import ActiveData from '@/models/ActiveData'
import GymGradeLineApi from '~/services/oblyk-api/GymGradeLineApi'

export default class GymGradeLine extends ActiveData {
  toJSON () {
    return this._buildJsonObject(GymGradeLine)
  }

  _find (gymId, gradeId, gradeLineId) {
    return this._apiFind(GymGradeLineApi, gymId, gradeId, gradeLineId)
  }

  get className () {
    return 'GymGradeLine'
  }

  get path () {
    return `/gym-admins/${this.gym.id}/${this.gym.slug_name}/grades/${this.gym_grade.id}/grade-lines/${this.id}`
  }

  get gradeValue () {
    let gradeText = ''
    let points = ''
    if (this.gym_grade.use_grade_system && this.grade_text) { gradeText = `~${this.grade_text}` }
    if (this.gym_grade.use_point_system && this.points) { points = `${this.points}pts` }
    if (this.gym_grade.use_point_division_system) { points = '1000 pts / n' }

    return `${gradeText} ${points}`.trim()
  }
}
