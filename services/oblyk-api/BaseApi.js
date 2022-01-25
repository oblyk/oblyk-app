export default class BaseApi {
  constructor (axios, auth) {
    this.axios = axios
    this.auth = auth
    this.baseUrl = `${process.env.VUE_APP_OBLYK_API_URL}/api/v1`
    this.apiAccessToken = process.env.VUE_APP_OBLYK_API_ACCESS_TOKEN
    this.tokenSearchSource = null
  }

  cancelSearch () {
    if (this.tokenSearchSource) { this.tokenSearchSource.cancel() }
  }

  authUuid () {
    return this.auth.user.uuid
  }

  authToken () {
    if (this.auth.loggedIn) {
      return this.auth.$storage.getUniversal('_token.local')
    } else {
      return null
    }
  }
}
