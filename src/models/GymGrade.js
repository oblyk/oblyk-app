import ActiveData from '@/models/ActiveData'
import GymGradeApi from '@/services/oblyk-api/GymGradeApi'
import GymGradeLine from '@/models/GymGradeLine'

export default class GymGrade extends ActiveData {
  find (gymId, gradeId) {
    return this.apiFind(GymGradeApi, gymId, gradeId)
  }

  path (tabs = 'infos') {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/grades/${this.id}/${tabs}`
  }

  listPath () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/grades-list`
  }

  get needColor () {
    return (this.difficulty_system === 'hold_color' || this.difficulty_system === 'tag_color' || this.difficulty_system === 'pan')
  }

  get needTagColor () {
    return (this.difficulty_system === 'tag_color' || this.difficulty_system === 'pan')
  }

  get needHoldColor () {
    return (this.difficulty_system === 'tag_color' || this.difficulty_system === 'hold_color')
  }

  get colorFor () {
    if (this.difficulty_system === 'hold_color') {
      return 'hold'
    } else if (this.difficulty_system === 'tag_color' || this.difficulty_system === 'pan') {
      return 'tag'
    } else {
      return 'nothing'
    }
  }

  get gradeLines () {
    const lines = []
    if (!this.grade_lines) return lines

    for (const line of this.grade_lines) {
      lines.push(new GymGradeLine(line))
    }
    return lines
  }
}
