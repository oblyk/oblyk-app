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
}
export default new OsmNominatim()
