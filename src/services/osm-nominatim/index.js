import axios from 'axios'

class OsmNominatim {
  reverseGeocoding (latitude, longitude) {
    return axios({
      url: 'https://nominatim.openstreetmap.org/reverse',
      params: {
        format: 'json',
        lat: latitude,
        lon: longitude,
        zoom: '18',
        addressdetails: '18',
        email: 'ekip@oblyk.org'
      },
      method: 'GET'
    })
  }

  search (query) {
    return axios({
      url: 'https://nominatim.openstreetmap.org/search',
      params: {
        q: query,
        format: 'json',
        addressdetails: 1,
        email: 'ekip@oblky.org'
      },
      method: 'GET'
    })
  }
}
export default new OsmNominatim()
