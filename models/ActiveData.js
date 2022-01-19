export default class ActiveData {
  constructor ({ axios, store, attributes = {} }) {
    this.axios = axios
    this.store = store
    if (attributes) {
      this._buildData(attributes)
    }
  }

  _buildData (attributes) {
    this.attributes = attributes
    for (const attribute in (attributes || {})) {
      this[attribute] = attributes[attribute]
    }
  }

  _buildJsonObject (Class) {
    const properties = {}
    for (const method of Object.getOwnPropertyNames(Class.prototype)) {
      if (method !== 'constructor' && method !== 'toJSON' && !method.match(/^_/)) {
        properties[method] = this[method]
      }
    }
    return {
      ...this.attributes,
      ...properties
    }
  }

  _apiFind (Api, id = null, secondId = null, thirdId = null) {
    return new Promise((resolve, reject) => {
      new Api(this.axios, this.store)
        .find(id, secondId, thirdId)
        .then((resp) => {
          this._buildData(resp.data)
          resolve(this)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
