import ActiveData from '@/models/ActiveData'
import CragSectorApi from '@/services/oblyk-api/CragSectorApi'
import Crag from '@/models/Crag'

export default class CragSector extends ActiveData {
  find (cragId, cragSectorId) {
    return this.apiFind(CragSectorApi, cragId, cragSectorId)
  }

  path (page = 'infos') {
    return `/crags/${this.crag.id}/${this.crag.slug_name}/sectors/${this.id}/${this.slug_name}/${page}`
  }

  get nameAndGap () {
    return `${this.name} (${this.gradeGap})`
  }

  get gradeGap () {
    const grade = this.routes_figures.grade
    return `${grade.min_text || '?'} > ${grade.max_text || '?'}`
  }

  coverUrl () {
    if (this.photo.url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.photo.url}`
    } else if (this.crag.photo.url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.crag.photo.url}`
    } else {
      return require('@/assets/default-crag-banner.jpg')
    }
  }

  get coverFrom () {
    if (this.photo.url) {
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
    } else if (this.crag.photo.thumbnail_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.crag.photo.thumbnail_url}`
    } else {
      return require('@/assets/default-crag-banner.jpg')
    }
  }

  mapThumbnailCoverUrl () {
    if (this.map_thumbnail_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.map_thumbnail_url}`
    } else if (this.crag.map_thumbnail_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.crag.map_thumbnail_url}`
    } else {
      return require('@/assets/default-crag-banner.jpg')
    }
  }

  orientations () {
    const list = []
    if (this.north) list.push('north')
    if (this.north_east) list.push('north_east')
    if (this.east) list.push('east')
    if (this.south_east) list.push('south_east')
    if (this.south) list.push('south')
    if (this.south_west) list.push('south_west')
    if (this.west) list.push('west')
    if (this.north_west) list.push('north_west')
    return list
  }

  get Crag () {
    return new Crag(this.crag)
  }
}
