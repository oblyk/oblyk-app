import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class ArticleApi extends BaseApi {
  all (page = 1) {
    return axios({
      url: `${this.baseUrl}/articles.json?page=${page}`,
      method: 'GET'
    })
  }

  feed (page = 1) {
    return axios({
      url: `${this.baseUrl}/articles/feed.json?page=${page}`,
      method: 'GET'
    })
  }

  last () {
    return axios({
      url: `${this.baseUrl}/articles/last.json`,
      method: 'GET'
    })
  }

  find (articleId) {
    return axios({
      url: `${this.baseUrl}/articles/${articleId}.json`,
      method: 'GET'
    })
  }

  photos (articleId) {
    return axios({
      url: `${this.baseUrl}/articles/${articleId}/photos.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  crags (articleId) {
    return axios({
      url: `${this.baseUrl}/articles/${articleId}/crags.json`,
      method: 'GET'
    })
  }

  guideBookPapers (articleId) {
    return axios({
      url: `${this.baseUrl}/articles/${articleId}/guide_book_papers.json`,
      method: 'GET'
    })
  }

  create (data) {
    return axios({
      url: `${this.baseUrl}/articles.json`,
      headers: { Authorization: this.authToken() },
      data: {
        article: data
      },
      method: 'POST'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}/articles/${data.id}.json`,
      headers: { Authorization: this.authToken() },
      data: {
        article: data
      },
      method: 'PUT'
    })
  }

  view (articleId) {
    return axios({
      url: `${this.baseUrl}/articles/${articleId}/view.json`,
      method: 'POST'
    })
  }

  publish (articleId) {
    return axios({
      url: `${this.baseUrl}/articles/${articleId}/publish.json`,
      headers: { Authorization: this.authToken() },
      method: 'PUT'
    })
  }

  unPublish (articleId) {
    return axios({
      url: `${this.baseUrl}/articles/${articleId}/un_publish.json`,
      headers: { Authorization: this.authToken() },
      method: 'PUT'
    })
  }

  cover (data, articleId) {
    return axios({
      url: `${this.baseUrl}/articles/${articleId}/add_cover.json`,
      headers: {
        Authorization: this.authToken(),
        'Content-Type': 'multipart/form-data'
      },
      data: data,
      method: 'POST'
    })
  }

  addCrag (articleId, cragId) {
    return axios({
      url: `${this.baseUrl}/articles/${articleId}/add_crag.json`,
      headers: { Authorization: this.authToken() },
      data: {
        article: {
          crag_id: cragId
        }
      },
      method: 'POST'
    })
  }

  addGuideBookPaper (articleId, guideBookPaperId) {
    return axios({
      url: `${this.baseUrl}/articles/${articleId}/add_guide_book_paper.json`,
      headers: { Authorization: this.authToken() },
      data: {
        article: {
          guide_book_paper_id: guideBookPaperId
        }
      },
      method: 'POST'
    })
  }

  delete (articleId) {
    return axios({
      url: `${this.baseUrl}/articles/${articleId}.json`,
      headers: { Authorization: this.authToken() },
      method: 'DELETE'
    })
  }
}
export default new ArticleApi()
