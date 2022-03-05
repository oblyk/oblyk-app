import ActiveData from '@/models/ActiveData'
import AreaApi from '~/services/oblyk-api/AreaApi'

export default class Area extends ActiveData {
  toJSON () {
    return this._buildJsonObject(Area)
  }

  _find (id) {
    return this._apiFind(AreaApi, id)
  }

  get className () {
    return 'Area'
  }

  get path () {
    return `/areas/${this.id}/${this.slug_name}`
  }

  get coverUrl () {
    if ((this.photo || {}).url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.photo.url}`
    } else {
      return '/images/default-crag-banner.jpg'
    }
  }

  get croppedCoverUrl () {
    if ((this.photo || {}).cropped_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.photo.cropped_url}`
    } else {
      return '/images/default-crag-banner.jpg'
    }
  }

  get thumbnailCoverUrl () {
    if ((this.photo || {}).thumbnail_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.photo.thumbnail_url}`
    } else {
      return '/images/default-crag-banner.jpg'
    }
  }
}
