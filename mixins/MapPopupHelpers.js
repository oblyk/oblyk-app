import { DateHelpers } from '@/mixins/DateHelpers'
import { GradeMixin } from '@/mixins/GradeMixin'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import Crag from '@/models/Crag'
import Gym from '@/models/Gym'
import PlaceOfSale from '@/models/PlaceOfSale'
import CragSector from '@/models/CragSector'
import Park from '@/models/Park'
import Approach from '@/models/Approach'
import RockBar from '~/models/RockBar'
import GuideBookPaper from '~/models/GuideBookPaper'

export const MapPopupHelpers = {
  mixins: [DateHelpers, GradeMixin, ImageVariantHelpers],
  methods: {
    getHtmlPopup (type, data) {
      if (type === 'Crag') {
        return this.cragPopup(data)
      } else if (type === 'RockBar') {
        return this.rockBarPopup(data)
      } else if (type === 'Gym') {
        return this.gymPopup(data)
      } else if (type === 'GuideBookPaper') {
        return this.guideBookPaperPopup(data)
      } else if (type === 'PlaceOfSale') {
        return this.placeOfSalePopup(data)
      } else if (type === 'CragSector') {
        return this.cragSectorPopup(data)
      } else if (type === 'Park') {
        return this.parkPopup(data)
      } else if (type === 'Approach') {
        return this.approachPopup(data)
      }
    },

    cragPopup (data) {
      const crag = new Crag({ attributes: data })

      let linePart = ''
      if (crag.routes_figures.route_count > 0) {
        linePart = `
            <tr>
              <th>${this.$t('components.map.lines')}</th>
              <td>
                ${crag.routes_figures.route_count} ${this.$t('components.map.lines')},
                ${this.$t('components.map.rangingFrom')} ${crag.routes_figures.grade.min_text || '?'}
                ${this.$t('components.map.to')} ${crag.routes_figures.grade.max_text || '?'}
              </td>
            </tr>
          `
      }

      let banner = ''
      if (crag.photo.attachments.picture.attached) {
        banner = `<div class="map-popup-cover" style="background-image: url(${this.imageVariant(crag.photo.attachments.picture, { fit: 'scale', height: 720, width: 720 })})"></div>`
      }

      const popup = document.createElement('div')
      popup.innerHTML = `
        ${banner}
        <table class="map-popup-information-table">
          <tr>
            <td colspan="2" class="text-h6 pl-1 pr-1">${crag.name}</td>
          </tr>
          <tr>
            <th>${this.$t('components.map.place')}</th>
            <td>${crag.city}, ${crag.region}</td>
          </tr>
          <tr>
            <th>${this.$t('components.map.type')}</th>
            <td>${crag.climbingTypes.map((climb) => { return this.$t(`models.climbs.${climb}`) }).join(', ')}</td>
          </tr>
          ${linePart}
        </table>
        <div class="map-popup-link-area">
          <button>${this.$t('actions.see')}</button>
        </div>
      `
      popup.querySelector('button').addEventListener('click', (e) => {
        if (e.ctrlKey || (this.options && this.options.openOnNewTab === true)) {
          window.open(crag.path, '_blank')
        } else {
          this.$router.push(crag.path)
        }
      })

      return popup
    },

    rockBarPopup (data) {
      const rockBar = new RockBar({ attributes: data })

      let linePart = ''
      let routeCount = 0
      let minText = 0
      let maxText = 0
      if (rockBar.crag_sector && rockBar.crag_sector.routes_figures.count > 0) {
        routeCount = rockBar.crag_sector.routes_figures.count
        minText = rockBar.crag_sector.routes_figures.grade.min_text
        maxText = rockBar.crag_sector.routes_figures.grade.max_text
      } else if (rockBar.crag.routes_figures.route_count > 0) {
        routeCount = rockBar.crag.routes_figures.route_count
        minText = rockBar.crag.routes_figures.grade.min_text
        maxText = rockBar.crag.routes_figures.grade.max_text
      }
      if (routeCount > 0) {
        linePart = `
            <tr>
              <th>${this.$t('components.map.lines')}</th>
              <td>
                ${routeCount} ${this.$t('components.map.lines')},
                ${this.$t('components.map.rangingFrom')} ${minText || '?'}
                ${this.$t('components.map.to')} ${maxText || '?'}
              </td>
            </tr>
          `
      }

      let banner = ''
      if (rockBar.crag_sector && rockBar.crag_sector.photo.attachments.picture.attached) {
        banner = `<div class="map-popup-cover" style="background-image: url(${this.imageVariant(rockBar.CragSector.photo.attachments.picture, { fit: 'scale-down', height: 720, width: 720 })})"></div>`
      }
      if (!rockBar.crag_sector && rockBar.crag.photo.attachments.picture.attached) {
        banner = `<div class="map-popup-cover" style="background-image: url(${this.imageVariant(rockBar.Crag.photo.attachments.picture, { fit: 'scale-down', height: 720, width: 720 })})"></div>`
      }

      let type = ''
      if (rockBar.crag_sector) {
        type = `${this.$t('models.rockBar.crag_sector_id')} : `
      }

      const popup = document.createElement('div')
      popup.innerHTML = `
        ${banner}
        <table class="map-popup-information-table">
          <tr>
            <td colspan="2" class="text-h6 pl-1 pr-1">${type}${rockBar.crag_sector?.name || rockBar.crag.name}</td>
          </tr>
          ${linePart}
        </table>
        <div class="map-popup-link-area">
          <button>${this.$t('actions.see')}</button>
        </div>
      `
      popup.querySelector('button').addEventListener('click', (e) => {
        const path = rockBar.crag_sector ? rockBar.CragSector.path : rockBar.Crag.path
        if (e.ctrlKey || (this.options && this.options.openOnNewTab === true)) {
          window.open(path, '_blank')
        } else {
          this.$router.push(path)
        }
      })

      return popup
    },

    cragSectorPopup (data) {
      const cragSector = new CragSector({ attributes: data })
      const popup = document.createElement('div')
      let mapCover = ''
      if (cragSector.photo.attachments.picture.attached) {
        mapCover = `<div class="map-popup-cover" style="background-image: url(${this.imageVariant(cragSector.photo.attachments.picture, { fit: 'scale-down', height: 720, width: 720 })})"></div>`
      }
      popup.innerHTML = `
        ${mapCover}
        <table class="map-popup-information-table">
          <tr>
            <td colspan="2" class="pl-2 pt-1"><h3>${cragSector.name}</h3></td>
          </tr>
        </table>
        <div class="map-popup-link-area">
          <button>${this.$t('actions.see')}</button>
        </div>
      `
      popup.querySelector('button').addEventListener('click', (e) => {
        if (e.ctrlKey || (this.options && this.options.openOnNewTab === true)) {
          window.open(cragSector.path, '_blank')
        } else {
          this.$router.push(cragSector.path)
        }
      })

      return popup
    },

    gymPopup (data) {
      const gym = new Gym({ attributes: data })

      const popup = document.createElement('div')
      popup.innerHTML = `
        <div class="map-popup-cover" style="background-image: url(${this.imageVariant(gym.attachments.banner, { fit: 'scale-down', height: 720, width: 720 })})"></div>
        <table class="map-popup-information-table">
          <tr>
            <td colspan="2" class="gym-map-title">${gym.name}</td>
          </tr>
          <tr>
            <th>${this.$t('components.map.place')}</th>
            <td>${gym.city}, ${gym.region}</td>
          </tr>
          <tr>
            <th>${this.$t('components.map.type')}</th>
            <td>${gym.climbingTypes.map((climb) => { return this.$t(`models.climbs.${climb}`) }).join(', ')}</td>
          </tr>
        </table>
        <div class="map-popup-link-area">
          <button>${this.$t('actions.see')}</button>
        </div>
      `
      popup.querySelector('button').addEventListener('click', (e) => {
        if (e.ctrlKey || (this.options && this.options.openOnNewTab === true)) {
          window.open(gym.path, '_blank')
        } else {
          this.$router.push(gym.path)
        }
      })

      return popup
    },

    guideBookPaperPopup (data) {
      const guideBookPaper = new GuideBookPaper({ attributes: data })
      let author = null
      let publicationYear = null
      if (guideBookPaper.publication_year) {
        publicationYear = `<p class="mb-0 mt-0">
                    <strong class="font-weight-bold">${this.$t('models.guideBookPaper.publication_year')} :</strong><br>
                    ${guideBookPaper.publication_year}
                  </p>`
      }
      if (guideBookPaper.author) {
        author = `<p class="mb-0 mt-1">
                    <strong class="font-weight-bold">${this.$t('models.guideBookPaper.author')} :</strong><br>
                    ${guideBookPaper.author}
                  </p>`
      }

      const popup = document.createElement('div')
      popup.innerHTML = `
        <p class="map-guide-book-paper-title">${guideBookPaper.name}</p>
        <div class="d-flex">
          <img class="map-guide-book-paper-cover pa-1 ml-2" src="${this.imageVariant(guideBookPaper.attachments.cover, { fit: 'scale-down', height: 720, width: 720 })}" alt="couverture topo" />
          <div class="pa-2">
            ${publicationYear || ''}
            ${author || ''}
            <p class="mb-0 mt-1">
              <strong class="font-weight-bold">${this.$t('models.guideBookPaper.number_of_crags')} :</strong><br>
              ${guideBookPaper.crags.length}
            </p>
          </div>
        </div>
        <div class="map-popup-link-area">
          <button>${this.$t('actions.see')}</button>
        </div>
      `
      popup.querySelector('button').addEventListener('click', (e) => {
        if (e.ctrlKey || (this.options && this.options.openOnNewTab === true)) {
          window.open(guideBookPaper.path, '_blank')
        } else {
          this.$router.push(guideBookPaper.path)
        }
      })

      return popup
    },

    placeOfSalePopup (data) {
      const placeOfSale = new PlaceOfSale({ attributes: data })

      let urlPart = ''
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
            <td>${placeOfSale.address || ''}, ${placeOfSale.city || ''} (${placeOfSale.country || ''})</td>
          </tr>
          ${urlPart}
          <tr>
            <th></th>
            <td class="pb-3 pt-3">${placeOfSale.description}</td>
          </tr>
        </table>
      `
    },

    parkPopup (data) {
      const park = new Park({ attributes: data })

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
      popup.querySelector('button').addEventListener('click', () => { this.$router.push(`${park.path}/edit`) })

      return popup
    },

    approachPopup (data) {
      const approach = new Approach({ attributes: data })

      const popup = document.createElement('div')

      let approachTypePart = ''
      if (approach.approach_type) {
        approachTypePart = `
          <tr>
            <th>${this.$t('models.approach.approach_type')} :</th>
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
      popup.querySelector('button').addEventListener('click', () => { this.$router.push(`${approach.path}/edit`) })

      return popup
    }
  }
}
