import BaseApi from '~/services/oblyk-api/BaseApi'

class WordApi extends BaseApi {
  all (page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/words.json?page=${page}`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  search (query) {
    const CancelToken = this.axios.CancelToken
    this.tokenSearchSource = CancelToken.source()

    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/words/search.json?query=${query}`,
      cancelToken: this.tokenSearchSource.token,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  find (wordId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/words/${wordId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  versions (wordId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/words/${wordId}/versions.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  update (data) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/public/words/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        word: data
      }
    })
  }

  create (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/public/words.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        word: data
      }
    })
  }
}
export default WordApi
