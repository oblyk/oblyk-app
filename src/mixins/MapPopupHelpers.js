import Crag from '@/models/Crag'
import Gym from '@/models/Gym'
import PlaceOfSale from '@/models/PlaceOfSale'

export const MapPopupHelpers = {
  methods: {
    getHtmlPopup: function (feature) {
      if (feature.properties.type === 'Crag') {
        return this.cragPopup(feature)
      } else if (feature.properties.type === 'Gym') {
        return this.gymPopup(feature)
      } else if (feature.properties.type === 'PlaceOfSale') {
        return this.placeOfSalePopup(feature)
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

      return `
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
          <button onclick="location.href = '${crag.path()}'">${this.$t('actions.see')}</button>
        </div>
      `
    },

    gymPopup: function (feature) {
      const gym = new Gym(feature.properties)

      return `
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
          <button onclick="location.href = '${gym.path()}'">${this.$t('actions.see')}</button>
        </div>
      `
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
    }
  }
}
