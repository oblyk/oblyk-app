export default class ActiveData {
  constructor (attributes = {}) {
    if (attributes) {
      this.buildData(attributes)
    }
  }

  buildData (attributes) {
    for (const attribute in (attributes || {})) {
      this[attribute] = attributes[attribute]
    }
  }

  apiFind (Api, id, secondId = null) {
    return new Promise((resolve, reject) => {
      Api
        .find(id, secondId)
        .then(resp => {
          this.buildData(resp.data)
          resolve(this)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
