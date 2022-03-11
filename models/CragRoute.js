import ActiveData from '@/models/ActiveData'
import CragSector from '@/models/CragSector'
import Crag from '@/models/Crag'
import CragRouteApi from '~/services/oblyk-api/CragRouteApi'

export default class CragRoute extends ActiveData {
  toJSON () {
    return this._buildJsonObject(CragRoute)
  }

  _find (CragId, id) {
    return this._apiFind(CragRouteApi, CragId, id)
  }

  get className () {
    return 'CragRoute'
  }

  get path () {
    return `/crag-routes/${this.id}/${this.slug_name}`
  }

  get aPath () {
    return `/crags/${this.crag.id}/${this.crag.slug_name}/routes/${this.id}/${this.slug_name}`
  }

  get coverUrl () {
    if (this.photo.url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.photo.url}`
    } else if (this.crag_sector.photo.url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.crag_sector.photo.url}`
    } else if (this.crag.photo.url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.crag.photo.url}`
    } else {
      return '/images/default-crag-banner.jpg'
    }
  }

  get croppedCoverUrl () {
    if (this.photo.cropped_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.photo.cropped_url}`
    } else if (this.crag_sector.photo.cropped_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.crag_sector.photo.cropped_url}`
    } else if (this.crag.photo.cropped_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.crag.photo.cropped_url}`
    } else {
      return '/images/default-crag-banner.jpg'
    }
  }

  get coverFrom () {
    if (this.photo.url) {
      return 'cragRoute'
    } else if (this.crag_sector.photo.url) {
      return 'cragSector'
    } else if (this.crag.photo.url) {
      return 'crag'
    } else {
      return null
    }
  }

  get thumbnailCoverUrl () {
    if (this.photo.thumbnail_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.photo.thumbnail_url}`
    } else if (this.crag_sector.photo.thumbnail_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.crag_sector.photo.thumbnail_url}`
    } else if (this.crag.photo.thumbnail_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.crag.photo.thumbnail_url}`
    } else {
      return '/images/default-crag-banner.jpg'
    }
  }

  get CragSector () {
    const cragSector = new CragSector({ attributes: this.crag_sector })
    cragSector.crag = this.crag
    return cragSector
  }

  get Crag () {
    return new Crag({ attributes: this.crag })
  }

  get difficultyAppreciationStatus () {
    const appreciation = this.difficulty_appreciation
    if (appreciation >= 0.6) {
      return 'hard'
    } else if (appreciation >= 0.2) {
      return 'pretty_hard'
    } else if (appreciation >= -0.2) {
      return 'just'
    } else if (appreciation >= -0.6) {
      return 'pretty_soft'
    } else {
      return 'soft'
    }
  }
}
