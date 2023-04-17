class OsmNominatim {
  constructor (axios) {
    this.axios = axios
    this.tokenSearchSource = null
  }

  cancelSearch () {
    if (this.tokenSearchSource) { this.tokenSearchSource.cancel() }
  }

  reverseGeocoding (latitude, longitude) {
    return this.axios.request({
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
    const CancelToken = this.axios.CancelToken
    this.tokenSearchSource = CancelToken.source()

    return this.axios.request({
      url: 'https://nominatim.openstreetmap.org/search',
      cancelToken: this.tokenSearchSource.token,
      params: {
        city: query,
        format: 'json',
        addressdetails: 1,
        email: 'ekip@oblky.org'
      },
      method: 'GET'
    })
  }
}
export default OsmNominatim
