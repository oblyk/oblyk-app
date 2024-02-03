import ActiveData from '@/models/ActiveData'
import GymChainApi from '~/services/oblyk-api/GymChainApi'

export default class GymChain extends ActiveData {
  toJSON () {
    return this._buildJsonObject(GymChain)
  }

  _find (slugName) {
    return this._apiFind(GymChainApi, slugName)
  }

  get className () {
    return 'GymChain'
  }

  get path () {
    return `/gym-chains/${this.slug_name}`
  }

  get adminPath () {
    return `/gym-chains/${this.slug_name}/admins`
  }

  get bannerUrl () {
    if (this.banner) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.banner}`
    } else {
      return '/images/gym-default-banner.jpg'
    }
  }

  get croppedBannerUrl () {
    if (this.banner_cropped_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.banner_cropped_url}`
    } else {
      return '/images/gym-default-banner.jpg'
    }
  }

  get thumbnailBannerUrl () {
    if (this.banner_thumbnail_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.banner_thumbnail_url}`
    } else {
      return '/images/gym-default-banner.jpg'
    }
  }

  get logoUrl () {
    if (this.logo) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.logo}`
    } else {
      return '/svg/gym-default-logo.svg'
    }
  }

  get thumbnailLogoUrl () {
    if (this.logo) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.logo_thumbnail_url}`
    } else {
      return '/svg/gym-default-logo.svg'
    }
  }
}
