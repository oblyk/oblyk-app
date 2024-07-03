<template>
  <div
    class="full-height"
    style="position: relative; overflow: hidden"
  >
    <div
      v-if="loadingSpace"
      class="full-height d-flex flex-column justify-center"
    >
      <div class="text-center">
        <animate-oblyk-logo
          :animate="loadingSpace"
          color="#6200ea"
          stroke-linejoin="round"
        />
        <p>
          <small class="font-weight-bold">
            {{ $t('common.loading3D') }}
          </small>
        </p>
      </div>
    </div>
    <div
      v-show="!loadingSpace"
      id="three-d-area"
      class="full-height"
    >
      <p class="text-center mt-10">
        {{ $t('common.loading') }}
      </p>
    </div>
    <div
      v-if="gymSpace"
      v-show="!loadingSpace"
      class="sectors-list full-width"
      :style="isDraggingScene ? 'opacity: 0.2' : 'opacity: 1'"
    >
      <div
        v-for="(sector, sectorIndex) in gymSpace.gym_sectors"
        v-show="sector.three_d_path"
        :id="`sector-label-${sector.id}`"
        :key="`sector-${sectorIndex}`"
        class="rounded font-weight-bold sector-label-in-space"
        :class="labelDisableEvent ? 'pointer-event-insensitive' : null"
        :style="highlightSectorId === sector.id ? `background-color: ${gymSpace.sectors_color || 'rgb(98,0,234)'}; color: ${gymSpace.text_contrast_color}` : 'color: black'"
        @mousemove="highlightSector(sector)"
        @click="$root.$emit('filterBySector', sector.id, sector.name)"
      >
        {{ sector.name }}
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ThreeJsMixin } from '~/mixins/ThreeJsMixin'
import GymSpaceApi from '~/services/oblyk-api/GymSpaceApi'
import AnimateOblykLogo from '~/components/layouts/AnimateOblykLogo.vue'

export default {
  name: 'GymSpaceThreeD',
  components: { AnimateOblykLogo },
  mixins: [ThreeJsMixin],
  props: {
    gymSpace: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      spaceObject: null,
      sectorBoundingBoxes: [],
      sectorLineSegments: [],
      labelPositionUpdatable: true,
      loadingSpace: true,
      highlightSectorId: null,

      threeDEnvironment: `GymSpaceThreeD-${this.gymSpace.id}`
    }
  },

  mounted () {
    this.TDArea = document.getElementById('three-d-area')
    this.initThreeJs()

    this.$root.$on('activeSector', (gymSectorId) => {
      this.highlightSector({ id: gymSectorId }, { render: true })
    })
    this.$root.$on('setMapViewOnSector', (gymSectorId) => {
      this.highlightSector({ id: gymSectorId }, { render: true })
    })
  },

  beforeDestroy () {
    this.$root.$off('activeSector')
    this.$root.$off('setMapViewOnSector')
  },

  methods: {
    initThreeJs () {
      if (this.gymSpace.three_d_mtl_url === null) {
        return
      }

      // Camera
      this.camera = new THREE.PerspectiveCamera(45, this.TDArea.offsetWidth / this.TDArea.offsetHeight, 1, 200)
      this.camera.position.z = this.gymSpace.three_d_camera_position?.z || 25
      this.camera.position.y = this.gymSpace.three_d_camera_position?.y || 25
      this.camera.position.x = this.gymSpace.three_d_camera_position?.x || 25

      // Scene
      this.scene = new THREE.Scene()
      this.scene.background = null

      // Ambient Light
      const ambientLight = new THREE.AmbientLight('rgb(255,255,255)', 3)
      this.scene.add(ambientLight)

      // Renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      this.renderer.shadowMap.enabled = true
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(this.TDArea.offsetWidth, this.TDArea.offsetHeight)

      // Load files
      const loader = new GLTFLoader()

      const edgeLine = new THREE.LineBasicMaterial({ color: this.edgeColor })
      loader.load(this.gymSpace.three_d_gltf_url, (gltf) => {
        const object = gltf.scene
        this.spaceObject = object

        const treatedColors = []
        object.traverse((child) => {
          if (child.isMesh) {
            // Add Edges
            const edges = new THREE.EdgesGeometry(child.geometry)
            const line = new THREE.LineSegments(edges, edgeLine)
            child.add(line)

            // color correction
            if (!treatedColors.includes(child.material.uuid)) {
              const color = child.material.color
              const rgbColor = `rgb(${Math.round(255 * color.r)}, ${Math.round(255 * color.g)}, ${Math.round(255 * color.b)})`
              child.material.color = new THREE.Color(rgbColor)
              treatedColors.push(child.material.uuid)
            }
          }
        })

        this.scene.add(object)

        // Update line Segments color
        object.children.forEach((child) => { if (child.isLineSegments) { child.material = edgeLine } })

        // Center space on center of scene
        const box = new THREE.Box3().setFromObject(object)
        const center = new THREE.Vector3()
        box.getCenter(center)
        this.orbitControls.target.copy(center)
        this.orbitControls.update()

        this.loadingSpace = false
        setTimeout(() => {
          this.fitCameraToObjects([this.spaceObject])
        }, 100)
      })

      this.TDArea.innerHTML = null
      this.TDArea.appendChild(this.renderer.domElement)

      // Orbit controller
      this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
      this.orbitControls.minDistance = 1
      this.orbitControls.maxDistance = 100
      this.orbitControls.maxPolarAngle = Math.PI / 2
      this.orbitControls.addEventListener('change', this.renderScene)

      // Raycaster and mouse setup
      this.raycaster = new THREE.Raycaster()
      this.pointer = new THREE.Vector2()

      this.TDArea.addEventListener('mousemove', this.disableClickOnDragging, false)
      this.TDArea.addEventListener('mousedown', this.onMouseDown)
      this.orbitControls.addEventListener('start', this.startDragging)
      this.orbitControls.addEventListener('end', this.endDragging)

      this.TDArea.addEventListener('mousemove', this.pointerMouveEvent, false)
      this.TDArea.addEventListener('mouseup', this.pointerUpEvent, false)

      this.sectorsBuilder()
      this.initLabelInsensitiveEvent()
      this.initTDAResizer()
    },

    sectorsBuilder () {
      this.clearSectors()
      new GymSpaceApi(this.$axios, this.$auth)
        .threeDElements(
          this.gymSpace.gym.id,
          this.gymSpace.id
        )
        .then((resp) => {
          for (const sector of resp.data.gym_sectors) {
            if (sector.three_d_path !== null) {
              this.sectorBuilder(sector)
            }
          }
        })
    },

    sectorBuilder (sector) {
      const points = sector.three_d_path

      // Création d'un shape 2D pour extrusion
      const shapePoints = []
      points.forEach((point) => {
        shapePoints.push(new THREE.Vector2(point.x, point.z))
      })
      const shape = new THREE.Shape(shapePoints)

      const extrudeGeometry = new THREE.ExtrudeGeometry(shape, {
        depth: -sector.three_d_height,
        bevelEnabled: false,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0,
        bevelThickness: 0
      })
      const boundingBox = new THREE.Mesh(extrudeGeometry, new THREE.MeshBasicMaterial({ color: 'white', transparent: true, opacity: 0.3, side: THREE.DoubleSide }))
      boundingBox.visible = false
      boundingBox.rotateX(THREE.MathUtils.degToRad(90))
      boundingBox.userData = { sector }
      this.sectorBoundingBoxes.push(boundingBox)
      this.scene.add(boundingBox)

      // Create edge sector
      const edges = new THREE.EdgesGeometry(extrudeGeometry)
      const lineMaterial = new THREE.LineBasicMaterial({
        color: this.gymSpace.sectors_color || '#6200ea',
        linewidth: 3
      })
      const lineSegments = new THREE.LineSegments(edges, lineMaterial)
      lineSegments.rotateX(THREE.MathUtils.degToRad(90))
      lineSegments.computeLineDistances()
      lineSegments.visible = false
      lineSegments.userData = { sector }
      this.sectorLineSegments.push(lineSegments)
      this.scene.add(lineSegments)
      this.renderScene()
    },

    clearSectors () {
      this.sectorBoundingBoxes.forEach((object) => { this.removeObject(object) })
      this.sectorLineSegments.forEach((object) => { this.removeObject(object) })
      this.sectorBoundingBoxes = []
      this.sectorLineSegments = []
    },

    pointerMouveEvent (event) {
      this.calculatePointerPosition(event)
      event.preventDefault()

      this.unHighlightSector({ render: false })

      // Check intersections on bounding boxes
      const intersects = this.raycaster.intersectObjects(this.sectorBoundingBoxes)
      if (intersects.length > 0) {
        this.highlightSector(intersects[0].object.userData.sector, { render: false })
      }
      this.renderScene()
    },

    pointerUpEvent (event) {
      event.preventDefault()
      this.calculatePointerPosition(event)

      // CALLBACK WHEN CLICK ON SECTOR
      if (!this.disableClick) {
        const intersects = this.raycaster.intersectObjects(this.sectorBoundingBoxes)
        if (intersects.length > 0) {
          const sector = intersects[0].object.userData.sector
          this.$root.$emit('filterBySector', sector.id, sector.name)
        }
      }
    },

    unHighlightSector (options = { render: true }) {
      this.highlightSectorId = null
      this.sectorBoundingBoxes.forEach((boxSector) => { boxSector.visible = false })
      this.sectorLineSegments.forEach((boxSector) => { boxSector.visible = false })
      if (options.render) { this.renderScene() }
    },

    highlightSector (sector, options = { render: true }) {
      this.unHighlightSector({ render: false })
      this.sectorBoundingBoxes.forEach((boxSector) => {
        boxSector.visible = boxSector.userData.sector.id === sector.id
      })
      this.sectorLineSegments.forEach((lineSector) => {
        lineSector.visible = lineSector.userData.sector.id === sector.id
      })
      this.highlightSectorId = sector.id
      if (options.render) { this.renderScene() }
    },

    updateLabelsPosition () {
      const tempV = new THREE.Vector3()
      this.sectorBoundingBoxes.forEach((sector) => {
        const box = new THREE.Box3().setFromObject(sector)
        const size = new THREE.Vector3()
        const center = new THREE.Vector3()
        box.getSize(size)
        box.getCenter(center)
        center.y = center.y * 2 + 0.5
        tempV.copy(center)
        tempV.project(this.camera)

        // convert the normalized position to CSS coordinates
        const x = (tempV.x * 0.5 + 0.5) * this.TDArea.offsetWidth
        const y = (tempV.y * -0.5 + 0.5) * this.TDArea.offsetHeight

        if (!sector.userData.sector.domElement) {
          sector.userData.sector.domElement = document.querySelector(`#sector-label-${sector.userData.sector.id}`)
        }

        sector.userData.sector.domElement.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`
        sector.userData.sector.domElement.style.zIndex = (-tempV.z * 0.5 + 0.5) | 0
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.sectors-list {
  position: absolute;
  top: 0;
  left: 0;
  will-change: opacity;
  transition: opacity 0.2s;
  .sector-label-in-space {
    position: absolute;
    top: 0;
    left: 0;
    white-space: nowrap;
    background-color: rgba(255, 255, 255, 0.8);
    font-size: 0.6em;
    padding: 2px 3px;
    cursor: pointer;
  }
}
</style>
