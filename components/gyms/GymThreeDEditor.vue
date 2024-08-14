<template>
  <div
    style="position: relative"
    class="full-height"
  >
    <div style="position: absolute; top: 5px; right: 5px;">
      <div>
        Vue de :
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              @click="setView('top')"
            >
              <v-icon>
                {{ mdiArrowCollapseDown }}
              </v-icon>
            </v-btn>
          </template>
          <span>Dessus</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              @click="setView('bottom')"
            >
              <v-icon>
                {{ mdiArrowCollapseUp }}
              </v-icon>
            </v-btn>
          </template>
          <span>Dessous</span>
        </v-tooltip>
      </div>
    </div>
    <div
      v-if="loadingSpaces"
      class="full-height d-flex flex-column justify-center"
    >
      <div class="text-center">
        <animate-oblyk-logo
          :animate="loadingSpaces"
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
      v-show="!loadingSpaces"
      id="three-d-area"
      class="full-height"
    >
      <p class="text-center mt-10">
        {{ $t('common.loading') }}
      </p>
    </div>
  </div>
</template>

<script>
import { mdiArrowCollapseDown, mdiArrowCollapseUp } from '@mdi/js'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DragControls } from 'three/examples/jsm/controls/DragControls.js'
import { ThreeJsMixin } from '~/mixins/ThreeJsMixin'
import GymApi from '~/services/oblyk-api/GymApi'
import AnimateOblykLogo from '~/components/layouts/AnimateOblykLogo'

export default {
  name: 'GymThreeDEditor',
  components: { AnimateOblykLogo },
  mixins: [ThreeJsMixin],
  props: {
    gym: {
      type: Object,
      required: true
    },
    spaceClickCallback: {
      type: Function,
      default: null
    },
    assetClickCallback: {
      type: Function,
      default: null
    },
    editingSpaceElevation: {
      type: [String, Number],
      default: null
    },
    editingSpaceRotation: {
      type: Object,
      default: null
    },
    editingAssetElevation: {
      type: [String, Number],
      default: null
    },
    editingAssetRotation: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      threeDs: null,
      isEditing: false,
      interactiveElements: [],

      spaces: [],
      isHighlightSpace: false,
      editingSpace: null,
      originalSpacePosition: null,
      originalSpaceRotation: null,
      spacesGroup: {},

      assets: [],
      editingAsset: null,
      originalAssetPosition: null,
      originalAssetRotation: null,

      threeDEnvironment: `GymThreeDEditor-${this.gym.id}`,

      loadingSpaces: true,

      mdiArrowCollapseDown,
      mdiArrowCollapseUp
    }
  },

  watch: {
    editingSpaceElevation () {
      this.setSpaceElevation()
    },

    editingSpaceRotation: {
      handler () { this.setSpaceRotation() },
      deep: true
    },

    editingAssetElevation () {
      this.setAssetElevation()
    },

    editingAssetRotation: {
      handler () { this.setAssetRotation() },
      deep: true
    }
  },

  mounted () {
    this.TDArea = document.getElementById('three-d-area')
    this.getThreeD()
  },

  methods: {
    getThreeD () {
      new GymApi(this.$axios, this.$auth)
        .threeD(this.gym.id)
        .then((resp) => {
          this.threeDs = resp.data
          this.initThreeJs()
        })
    },

    initThreeJs () {
      // Camera
      const aspect = this.TDArea.offsetWidth / this.TDArea.offsetHeight
      this.camera = new THREE.OrthographicCamera(
        -aspect * 5, aspect * 5, 5, -5, 1, 1000
      )
      const savedCameraPosition = localStorage.getItem(`cameraPosition-${this.threeDEnvironment}`)

      // Scene
      this.scene = new THREE.Scene()
      this.scene.background = null

      // Ambient Light
      const ambientLight = new THREE.AmbientLight('rgb(255,255,255)', 0.7)
      this.scene.add(ambientLight)

      // Hemisphere Light
      const light = new THREE.HemisphereLight('rgb(255,255,255)', 'rgb(0,0,0)', 4)
      this.scene.add(light)

      // Renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, logarithmicDepthBuffer: true })
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(this.TDArea.offsetWidth, this.TDArea.offsetHeight)

      // Load GLTF file
      const loader = new GLTFLoader()

      // Load spaces
      const edgeLine = new THREE.LineBasicMaterial({ color: this.edgeColor })
      let spaceIndex = 0
      for (const space of this.threeDs.spaces) {
        loader.load(space.three_d_gltf_url, (gltf) => {
          spaceIndex += 1
          const object = gltf.scene
          const treatedColors = []

          object.traverse((child) => {
            if (child.isMesh) {
              if (space.three_d_parameters?.highlight_edges) {
                const edges = new THREE.EdgesGeometry(child.geometry)
                const line = new THREE.LineSegments(edges, edgeLine)
                child.add(line)
              }

              // color correction
              if (space.three_d_parameters?.color_correction_sketchup_exports && !treatedColors.includes(child.material.uuid)) {
                const color = child.material.color
                const rgbColor = `rgb(${Math.round(255 * color.r)}, ${Math.round(255 * color.g)}, ${Math.round(255 * color.b)})`
                child.material.color = new THREE.Color(rgbColor)
                treatedColors.push(child.material.uuid)
              }

              child.userData = {
                type: 'Space',
                space: { id: space.id },
                material: child.material
              }
            }
          })

          object.position.y = space.three_d_position?.y || 0
          object.position.x = space.three_d_position?.x || 0
          object.position.z = space.three_d_position?.z || 0

          object.rotation.y = (space.three_d_rotation?.y || 0) * (Math.PI / 180)
          object.rotation.x = (space.three_d_rotation?.x || 0) * (Math.PI / 180)
          object.rotation.z = (space.three_d_rotation?.z || 0) * (Math.PI / 180)

          object.scale.setScalar(space.three_d_scale || 1)
          object.userData.space = space

          this.spaces.push(object)
          this.interactiveElements.push(object)
          this.scene.add(object)

          if (spaceIndex === this.threeDs.spaces.length) {
            const allBoxes = new THREE.Box3()
            this.spaces.forEach((space) => {
              allBoxes.expandByObject(space)
            })
            const center = new THREE.Vector3()
            const size = new THREE.Vector3()
            allBoxes.getCenter(center)
            allBoxes.getSize(size)
            this.objectsSceneSize = size
            if (!savedCameraPosition) {
              this.orbitControls.target.copy(center)
              this.orbitControls.target.y = 0
            }
            this.orbitControls.update()
            this.loadingSpaces = false
          }
        })
      }

      if (this.threeDs.spaces.length === 0) {
        this.loadingSpaces = false
      }

      // Load Assets
      for (const element of this.threeDs.assets) {
        loader.load(element.gym_three_d_asset.three_d_gltf_url, (gltf) => {
          const object = gltf.scene

          const treatedColors = []
          object.traverse((child) => {
            if (child.isMesh) {
              if (element.gym_three_d_asset.three_d_parameters?.highlight_edges) {
                const edges = new THREE.EdgesGeometry(child.geometry)
                const line = new THREE.LineSegments(edges, edgeLine)
                child.add(line)
              }

              // color correction
              if (element.gym_three_d_asset.three_d_parameters?.color_correction_sketchup_exports && !treatedColors.includes(child.material.uuid)) {
                const color = child.material.color
                const rgbColor = `rgb(${Math.round(255 * color.r)}, ${Math.round(255 * color.g)}, ${Math.round(255 * color.b)})`
                child.material.color = new THREE.Color(rgbColor)
                treatedColors.push(child.material.uuid)
              }

              child.userData = {
                type: 'Asset',
                asset: { id: element.id },
                material: child.material
              }
            }
          })

          object.position.y = element.three_d_position?.y || 0
          object.position.x = element.three_d_position?.x || 0
          object.position.z = element.three_d_position?.z || 0

          object.rotation.y = (element.three_d_rotation?.y || 0) * (Math.PI / 180)
          object.rotation.x = (element.three_d_rotation?.x || 0) * (Math.PI / 180)
          object.rotation.z = (element.three_d_rotation?.z || 0) * (Math.PI / 180)

          object.scale.setScalar(element.three_d_scale || 1)
          object.userData.asset = element

          this.assets.push(object)
          this.interactiveElements.push(object)
          this.scene.add(object)

          this.renderScene()
        })
      }

      this.TDArea.innerHTML = null
      this.TDArea.appendChild(this.renderer.domElement)

      // Orbit controller
      this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
      this.orbitControls.minDistance = 10
      this.orbitControls.maxDistance = 80
      this.orbitControls.addEventListener('change', this.renderScene)

      // Raycaster and mouse setup
      this.raycaster = new THREE.Raycaster()
      this.pointer = new THREE.Vector2()

      if (savedCameraPosition) {
        const cameraPosition = JSON.parse(savedCameraPosition)
        this.camera.position.copy(cameraPosition.position)
        this.camera.zoom = cameraPosition.zoom
        this.orbitControls.target.copy(cameraPosition.target)
        this.orbitControls.update()
      } else {
        this.camera.position.z = 50
        this.camera.position.y = 50
        this.camera.position.x = 50
      }

      this.TDArea.addEventListener('mousemove', this.pointerMouveEvent, false)
      this.TDArea.addEventListener('mousemove', this.disableClickOnDragging, false)
      this.TDArea.addEventListener('mouseup', this.pointerUpEvent, false)
      this.orbitControls.addEventListener('start', this.startDragging)
      this.orbitControls.addEventListener('end', this.endDragging)
      this.orbitControls.addEventListener('end', this.saveCameraPosition)

      this.dragControls = new DragControls([], this.camera, this.renderer.domElement)
      this.dragControls.rotateSpeed = 2
      this.dragControls.transformGroup = true

      // Turns the scene on its head
      this.initTDAResizer()
      this.renderScene()
    },

    pointerMouveEvent (event) {
      this.calculatePointerPosition(event)
      event.preventDefault()

      // HIGHLIGHT SPACE OR ASSET
      if (!this.isEditing) {
        this.unGlossyInteractiveElements()
        let intersects = this.raycaster.intersectObjects(this.interactiveElements)
        intersects = intersects.filter(intersect => intersect.object.isMesh)
        if (intersects.length > 0) {
          if (intersects[0].object.userData.type === 'Space') {
            const spaceId = intersects[0].object.userData.space.id
            this.glossySpace(spaceId)
            this.isHighlightSpace = true
          } else {
            const assetId = intersects[0].object.userData.asset.id
            this.glossyAsset(assetId)
          }
        }
      }
      this.renderScene()
    },

    pointerUpEvent (event) {
      event.preventDefault()
      this.calculatePointerPosition(event)

      // START EDITING SPACE
      if (!this.disableClick && !this.isEditing) {
        let intersects = this.raycaster.intersectObjects(this.interactiveElements)
        intersects = intersects.filter(intersect => intersect.object.isMesh)
        if (intersects.length > 0) {
          if (intersects[0].object.userData.type === 'Space') {
            const spaceId = intersects[0].object.userData.space.id
            this.spaceClickCallback(this.threeDs.spaces.find(space => space.id === spaceId))
          } else {
            const assetId = intersects[0].object.userData.asset.id
            this.assetClickCallback(this.threeDs.assets.find(asset => asset.id === assetId))
          }
        }
      }
    },

    unGlossyInteractiveElements () {
      this.interactiveElements.forEach((interactiveElement) => {
        interactiveElement.traverse((child) => { if (child.isMesh) { child.material = child.userData.material } })
      })
      this.renderScene()
    },

    // SPACES
    glossySpace (spaceId) {
      const space = this.spaces.find(space => space.userData.space.id === spaceId)
      if (!space) { return }

      const intensity = 0.30
      const colorFiltre = {
        r: 0 * intensity,
        g: 188 * intensity,
        b: 212 * intensity
      }
      space.traverse((child) => {
        if (child.isMesh) {
          const color = child.material.color
          const colorR = Math.round(color.r * 255 * (1 - intensity) + colorFiltre.r)
          const colorG = Math.round(color.g * 255 * (1 - intensity) + colorFiltre.g)
          const colorB = Math.round(color.b * 255 * (1 - intensity) + colorFiltre.b)
          const newRgbColor = `rgb(${colorR}, ${colorG}, ${colorB})`
          const newColor = new THREE.Color(newRgbColor)
          child.material = new THREE.MeshBasicMaterial({ color: newColor })
        }
      })
      this.renderScene()
    },

    setSpaceElevation () {
      if (this.editingSpace) {
        this.editingSpace.position.y = this.editingSpaceElevation
        this.renderScene()
      }
    },

    setSpaceRotation () {
      if (this.editingSpace) {
        this.editingSpace.rotation.x = parseFloat(this.editingSpaceRotation.x || '0') * (Math.PI / 180)
        this.editingSpace.rotation.y = parseFloat(this.editingSpaceRotation.y || '0') * (Math.PI / 180)
        this.editingSpace.rotation.z = parseFloat(this.editingSpaceRotation.z || '0') * (Math.PI / 180)
        this.renderScene()
      }
    },

    startEditingSpace (space) {
      this.unGlossyInteractiveElements()
      this.glossySpace(space.id)
      this.isEditing = true
      this.editingSpace = this.spaces.find(gymSpace => gymSpace.userData.space.id === space.id)
      this.originalSpacePosition = { ...this.editingSpace.position }
      this.originalSpaceRotation = { ...this.editingSpace.rotation }
      this.dragControls.enable = true
      this.dragControls.setObjects([this.editingSpace])
      this.dragControls.addEventListener('drag', this.spaceDrag)
      this.dragControls.addEventListener('dragend', this.spaceEndDrag)
      this.renderScene()
    },

    cancelEditingSpace () {
      this.editingSpace.position.copy(this.originalSpacePosition)
      this.editingSpace.rotation.copy(this.originalSpaceRotation)
      this.endEditingSpace()
    },

    endEditingSpace () {
      this.isEditing = false
      this.editingSpace = null
      this.dragControls.setObjects([])
      this.dragControls.removeEventListener('drag')
      this.dragControls.removeEventListener('dragend')
      this.unGlossyInteractiveElements()
    },

    spaceDrag (event) {
      this.orbitControls.enabled = false
      event.object.position.y = this.editingSpaceElevation
    },

    spaceEndDrag () {
      this.orbitControls.enabled = true
    },

    getSpacePosition () {
      return this.editingSpace.position
    },

    // ASSETS
    glossyAsset (assetId) {
      const asset = this.assets.find(asset => asset.userData.asset.id === assetId)
      const intensity = 0.30
      const colorFiltre = {
        r: 0 * intensity,
        g: 188 * intensity,
        b: 212 * intensity
      }
      asset.traverse((child) => {
        if (child.isMesh) {
          const color = child.material.color
          const colorR = Math.round(color.r * 255 * (1 - intensity) + colorFiltre.r)
          const colorG = Math.round(color.g * 255 * (1 - intensity) + colorFiltre.g)
          const colorB = Math.round(color.b * 255 * (1 - intensity) + colorFiltre.b)
          const newRgbColor = `rgb(${colorR}, ${colorG}, ${colorB})`
          const newColor = new THREE.Color(newRgbColor)
          child.material = new THREE.MeshBasicMaterial({ color: newColor })
        }
      })
      this.renderScene()
    },

    startEditingAsset (asset) {
      this.unGlossyInteractiveElements()
      this.glossyAsset(asset.id)
      this.isEditing = true
      this.editingAsset = this.assets.find(el => el.userData.asset.id === asset.id)
      this.originalAssetPosition = { ...this.editingAsset.position }
      this.originalAssetRotation = { ...this.editingAsset.rotation }
      this.dragControls.enable = true
      this.dragControls.setObjects([this.editingAsset])
      this.dragControls.addEventListener('drag', this.assetDrag)
      this.dragControls.addEventListener('dragend', this.assetEndDrag)
      this.renderScene()
    },

    setAssetElevation () {
      if (this.editingAsset) {
        this.editingAsset.position.y = this.editingAssetElevation
        this.renderScene()
      }
    },

    setAssetRotation () {
      if (this.editingAsset) {
        this.editingAsset.rotation.x = parseFloat(this.editingAssetRotation.x || '0') * (Math.PI / 180)
        this.editingAsset.rotation.y = parseFloat(this.editingAssetRotation.y || '0') * (Math.PI / 180)
        this.editingAsset.rotation.z = parseFloat(this.editingAssetRotation.z || '0') * (Math.PI / 180)
        this.renderScene()
      }
    },

    cancelEditingAsset () {
      this.editingAsset.position.copy(this.originalAssetPosition)
      this.editingAsset.rotation.copy(this.originalAssetRotation)
      this.endEditingAsset()
    },

    endEditingAsset () {
      this.isEditing = false
      this.editingAsset = null
      this.dragControls.setObjects([])
      this.dragControls.removeEventListener('drag')
      this.dragControls.removeEventListener('dragend')
      this.unGlossyInteractiveElements()
      this.renderScene()
    },

    assetDrag (event) {
      this.orbitControls.enabled = false
      event.object.position.y = this.editingAssetElevation
    },

    assetEndDrag () {
      this.orbitControls.enabled = true
    },

    getAssetPosition () {
      return this.editingAsset.position
    }
  }
}
</script>
