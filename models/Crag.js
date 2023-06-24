import ActiveData from '@/models/ActiveData'
import CragApi from '~/services/oblyk-api/CragApi'
import Area from '@/models/Area'

export default class Crag extends ActiveData {
  toJSON () {
    return this._buildJsonObject(Crag)
  }

  _find (id) {
    return this._apiFind(CragApi, id)
  }

  get className () {
    return 'Crag'
  }

  get path () {
    return `/crags/${this.id}/${this.slug_name}`
  }

  get coverUrl () {
    if (this.photo?.url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.photo.url}`
    } else if (this.static_map?.banner_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.static_map.banner_url}`
    } else {
      return '/images/default-crag-banner.jpg'
    }
  }

  get croppedCoverUrl () {
    if (this.photo?.cropped_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.photo.cropped_url}`
    } else if (this.static_map?.url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.static_map.url}`
    } else {
      return '/images/default-crag-banner.jpg'
    }
  }

  get thumbnailCoverUrl () {
    if (this.photo?.thumbnail_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.photo.thumbnail_url}`
    } else {
      return '/images/default-crag-banner.jpg'
    }
  }

  get staticMapUrl () {
    return `${process.env.VUE_APP_OBLYK_API_URL}${this.static_map.url}`
  }

  get climbingTypes () {
    const list = []
    if (this.sport_climbing) { list.push('sport_climbing') }
    if (this.bouldering) { list.push('bouldering') }
    if (this.multi_pitch) { list.push('multi_pitch') }
    if (this.trad_climbing) { list.push('trad_climbing') }
    if (this.aid_climbing) { list.push('aid_climbing') }
    if (this.deep_water) { list.push('deep_water') }
    if (this.via_ferrata) { list.push('via_ferrata') }
    return list
  }

  get seasons () {
    const list = []
    if (this.summer) { list.push('summer') }
    if (this.autumn) { list.push('autumn') }
    if (this.winter) { list.push('winter') }
    if (this.spring) { list.push('spring') }
    return list
  }

  get orientations () {
    const list = []
    if (this.north) { list.push('north') }
    if (this.north_east) { list.push('north_east') }
    if (this.east) { list.push('east') }
    if (this.south_east) { list.push('south_east') }
    if (this.south) { list.push('south') }
    if (this.south_west) { list.push('south_west') }
    if (this.west) { list.push('west') }
    if (this.north_west) { list.push('north_west') }
    return list
  }

  get Areas () {
    const areas = []
    for (const area of (this.areas || [])) {
      areas.push(new Area({ attributes: area }))
    }
    return areas
  }

  get haveArticles () {
    return ((this.articles_count || 0) > 0)
  }
}
