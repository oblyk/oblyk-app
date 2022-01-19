export const MapDrawingHelpers = {
  methods: {
    latLgnToArray (latLgnObject) {
      const latLngArray = []
      for (const latLng of latLgnObject[0]) {
        latLngArray.push([latLng.lat, latLng.lng])
      }
      return latLngArray
    }
  }
}
