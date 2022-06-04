export const LocalizationHelpers = {
  methods: {
    geoDistance (lat1, lon1, lat2, lon2, unit = 'K') {
      if ((lat1 === lat2) && (lon1 === lon2)) {
        return 0
      } else {
        const raLat1 = Math.PI * lat1 / 180
        const radLat2 = Math.PI * lat2 / 180
        const ta = lon1 - lon2
        const radTa = Math.PI * ta / 180
        let dist = Math.sin(raLat1) * Math.sin(radLat2) + Math.cos(raLat1) * Math.cos(radLat2) * Math.cos(radTa)
        if (dist > 1) {
          dist = 1
        }
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515
        if (unit === 'K') { dist = dist * 1.609344 }
        if (unit === 'N') { dist = dist * 0.8684 }
        return Math.round(dist)
      }
    }
  }
}
