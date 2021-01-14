export default class MapBoxOblykLegendControl {
  constructor (options) {
    this.boulder = (options || {}).boulder
    this.sportClimbing = (options || {}).sportClimbing
    this.multiPitch = (options || {}).multiPitch
    this.deepWater = (options || {}).deepWater
    this.viaFerrata = (options || {}).viaFerrata
    this.funClimbing = (options || {}).funClimbing
  }

  onAdd (map) {
    this.container = document.createElement('div')
    this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group mapboxgl-ctrl-oblyk-legend'
    this.container.innerHTML = `
    <button type="button">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="M9,3L3.36,4.9C3.15,4.97 3,5.15 3,5.38V20.5A0.5,0.5 0 0,0 3.5,21L3.66,20.97L9,18.9L15,21L20.64,19.1C20.85,19.03 21,18.85 21,18.62V3.5A0.5,0.5 0 0,0 20.5,3L20.34,3.03L15,5.1L9,3M8,5.45V17.15L5,18.31V6.46L8,5.45M10,5.47L14,6.87V18.53L10,17.13V5.47M19,5.7V17.54L16,18.55V6.86L19,5.7M7.46,6.3L5.57,6.97V9.12L7.46,8.45V6.3M7.46,9.05L5.57,9.72V11.87L7.46,11.2V9.05M7.46,11.8L5.57,12.47V14.62L7.46,13.95V11.8M7.46,14.55L5.57,15.22V17.37L7.46,16.7V14.55Z" />
      </svg>
    </button>
    `
    this.container.innerHTML += `
    <div class="oblyk-legend-container hide" aria-expanded="false">
      <ul>
        <li class="oblyk-legend-boulder">${this.boulder || 'Bloc / Pan'}</li>
        <li class="oblyk-legend-sport-climbing">${this.sportClimbing || 'Voie'}</li>
        <li class="oblyk-legend-multi-pitch">${this.multiPitch || 'Grande voie / Artif / Trad'}</li>
        <li class="oblyk-legend-deep-water">${this.deepWater || 'Deep Water'}</li>
        <li class="oblyk-legend-via-ferrata">${this.viaFerrata || 'Via Ferrata'}</li>
        <li class="oblyk-legend-fun-climbing">${this.funClimbing || 'Fun Climbing'}</li>
      </ul>
    </div>
    `
    this.container.addEventListener('click', this.onClick)
    return this.container
  }

  onClick () {
    const legend = this.querySelector('.oblyk-legend-container')
    const expanded = legend.getAttribute('aria-expanded')
    if (expanded === 'true') {
      legend.classList.add('hide')
      legend.setAttribute('aria-expanded', 'false')
    } else {
      legend.classList.remove('hide')
      legend.setAttribute('aria-expanded', 'true')
    }
  }

  onRemove () {
    this.container.parentNode.removeChild(this.container)
    this.map = undefined
  }
}
