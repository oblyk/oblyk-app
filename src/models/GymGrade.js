import ActiveData from '@/models/ActiveData'
import GymGradeApi from '@/services/oblyk-api/gymGradeApi'

export default class GymGrade extends ActiveData {
  find (gymId, gradeId) {
    return this.apiFind(GymGradeApi, gymId, gradeId)
  }

  url (tabs = 'infos') {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/grades/${this.id}/${tabs}`
  }

  listUrl () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/grades-list`
  }
}
