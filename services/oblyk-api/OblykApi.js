import Jsona from 'jsona'

class OblykApi {
  constructor (axios, auth) {
    this.axios = axios
    this.auth = auth
    this.apiAccessToken = process.env.VUE_APP_OBLYK_API_ACCESS_TOKEN
  }

  get (url, params = {}) {
    return new Promise((resolve, reject) => {
      this.axios
        .request({
          url: `${process.env.VUE_APP_OBLYK_API_URL}/api/v1${url}.json`,
          headers: {
            Authorization: this.auth.loggedIn ? this.auth.$storage.getUniversal('_token.local') : null,
            HttpApiAccessToken: this.apiAccessToken
          },
          method: 'GET',
          params
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
}

export default OblykApi
