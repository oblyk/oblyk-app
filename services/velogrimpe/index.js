class VeloGrimpeApi {
  constructor (axios) {
    this.axios = axios
  }

  oblykGetId (cragId) {
    return this.axios.request({
      url: 'https://velogrimpe.fr/api/public/oblyk-get-id.php',
      headers: {
        Authorization: process.env.VUE_APP_VELOGRIMPE_AUTHORIZATION
      },
      params: {
        oblyk_id: cragId
      },
      method: 'GET'
    })
  }
}
export default VeloGrimpeApi
