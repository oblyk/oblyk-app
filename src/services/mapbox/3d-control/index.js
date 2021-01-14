export default class MapBox3DControl {
  onAdd (map) {
    this.container = document.createElement('div')
    this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group mapboxgl-ctrl-3d'
    this.container.innerHTML = '<button type="button">3D</button>'
    this.container.addEventListener('click', () => { this.onClick(map) })
    return this.container
  }

  onClick (map) {
    map.easeTo({ pitch: 60, bearing: 0 })
  }

  onRemove () {
    this.container.parentNode.removeChild(this.container)
    this.map = undefined
  }
}
