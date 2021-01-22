import ActiveData from '@/models/ActiveData'
import CragSector from '@/models/CragSector'

export default class CragRoute extends ActiveData {
  path (tabs = 'infos') {
    return `/crag-routes/${this.id}/${this.slug_name}`
  }

  coverUrl () {
    return `${process.env.VUE_APP_OBLYK_API_URL}${this.photo.url}`
  }

  thumbnailCoverUrl () {
    if (this.photo.thumbnail_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.photo.thumbnail_url}`
    } else {
      return require('@/assets/default-crag-banner.jpg')
    }
  }

  get cragSector () {
    const cragSector = new CragSector(this.sector)
    cragSector.crag = this.crag
    return cragSector
  }
}
