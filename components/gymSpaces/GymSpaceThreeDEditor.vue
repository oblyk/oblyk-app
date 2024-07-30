<template>
  <div
    style="position: relative"
    class="full-height"
  >
    <div style="position: absolute; bottom: 5px; left: 0;">
      <div v-if="debug">
        <p class="mb-0 text-caption">
          Édition : <strong :class="isEditing ? 'green--text' : 'red--text'">{{ isEditing }}</strong>
        </p>
        <p
          v-if="orbitControls"
          class="mb-0 text-caption"
        >
          Orbiter : <strong :class="orbitControls.enabled ? 'green--text' : 'red--text'">{{ orbitControls.enabled }}</strong>
        </p>
        <p class="mb-0 text-caption">
          Mouvement de la scène : <strong :class="isDraggingScene ? 'green--text' : 'red--text'">{{ isDraggingScene }}</strong>
        </p>
        <p class="mb-0 text-caption">
          Mouvement d'un point : <strong :class="isDraggingConstructionPoint ? 'green--text' : 'red--text'">{{ isDraggingConstructionPoint }}</strong>
        </p>
        <p class="mb-0 text-caption">
          Survole d'un point : <strong :class="isHighlightConstructionPoint ? 'green--text' : 'red--text'">{{ isHighlightConstructionPoint }}</strong>
        </p>
        <p class="mb-0 text-caption">
          Survole d'un inter point : <strong :class="isHighlightInterPoint ? 'green--text' : 'red--text'">{{ isHighlightInterPoint }}</strong>
        </p>
        <p class="mb-0 text-caption">
          Un point a bougé : <strong :class="constructionPointHasMoved ? 'green--text' : 'red--text'">{{ constructionPointHasMoved }}</strong>
        </p>
        <p class="mb-0 text-caption">
          Clic actif : <strong :class="!disableClick ? 'green--text' : 'red--text'">{{ !disableClick }}</strong>
        </p>
      </div>
      <div
        class="text-caption"
        @click="debug = !debug"
      >
        <v-icon
          small
          class="vertical-align-text-top"
        >
          {{ debug ? mdiChevronUp : mdiChevronRight }}
        </v-icon>
        debug
      </div>
    </div>
    <div style="position: absolute; top: 5px; right: 5px;">
      <div>
        <v-btn
          small
          outlined
          text
          @click="setView('top')"
        >
          <v-icon left>
            {{ mdiArrowCollapseDown }}
          </v-icon>
          Vue de dessus
        </v-btn>
      </div>
    </div>
    <div
      v-if="loadingSpace"
      class="full-height d-flex flex-column justify-center"
    >
      <div class="text-center">
        <animate-oblyk-logo
          :animate="loadingSpace"
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
    />
  </div>
</template>

<script>
import { mdiChevronRight, mdiChevronUp, mdiArrowCollapseDown } from '@mdi/js'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ThreeJsMixin } from '~/mixins/ThreeJsMixin'
import GymSpaceApi from '~/services/oblyk-api/GymSpaceApi'
import AnimateOblykLogo from '~/components/layouts/AnimateOblykLogo'

export default {
  name: 'GymSpaceThreeDEditor',
  components: { AnimateOblykLogo },
  mixins: [ThreeJsMixin],
  props: {
    gymSpace: {
      type: Object,
      required: true
    },
    sectorClickCallback: {
      type: Function,
      default: null
    },
    initSectorHeightCallback: {
      type: Function,
      default: null
    },
    editingSectorHeight: {
      type: [Number, String],
      default: null
    }
  },

  data () {
    return {
      isEditing: false,
      pointerIndicator: null,
      spaceObject: null,
      constructionPoints: [],
      sectorBoundingBoxes: [],
      sectorLineSegments: [],
      draggingConstructionPoint: null,
      isDraggingConstructionPoint: false,
      isHighlightConstructionPoint: false,
      isHighlightInterPoint: false,
      drawingPad: null,
      buildingBox: null,
      constructionPointHasMoved: false,
      debug: false,
      interPoints: [],
      loadingSpace: true,

      threeDEnvironment: `GymSpaceThreeDEditor-${this.gymSpace.id}`,

      mdiChevronRight,
      mdiChevronUp,
      mdiArrowCollapseDown
    }
  },

  watch: {
    editingSectorHeight () {
      this.setDrawingPadHeight()
    }
  },

  mounted () {
    this.TDArea = document.getElementById('three-d-area')
    this.initThreeJs()
  },

  beforeDestroy () {
    this.TDArea.removeEventListener('mousemove', this.pointerMouveEvent)
    this.TDArea.removeEventListener('mouseup', this.pointerUpEvent)
    this.TDArea.removeEventListener('mousemove', this.disableClickOnDragging)
    this.TDArea.removeEventListener('mousedown', this.pointerDownEvent)
    this.orbitControls?.removeEventListener('start', this.startDragging)
    this.orbitControls?.removeEventListener('end', this.endDragging)
  },

  methods: {
    initThreeJs () {
      if (this.gymSpace.three_d_gltf_url === null) {
        this.loadingSpace = false
        return
      }

      const aspect = this.TDArea.offsetWidth / this.TDArea.offsetHeight
      this.camera = new THREE.OrthographicCamera(
        -aspect * 5, aspect * 5, 5, -5, 1, 200
      )
      this.camera.position.z = 50
      this.camera.position.y = 50
      this.camera.position.x = 50
      const savedCameraPosition = localStorage.getItem(`cameraPosition-${this.threeDEnvironment}`)

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

        // Update line Segments color
        const treatedColors = []
        object.traverse((child) => {
          if (child.isMesh) {
            // Add Edges
            if (this.gymSpace.three_d_parameters?.highlight_edges) {
              const edges = new THREE.EdgesGeometry(child.geometry)
              const line = new THREE.LineSegments(edges, edgeLine)
              child.add(line)
            }

            // color correction
            if (this.gymSpace.three_d_parameters?.color_correction_sketchup_exports && !treatedColors.includes(child.material.uuid)) {
              const color = child.material.color
              const rgbColor = `rgb(${Math.round(255 * color.r)}, ${Math.round(255 * color.g)}, ${Math.round(255 * color.b)})`
              child.material.color = new THREE.Color(rgbColor)
              treatedColors.push(child.material.uuid)
            }
          }
        })

        const box = new THREE.Box3().setFromObject(object)
        const center = new THREE.Vector3()
        const size = new THREE.Vector3()
        box.getSize(size)
        box.getCenter(center)
        this.objectsSceneSize = size
        this.scene.add(object)

        if (savedCameraPosition) {
          const cameraPosition = JSON.parse(savedCameraPosition)
          this.camera.position.copy(cameraPosition.position)
          this.camera.zoom = cameraPosition.zoom
          this.orbitControls.target.copy(cameraPosition.target)
        } else {
          this.orbitControls.target.copy(center)
        }

        this.orbitControls.update()
        this.loadingSpace = false
      })

      this.TDArea.innerHTML = null
      this.TDArea.appendChild(this.renderer.domElement)

      // Orbit controller
      this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
      this.orbitControls.target.set(0, 0, 0)
      this.orbitControls.minDistance = 1
      this.orbitControls.maxDistance = 80
      this.orbitControls.addEventListener('change', this.renderScene)

      // Raycaster and mouse setup
      this.raycaster = new THREE.Raycaster()
      this.pointer = new THREE.Vector2()

      this.TDArea.addEventListener('mousemove', this.pointerMouveEvent, false)
      this.TDArea.addEventListener('mouseup', this.pointerUpEvent, false)
      this.TDArea.addEventListener('mousemove', this.disableClickOnDragging, false)
      this.TDArea.addEventListener('mousedown', this.pointerDownEvent, false)
      this.orbitControls.addEventListener('start', this.startDragging)
      this.orbitControls.addEventListener('end', this.endDragging)
      this.orbitControls.addEventListener('end', this.saveCameraPosition)

      this.sectorsBuilder()
      this.initTDAResizer()
      this.renderScene()
    },

    // HIGHLIGHT SECTOR, HIGHLIGHT CONSTRUCT OR INTER POINTS, DRAG CONSTRUCT POINT OR MOVE SPHERE HELPER
    pointerMouveEvent (event) {
      this.calculatePointerPosition(event)
      event.preventDefault()

      // ON DRAGGING CONSTRUCTION POINT
      if (this.isEditing && this.isDraggingConstructionPoint) {
        let intersects = this.raycaster.intersectObject(this.drawingPad)
        intersects = intersects.filter(intersect => intersect.face !== null)
        if (intersects.length > 0) {
          this.draggingConstructionPoint.position.copy(intersects[0].point)
          this.constructionPointHasMoved = true
          this.setSectorBuilderBox()
          this.setInterPoints()
        }
      }

      // HIGHLIGHT CONSTRUCTION POINTS
      if (this.isEditing && !this.isDraggingConstructionPoint && !this.isHighlightInterPoint) {
        this.constructionPoints.forEach((point) => {
          point.material.color = new THREE.Color('rgb(255,0,0)')
        })
        this.pointerIndicator.visible = true
        const intersects = this.raycaster.intersectObjects(this.constructionPoints)
        if (intersects.length > 0) {
          this.pointerIndicator.visible = false
          this.isHighlightConstructionPoint = true
          intersects[0].object.material.color = new THREE.Color('#FFC107')
        } else {
          this.isHighlightConstructionPoint = false
        }
      }

      // HIGHLIGHT INTER POINTS
      if (this.isEditing && !this.isDraggingConstructionPoint && !this.isHighlightConstructionPoint) {
        this.interPoints.forEach((point) => {
          point.material.color = new THREE.Color('rgb(255,255,255)')
        })
        this.pointerIndicator.visible = true
        const intersects = this.raycaster.intersectObjects(this.interPoints)
        if (intersects.length > 0) {
          this.pointerIndicator.visible = false
          this.isHighlightInterPoint = true
          intersects[0].object.material.color = new THREE.Color('#2196F3')
        } else {
          this.isHighlightInterPoint = false
        }
      }

      // MOVE SPHERE HELPER
      if (this.isEditing && !this.isDraggingConstructionPoint && !this.isHighlightConstructionPoint && !this.isHighlightInterPoint) {
        let intersects = this.raycaster.intersectObject(this.drawingPad)
        intersects = intersects.filter(intersect => intersect.face !== null)
        if (intersects.length > 0) {
          this.pointerIndicator.visible = true
          this.pointerIndicator.position.copy(intersects[0].point)
        } else {
          this.pointerIndicator.visible = false
        }
      }

      // HIGHLIGHT SECTOR
      if (!this.isEditing) {
        this.sectorBoundingBoxes.forEach((box) => {
          box.visible = false
        })

        // Check intersections on bounding boxes
        const intersects = this.raycaster.intersectObjects(this.sectorBoundingBoxes)
        if (intersects.length > 0) {
          intersects[0].object.visible = true
        }
      }
      this.renderScene()
    },

    // START DRAGGING CONSTRUCTION POINT
    pointerDownEvent (event) {
      event.preventDefault()

      if (this.isEditing && !this.isDraggingConstructionPoint && this.isHighlightConstructionPoint) {
        this.calculatePointerPosition(event)

        this.orbitControls.enabled = false
        this.orbitControls.update()

        const intersects = this.raycaster.intersectObjects(this.constructionPoints)
        if (intersects.length > 0) {
          this.constructionPointHasMoved = false
          this.isDraggingConstructionPoint = true
          this.draggingConstructionPoint = intersects[0].object
        }
      }
    },

    // START EDITING SECTOR, ADD POINT TO SECTOR, STOP DRAGGING CONSTRUCTION POINT, ADD INTER POINT TO SECTOR
    pointerUpEvent (event) {
      event.preventDefault()
      this.calculatePointerPosition(event)

      // ADD CONSTRUCTION POINT TO SECTOR
      if (!this.disableClick && this.isEditing && !this.isDraggingConstructionPoint && !this.isHighlightInterPoint) {
        let intersects = this.raycaster.intersectObject(this.drawingPad)
        intersects = intersects.filter(intersect => intersect.face !== null)
        if (intersects.length > 0) {
          this.constructionPointBuilder(intersects[0].point)
          this.setSectorBuilderBox()
          this.setInterPoints()
          this.renderScene()
        }
      }

      // ADD INTER CONSTRUCTION POINT TO SECTOR
      if (!this.disableClick && this.isEditing && !this.isDraggingConstructionPoint && this.isHighlightInterPoint) {
        const intersects = this.raycaster.intersectObjects(this.interPoints)
        if (intersects.length > 0) {
          this.constructionPointBuilder(intersects[0].object.position, intersects[0].object.userData.index)
          this.setSectorBuilderBox()
          this.setInterPoints()
          this.renderScene()
        }
      }

      // END DRAGGING CONSTRUCTION POINT
      if (this.isEditing && this.isDraggingConstructionPoint) {
        this.isDraggingConstructionPoint = false

        // DELETE POINT IF NO MOUVEMENT
        if (!this.constructionPointHasMoved) {
          this.constructionPoints.splice(this.draggingConstructionPoint.userData.index, 1)
          this.removeObject(this.draggingConstructionPoint)
          this.reBuildConstructPontIndex()
          this.setSectorBuilderBox()
          this.setInterPoints()
        }
        this.constructionPointHasMoved = false
      }

      // START EDITING SECTOR
      if (!this.disableClick && !this.isEditing) {
        const intersects = this.raycaster.intersectObjects(this.sectorBoundingBoxes)
        if (intersects.length > 0) {
          this.sectorClickCallback(intersects[0].object.userData.sector)
        }
      }

      // ALWAYS RE ENABLE ORBITER
      this.orbitControls.enabled = true
      this.orbitControls.update()
    },

    // ---------------------
    // START AND END EDITING
    // ---------------------
    startEditingSector (sector) {
      this.isEditing = true
      this.orbitControls.autoRotate = false
      this.pointerIndicatorBuilder()
      this.drawingPadBuilder()
      if (sector.have_three_d_path) {
        sector.three_d_path.forEach((point) => { this.constructionPointBuilder(point) })
      }
      const sectorLine = this.sectorLineSegments.find(sectorLine => sectorLine.userData.sector.id === sector.id)
      if (sectorLine) {
        sectorLine.visible = false
      }
      this.sectorBoundingBoxes.forEach((box) => { box.visible = false })
      this.setSectorBuilderBox()
      this.setInterPoints()
    },

    endEditingSector () {
      this.isEditing = false
      this.isDraggingConstructionPoint = false
      this.draggingConstructionPoint = null
      this.orbitControls.enabled = true
      this.orbitControls.update()
      if (this.pointerIndicator !== null) {
        this.pointerIndicator.visible = false
      }
      this.sectorLineSegments.forEach((sectorLine) => { sectorLine.visible = true })
      this.constructionPoints.forEach((point) => { this.removeObject(point) })
      this.interPoints.forEach((point) => { this.removeObject(point) })
      if (this.drawingPad !== null) { this.removeObject(this.drawingPad) }
      if (this.buildingBox) { this.removeObject(this.buildingBox) }
      this.constructionPoints = []
      this.interPoints = []
      this.renderScene()
    },

    getSectorPoints () {
      return this.constructionPoints.map(point => point.position)
    },

    // -------
    // BUILDER
    // -------
    pointerIndicatorBuilder () {
      if (this.pointerIndicator !== null) {
        return
      }

      const geometryHelper = new THREE.SphereGeometry(0.1, 30, 30)
      const sphereHelperMaterial = new THREE.MeshBasicMaterial({ color: '#00C853', transparent: true, opacity: 0.8 })
      this.pointerIndicator = new THREE.Mesh(geometryHelper, sphereHelperMaterial)
      this.pointerIndicator.position.set(0, 0, 0)
      this.pointerIndicator.visible = false
      this.scene.add(this.pointerIndicator)
      this.renderScene()
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

    constructionPointBuilder (position, index = null) {
      const pointGeometry = new THREE.SphereGeometry(0.1, 20, 20)
      const pointMaterial = new THREE.MeshBasicMaterial({ color: 'rgb(255,0,0)', transparent: true, opacity: 0.8 })
      const pointMesh = new THREE.Mesh(pointGeometry, pointMaterial)
      pointMesh.position.copy(position)
      pointMesh.userData.index = this.constructionPoints.length
      if (index !== null) {
        this.constructionPoints.splice(index + 1, 0, pointMesh)
        this.reBuildConstructPontIndex()
      } else {
        this.constructionPoints.push(pointMesh)
      }
      this.scene.add(pointMesh)
      this.renderScene()
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
      boundingBox.userData = { sector: { id: sector.id } }
      this.sectorBoundingBoxes.push(boundingBox)
      this.scene.add(boundingBox)

      // Création des pointillés autour de la zone extrudée
      const edges = new THREE.EdgesGeometry(extrudeGeometry)
      const lineMaterial = new THREE.LineBasicMaterial({ color: this.gymSpace.sectors_color || '#31994e' })
      const lineSegments = new THREE.LineSegments(edges, lineMaterial)
      lineSegments.rotateX(THREE.MathUtils.degToRad(90))
      lineSegments.computeLineDistances()
      lineSegments.userData = { sector: { id: sector.id } }
      this.sectorLineSegments.push(lineSegments)
      this.scene.add(lineSegments)
      this.renderScene()
    },

    drawingPadBuilder () {
      const box = new THREE.Box3().setFromObject(this.spaceObject)
      const size = new THREE.Vector3()
      const center = new THREE.Vector3()
      box.getSize(size)
      box.getCenter(center)

      const geometry = new THREE.PlaneGeometry(size.x * 1.1, size.z * 1.1)
      const material = new THREE.MeshBasicMaterial({ color: '#0277BD', side: THREE.DoubleSide, transparent: true, opacity: 0.2 })
      const plane = new THREE.Mesh(geometry, material)
      plane.rotateX(THREE.MathUtils.degToRad(90))
      plane.position.set(center.x, size.y, center.z)
      this.drawingPad = plane
      this.scene.add(plane)
      this.setDrawingPadHeight()
    },

    setDrawingPadHeight () {
      if (this.isEditing && this.drawingPad !== null && this.editingSectorHeight !== null) {
        this.drawingPad.position.setY(this.editingSectorHeight)
        this.constructionPoints.forEach((point) => {
          point.position.setY(this.editingSectorHeight)
        })
        this.interPoints.forEach((point) => {
          point.position.setY(this.editingSectorHeight)
        })
        this.setSectorBuilderBox()
      } else if (this.isEditing && this.drawingPad !== null && this.editingSectorHeight === null) {
        this.initSectorHeightCallback(Math.round(this.drawingPad.position.y))
      }
      this.renderScene()
    },

    setInterPoints () {
      this.interPoints.forEach((interPoint) => { this.removeObject(interPoint) })
      this.interPoints = []

      const points = this.constructionPoints.map(point => point.position)
      if (points.length < 2) { return }

      points.push(this.constructionPoints[0].position)
      for (let i = 0; i < this.constructionPoints.length; i++) {
        const xAvg = (points[i].x + points[i + 1].x) / 2
        const zAvg = (points[i].z + points[i + 1].z) / 2
        const pointGeometry = new THREE.SphereGeometry(0.08, 20, 20)
        const pointMaterial = new THREE.MeshBasicMaterial({ color: 'rgb(255,255,255)', transparent: true, opacity: 1 })
        const pointMesh = new THREE.Mesh(pointGeometry, pointMaterial)
        pointMesh.position.copy({
          x: xAvg,
          y: points[i].y,
          z: zAvg
        })
        pointMesh.userData.index = this.interPoints.length
        this.interPoints.push(pointMesh)
        this.scene.add(pointMesh)
      }
      this.renderScene()
    },

    reBuildConstructPontIndex () {
      for (let i = 0; i < this.constructionPoints.length; i++) {
        this.constructionPoints[i].userData.index = i
      }
    },

    setSectorBuilderBox () {
      const points = this.constructionPoints.map(point => point.position)
      if (points.length < 2) { return }
      if (this.buildingBox) { this.removeObject(this.buildingBox) }

      const shapePoints = []
      points.forEach((point) => {
        shapePoints.push(new THREE.Vector2(point.x, point.z))
      })
      const shape = new THREE.Shape(shapePoints)
      let sectorHeight
      if (this.editingSectorHeight) {
        sectorHeight = this.editingSectorHeight
      } else {
        const box = new THREE.Box3().setFromObject(this.spaceObject)
        const size = new THREE.Vector3()
        box.getSize(size)
        sectorHeight = size.y
      }

      const extrudeGeometry = new THREE.ExtrudeGeometry(shape, {
        depth: -sectorHeight,
        bevelEnabled: false,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0,
        bevelThickness: 0
      })

      // Création des pointillés autour de la zone extrudée
      const edges = new THREE.EdgesGeometry(extrudeGeometry)
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 'rgb(255,0,0)',
        linewidth: 2
      })
      const lineSegments = new THREE.LineSegments(edges, lineMaterial)
      lineSegments.rotateX(THREE.MathUtils.degToRad(90))
      lineSegments.computeLineDistances()
      this.buildingBox = lineSegments
      this.scene.add(lineSegments)
      this.renderScene()
    },

    clearSectors () {
      this.sectorBoundingBoxes.forEach((object) => { this.removeObject(object) })
      this.sectorLineSegments.forEach((object) => { this.removeObject(object) })
      this.sectorBoundingBoxes = []
      this.sectorLineSegments = []
    }
  }
}
</script>
