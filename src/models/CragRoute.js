import ActiveData from '@/models/ActiveData'
import CragSector from '@/models/CragSector'
import Crag from '@/models/Crag'
import CragRouteApi from '@/services/oblyk-api/CragRouteApi'

export default class CragRoute extends ActiveData {
  find (CragId, id) {
    return this.apiFind(CragRouteApi, CragId, id)
  }

  path (page = 'infos') {
    return `/crags/${this.crag.id}/${this.crag.slug_name}/routes/${this.id}/${this.slug_name}/${page}`
  }

  coverUrl () {
    if (this.photo.url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.photo.url}`
    } else if (this.crag_sector.photo.url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.crag_sector.photo.url}`
    } else if (this.crag.photo.url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.crag.photo.url}`
    } else {
      return require('@/assets/default-crag-banner.jpg')
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

  thumbnailCoverUrl () {
    if (this.photo.thumbnail_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.photo.thumbnail_url}`
    } else {
      return require('@/assets/default-crag-banner.jpg')
    }
  }

  get CragSector () {
    const cragSector = new CragSector(this.crag_sector)
    cragSector.crag = this.crag
    return cragSector
  }

  get Crag () {
    return new Crag(this.crag)
  }

  get isAnchorable () {
    const accepted = [
      'sport_climbing',
      'multi_pitch',
      'trad_climbing',
      'aid_climbing'
    ]
    return accepted.includes(this.climbing_type)
  }

  get isStartable () {
    const accepted = [
      'bouldering'
    ]
    return accepted.includes(this.climbing_type)
  }

  get isReceptionable () {
    const accepted = [
      'bouldering'
    ]
    return accepted.includes(this.climbing_type)
  }

  get isBoltable () {
    const accepted = [
      'sport_climbing',
      'multi_pitch',
      'trad_climbing'
    ]
    return accepted.includes(this.climbing_type)
  }
}
