import ActiveData from '@/models/ActiveData'
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
import UserApi from '~/services/oblyk-api/UserApi'

export default class User extends ActiveData {
  toJSON () {
    return this._buildJsonObject(User)
  }

  _find (id) {
    return this._apiFind(UserApi, id)
  }

  _findCurrent () {
    return this._apiFind(CurrentUserApi)
  }

  get className () {
    return 'User'
  }

  get currentUserPath () {
    return '/home'
  }

  get userPath () {
    return `/users/${this.uuid}/${this.slug_name}`
  }

  get path () {
    return this.userPath
  }

  get avatarUrl () {
    if (this.avatar) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.avatar}`
    } else {
      return '/svg/user-default-avatar.svg'
    }
  }

  get bannerUrl () {
    if (this.banner) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.banner}`
    } else {
      return '/images/user-default-banner.jpg'
    }
  }

  get croppedBannerUrl () {
    if (this.banner_cropped_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.banner_cropped_url}`
    } else {
      return '/images/user-default-banner.jpg'
    }
  }

  get thumbnailBannerUrl () {
    if (this.banner_thumbnail_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.banner_thumbnail_url}`
    } else {
      return '/images/user-default-banner.jpg'
    }
  }

  get thumbnailAvatarUrl () {
    if (this.avatar_thumbnail_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.avatar_thumbnail_url}`
    } else {
      return '/markers/user-marker-avatar.svg'
    }
  }

  get haveAvatar () {
    return (this.avatar)
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
    if (this.pan) { list.push('pan') }
    return list
  }
}
