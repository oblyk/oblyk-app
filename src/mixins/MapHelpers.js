export const MapHelpers = {
  data () {
    return {
      defaultLatitude: 4,
      defaultLongitude: 45,
      defaultZoom: 5
    }
  },

  methods: {
    addMapRelief: function (map) {
      map.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14
      })

      map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 })

      map.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 0.0],
          'sky-atmosphere-sun-intensity': 15
        }
      })
    },

    convertNull: function (properties) {
      const newProperties = {}
      for (const property in (properties || {})) {
        newProperties[property] = (properties[property] !== 'null' ? properties[property] : null)
      }
      return newProperties
    },

    setMapLocalStorage: function (map) {
      localStorage.setItem('map-zoom', map.getZoom())
      localStorage.setItem('map-pitch', map.getPitch())
      localStorage.setItem('map-bearing', map.getBearing())
      localStorage.setItem('map-latitude', map.getCenter().lat)
      localStorage.setItem('map-longitude', map.getCenter().lng)
    },

    loadMarkers: function (map) {
      // Crags
      map.loadImage(require('@/assets/markers/crag-marker-00000.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-00000', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-00001.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-00001', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-00010.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-00010', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-00011.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-00011', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-00100.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-00100', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-00101.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-00101', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-00110.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-00110', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-00111.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-00111', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-01000.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-01000', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-01001.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-01001', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-01010.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-01010', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-01011.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-01011', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-01100.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-01100', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-01101.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-01101', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-01110.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-01110', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-01111.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-01111', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-10000.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-10000', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-10001.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-10001', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-10010.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-10010', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-10011.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-10011', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-10100.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-10100', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-10101.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-10101', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-10110.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-10110', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-10111.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-10111', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-11000.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-11000', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-11001.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-11001', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-11010.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-11010', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-11011.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-11011', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-11100.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-11100', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-11101.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-11101', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-11110.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-11110', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/crag-marker-11111.png'), (error, image) => {
        if (error) throw error
        map.addImage('crag-marker-11111', image, { sdf: false })
      })

      // Gyms
      map.loadImage(require('@/assets/markers/gym-marker-001.png'), (error, image) => {
        if (error) throw error
        map.addImage('gym-marker-001', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/gym-marker-010.png'), (error, image) => {
        if (error) throw error
        map.addImage('gym-marker-010', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/gym-marker-100.png'), (error, image) => {
        if (error) throw error
        map.addImage('gym-marker-100', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/gym-marker-110.png'), (error, image) => {
        if (error) throw error
        map.addImage('gym-marker-110', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/gym-marker-101.png'), (error, image) => {
        if (error) throw error
        map.addImage('gym-marker-101', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/gym-marker-001.png'), (error, image) => {
        if (error) throw error
        map.addImage('gym-marker-011', image, { sdf: false })
      })

      map.loadImage(require('@/assets/markers/gym-marker-111.png'), (error, image) => {
        if (error) throw error
        map.addImage('gym-marker-111', image, { sdf: false })
      })
    }
  }
}
