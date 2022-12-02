import ActiveData from '@/models/ActiveData'
import GymGradeApi from '~/services/oblyk-api/GymGradeApi'
import GymGradeLine from '@/models/GymGradeLine'
import Gym from '~/models/Gym'

export default class GymGrade extends ActiveData {
  toJSON () {
    return this._buildJsonObject(GymGrade)
  }

  _find (gymId, gradeId) {
    return this._apiFind(GymGradeApi, gymId, gradeId)
  }

  get className () {
    return 'GymGrade'
  }

  get path () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/admins/grades/${this.id}`
  }

  get listPath () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/admins/grades`
  }

  get colorFor () {
    if (this.hold_color && !this.tag_color) {
      return 'hold'
    } else if (this.tag_color) {
      return 'tag'
    } else {
      return 'nothing'
    }
  }

  get gradeLines () {
    const lines = []
    if (!this.grade_lines) { return lines }

    for (const line of this.grade_lines) {
      lines.push(new GymGradeLine({ attributes: line }))
    }
    return lines
  }

  get Gym () {
    return new Gym({ attributes: this.gym })
  }
}
