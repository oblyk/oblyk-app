import Jsona from 'jsona'

class OblykApi {
  constructor (axios, auth) {
    this.axios = axios
    this.auth = auth
    this.apiAccessToken = process.env.VUE_APP_OBLYK_API_ACCESS_TOKEN
    this.tokenApiRequest = null
  }

  get (url, params = {}, options = {}) {
    return this.exec('GET', url, params, options)
  }

  put (url, data = {}, options = {}) {
    return this.exec('PUT', url, data, options)
  }

  post (url, data = {}, options = {}) {
    return this.exec('POST', url, data, options)
  }

  delete (url, data = {}, options = {}) {
    return this.exec('DELETE', url, data, options)
  }

  exec (method, url, data = {}, options = {}) {
    return new Promise((resolve, reject) => {
      const requestOptions = this.mergeOptions(options)

      const request = {
        url: `${process.env.VUE_APP_OBLYK_API_URL}/api/v1${url}${requestOptions.format}`,
        headers: {
          Authorization: this.auth.loggedIn ? this.auth.$storage.getUniversal('_token.local') : null,
          HttpApiAccessToken: this.apiAccessToken
        },
        method
      }

      if (method === 'GET') {
        request.params = data
      } else {
        request.data = data
      }

      if (requestOptions.responseType) {
        request.responseType = requestOptions.responseType
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

  cancelApiRequest () {
    if (this.tokenApiRequest) {
      this.tokenApiRequest.cancel()
    }
  }

  mergeOptions (options) {
    const defaultOptions = {
      cancelable: false,
      format: '.json'
    }
    return { ...defaultOptions, ...options }
  }
}

export default OblykApi
