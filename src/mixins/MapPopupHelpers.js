import Crag from '@/models/Crag'
import Gym from '@/models/Gym'
import PlaceOfSale from '@/models/PlaceOfSale'
import CragSector from '@/models/CragSector'
import Park from '@/models/Park'
import Approach from '@/models/Approach'
import User from '@/models/User'
import { MarkdownHelpers } from '@/mixins/MarkdownHelpers'
import { DateHelpers } from '@/mixins/DateHelpers'
import { GradeMixin } from '@/mixins/GradeMixin'

export const MapPopupHelpers = {
  mixins: [MarkdownHelpers, DateHelpers, GradeMixin],
  methods: {
    getHtmlPopup: function (feature) {
      if (feature.properties.type === 'Crag') {
        return this.cragPopup(feature)
      } else if (feature.properties.type === 'Gym') {
        return this.gymPopup(feature)
      } else if (feature.properties.type === 'PlaceOfSale') {
        return this.placeOfSalePopup(feature)
      } else if (feature.properties.type === 'CragSector') {
        return this.cragSectorPopup(feature)
      } else if (feature.properties.type === 'Park') {
        return this.parkPopup(feature)
      } else if (feature.properties.type === 'Approach') {
        return this.approachPopup(feature)
      } else if (feature.properties.type === 'PartnerUser') {
        return this.userPartnerPopup(feature)
      }
    },

    cragPopup: function (feature) {
      const crag = new Crag(feature.properties)

      let linePart = ''
      if (crag.route_count > 0) {
        linePart = `
            <tr>
              <th>${this.$t('components.map.lines')}</th>
              <td>
                ${crag.route_count} ${this.$t('components.map.lines')},
                ${this.$t('components.map.rangingFrom')} ${crag.grade_min_text || '?'}
                ${this.$t('components.map.to')} ${crag.grade_max_text || '?'}
              </td>
            </tr>
          `
      }

      const popup = document.createElement('div')
      popup.innerHTML = `
        <div class="map-popup-cover" style="background-image: url(${crag.mapThumbnailCoverUrl()})"></div>
        <table class="map-popup-information-table">
          <tr>
            <td colspan="2" class="loved-by-king">${crag.name}</td>
          </tr>
          <tr>
            <th>${this.$t('components.map.place')}</th>
            <td>${crag.localization}</td>
          </tr>
          <tr>
            <th>${this.$t('components.map.type')}</th>
            <td>${crag.climbingTypes().map((climb) => { return this.$t(`models.climbs.${climb}`) }).join(', ')}</td>
          </tr>
          ${linePart}
        </table>
        <div class="map-popup-link-area">
          <button>${this.$t('actions.see')}</button>
        </div>
      `
      popup.querySelector('button').addEventListener('click', () => { this.$router.push(crag.path()) })

      return popup
    },

    cragSectorPopup: function (feature) {
      const cragSector = new CragSector(feature.properties)

      const popup = document.createElement('div')
      popup.innerHTML = `
        <div class="map-popup-cover" style="background-image: url(${cragSector.mapThumbnailCoverUrl()})"></div>
        <table class="map-popup-information-table">
          <tr>
            <td colspan="2" class="loved-by-king">${cragSector.name}</td>
          </tr>
          <tr>
            <td colspan="2">${cragSector.description}</td>
          </tr>
        </table>
        <div class="map-popup-link-area">
          <button>${this.$t('actions.see')}</button>
        </div>
      `
      popup.querySelector('button').addEventListener('click', () => { this.$router.push(cragSector.path()) })

      return popup
    },

    gymPopup: function (feature) {
      const gym = new Gym(feature.properties)

      const popup = document.createElement('div')
      popup.innerHTML = `
        <div class="map-popup-cover" style="background-image: url(${gym.mapThumbnailCoverUrl()})"></div>
        <table class="map-popup-information-table">
          <tr>
            <td colspan="2" class="gym-map-title">${gym.name}</td>
          </tr>
          <tr>
            <th>${this.$t('components.map.place')}</th>
            <td>${gym.localization}</td>
          </tr>
          <tr>
            <th>${this.$t('components.map.type')}</th>
            <td>${gym.climbingTypes().map((climb) => { return this.$t(`models.climbs.${climb}`) }).join(', ')}</td>
          </tr>
        </table>
        <div class="map-popup-link-area">
          <button>${this.$t('actions.see')}</button>
        </div>
      `
      popup.querySelector('button').addEventListener('click', () => { this.$router.push(gym.path()) })

      return popup
    },

    placeOfSalePopup: function (feature) {
      const placeOfSale = new PlaceOfSale(feature.properties)

      let urlPart
      if (placeOfSale.url) {
        urlPart = `
          <tr>
            <th>Url</th>
            <td><a href="${placeOfSale.url}">${placeOfSale.url}</a></td>
          </tr>
        `
      }

      return `
        <table class="map-popup-information-table mb-2">
          <tr>
            <td colspan="2" class="gym-map-title">${placeOfSale.name}</td>
          </tr>
          <tr>
            <th>${this.$t('components.map.place')}</th>
            <td>${placeOfSale.localization}</td>
          </tr>
          ${urlPart}
          <tr>
            <th></th>
            <td class="pb-3 pt-3">${placeOfSale.description}</td>
          </tr>
        </table>
      `
    },

    parkPopup: function (feature) {
      const park = new Park(feature.properties)

      const popup = document.createElement('div')
      popup.innerHTML = `
        <table class="map-popup-information-table mb-2">
          <tr>
            <th></th>
            <td class="pb-3 pt-3">${park.description}</td>
          </tr>
        </table>
        <div class="map-popup-link-area">
          <button>${this.$t('actions.edit')}</button>
        </div>
      `
      popup.querySelector('button').addEventListener('click', () => { this.$router.push(park.path('edit')) })

      return popup
    },

    approachPopup: function (feature) {
      const approach = new Approach(feature.properties)

      const popup = document.createElement('div')

      let approachTypePart = ''
      if (approach.approach_type) {
        approachTypePart = `
          <tr>
            <th>Type :</th>
            <td class="">${this.$t(`models.approachType.${approach.approach_type}`)}</td>
          </tr>
        `
      }

      popup.innerHTML = `
        <table class="map-popup-information-table mb-2">
          <tr>
            <td colspan="2" class="pa-2">${approach.description}</td>
          </tr>
          ${approachTypePart}
          <tr>
            <th>${this.$t('models.approach.length')} :</th>
            <td class="">${approach.length} ${this.$t('common.meters')}</td>
          </tr>
          <tr>
            <th>${this.$t('models.approach.time')} :</th>
            <td class="">
              ~${approach.walking_time} ${this.$t('common.minutes')}
              <cite>${this.$t(`components.approach.walking_time.${approach.approach_type}`)}</cite>
            </td>
          </tr>
        </table>
        <div class="map-popup-link-area">
          <button>${this.$t('actions.edit')}</button>
        </div>
      `
      popup.querySelector('button').addEventListener('click', () => { this.$router.push(approach.path('edit')) })

      return popup
    },

    userPartnerPopup: function (feature) {
      const user = new User(feature.properties)

      let genreAndAge = null
      if (user.genre) {
        genreAndAge = this.$t(`models.genres.${user.genre}`)
      }

      if (user.date_of_birth) {
        if (genreAndAge !== null) {
          genreAndAge += `, ${this.yearsOld(user.date_of_birth)}`
        } else {
          genreAndAge = this.yearsOld(user.date_of_birth)
        }
      }

      const level = `${this.gradeValueToText(user.grade_min)} ~ ${this.gradeValueToText(user.grade_max)}`
      const lastActivity = this.$t('date.lastActivity', { date: this.dateFromNow(user.last_activity_at) })

      const popup = document.createElement('div')
      popup.innerHTML = `
        <div class="map-popup-cover" style="background-image: url(${user.thumbnailBannerUrl()})">
          <div class="user-map-popup-name-and-avatar">
             <img alt="${user.full_name}" src="${user.thumbnailAvatarUrl()}" class="user-map-popup-avatar" />
             <span class="user-map-popup-name">
                <strong>${user.full_name}</strong><br>
                ${genreAndAge}
             </span>
          </div>
        </div>
        <table class="map-popup-information-table">
          <tr>
            <td colspan="2" class="map-popup-information-bio">${this.marked(user.description)}</td>
          </tr>
          <tr>
            <th>${this.$t('common.practice')}</th>
            <td>${user.climbingTypes().map((climb) => { return this.$t(`models.climbs.${climb}`) }).join(', ')}</td>
          </tr>
          <tr>
            <th>${this.$t('common.level')}</th>
            <td>${level}</td>
          </tr>
        </table>
        <p class="user-map-popup-last-activity-at">
          <small>${lastActivity}</small>
        </p>
        <div class="map-popup-link-area">
          <button>${this.$t('actions.see')}</button>
        </div>
      `
      popup.querySelector('button').addEventListener('click', () => { this.$router.push(user.path()) })

      return popup
    }
  }
}
