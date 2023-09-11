export default class ActiveData {
  constructor ({ axios, auth, attributes = {} }) {
    this.axios = axios
    this.auth = auth
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

  _apiFind (
    Api,
    id = null,
    secondId = null,
    thirdId = null,
    fourthId = null,
    fifth = null
  ) {
    return new Promise((resolve, reject) => {
      new Api(this.axios, this.auth)
        .find(id, secondId, thirdId, fourthId, fifth)
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
