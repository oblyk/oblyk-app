import Jsona from 'jsona'

class OblykApi {
  constructor (axios, auth) {
    this.axios = axios
    this.auth = auth
    this.apiAccessToken = process.env.VUE_APP_OBLYK_API_ACCESS_TOKEN
    this.tokenApiRequest = null
  }

  get (url, params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      const requestOptions = this.mergeOptions(options)

      // Construct request url, param, methode, etc.
      const request = {
        url: `${process.env.VUE_APP_OBLYK_API_URL}/api/v1${url}.json`,
        headers: {
          Authorization: this.auth.loggedIn ? this.auth.$storage.getUniversal('_token.local') : null,
          HttpApiAccessToken: this.apiAccessToken
        },
        method: 'GET',
        params
      }

      // If request is cancelable, we include cancel token to request options
      if (requestOptions.cancelable) {
        const CancelToken = this.axios.CancelToken
        this.tokenApiRequest = CancelToken.source()
        request.cancelToken = this.tokenApiRequest.token
      }

      this.axios
        .request(request)
        .then((response) => {
          if (response.data?.json_type === 'jsonapi.org') {
            resolve({ data: new Jsona().deserialize(response.data) })
          } else {
            resolve(response)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  put (url, data = {}) {
    return this.exec('PUT', url, data)
  }

  post (url, data = {}) {
    return this.exec('POST', url, data)
  }

  delete (url, data = {}) {
    return this.exec('DELETE', url, data)
  }

  exec (method, url, data = {}) {
    return new Promise((resolve, reject) => {
      this.axios
        .request({
          url: `${process.env.VUE_APP_OBLYK_API_URL}/api/v1${url}.json`,
          headers: {
            Authorization: this.auth.loggedIn ? this.auth.$storage.getUniversal('_token.local') : null,
            HttpApiAccessToken: this.apiAccessToken
          },
          method,
          data
        })
        .then((response) => {
          if (response.data?.json_type === 'jsonapi.org') {
            resolve({ data: new Jsona().deserialize(response.data) })
          } else {
            resolve(response)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  cancelApiRequest () {
    if (this.tokenApiRequest) {
      this.tokenApiRequest.cancel()
    }
  }

  mergeOptions (options) {
    const defaultOptions = {
      cancelable: false
    }
    return { ...defaultOptions, ...options }
  }
}

export default OblykApi
