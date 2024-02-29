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
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/admins/grades/${this.gym_grade.id}/grade-lines/${this.id}`
  }

  get gradeValue () {
    let gradeText = ''
    let points = ''
    if (this.gym_grade.difficulty_by_grade && this.grade_text) { gradeText = `~${this.grade_text}` }
    if (this.points) { points = `${this.points}pts` }

    return `${gradeText} ${points}`.trim()
  }
}
