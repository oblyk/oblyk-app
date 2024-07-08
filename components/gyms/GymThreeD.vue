<template>
  <div
    class="full-height"
    style="position: relative; overflow: hidden"
  >
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
    <div
      v-if="threeDs"
      v-show="!loadingSpaces"
      class="spaces-list"
      :class="isDraggingScene ? '--in-dragging-scene' : ''"
    >
      <div
        v-for="(space, spaceIndex) in threeDs.spaces"
        :id="`space-label-${space.id}`"
        :key="`space-${spaceIndex}`"
        class="rounded font-weight-bold sector-label-in-spaces"
        :class="labelDisableEvent ? 'pointer-event-insensitive' : null"
        :style="activeSpaceId === space.id ? `background-color: ${space.color || 'rgb(49, 153, 78)'}; color: ${space.text_contrast_color}` : 'color: black'"
        @mousemove.stop="glossySpace(space.id)"
      >
        <nuxt-link
          :to="spaceToObject(space).path"
          class="discrete-link px-2 py-2"
        >
          {{ space.name }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ThreeJsMixin } from '~/mixins/ThreeJsMixin'
import GymApi from '~/services/oblyk-api/GymApi'
import GymSpace from '~/models/GymSpace'
import AnimateOblykLogo from '~/components/layouts/AnimateOblykLogo.vue'

export default {
  name: 'GymThreeD',
  components: { AnimateOblykLogo },
  mixins: [ThreeJsMixin],
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      threeDs: null,
      spaces: [],
      assets: [],
      loadingSpaces: true,
      activeSpaceId: null,

      threeDEnvironment: `GymThreeD-${this.gym.id}`
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
      this.camera = new THREE.PerspectiveCamera(45, this.TDArea.offsetWidth / this.TDArea.offsetHeight, 5, 200)
      this.camera.position.z = 25
      this.camera.position.y = 25
      this.camera.position.x = 25

      // Scene
      this.scene = new THREE.Scene()
      this.scene.background = null

      // Ambient Light
      const ambientLight = new THREE.AmbientLight('rgb(255,255,255)', 3)
      this.scene.add(ambientLight)

      // Renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(this.TDArea.offsetWidth, this.TDArea.offsetHeight)

      // Load files
      const loader = new GLTFLoader()

      const edgeLine = new THREE.LineBasicMaterial({ color: this.edgeColor })
      let spaceIndex = 0
      for (const space of this.threeDs.spaces) {
        loader.load(space.three_d_gltf_url, (gltf) => {
          spaceIndex += 1
          const object = gltf.scene

          const treatedColors = []
          object.traverse((child) => {
            if (child.isMesh) {
              // Add Edges
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

              // Add user data for highlight
              child.userData = {
                space: { id: space.id },
                material: child.material
              }
            }
          })

          object.position.y = space.three_d_position?.y || 0
          object.position.x = space.three_d_position?.x || 0
          object.position.z = space.three_d_position?.z || 0
          object.scale.setScalar(space.three_d_scale || 1)
          object.userData = { space }

          this.spaces.push(object)
          this.scene.add(object)

          // Center scene to all boxes
          if (spaceIndex === this.spaces.length) {
            const allBoxes = new THREE.Box3()
            this.spaces.forEach((space) => {
              allBoxes.expandByObject(space)
            })
            const center = new THREE.Vector3()
            allBoxes.getCenter(center)
            this.orbitControls.target.copy(center)
            this.orbitControls.update()
            this.loadingSpaces = false
            setTimeout(() => {
              this.fitCameraToObjects(this.spaces)
            }, 100)
          }
        })
      }

      for (const asset of this.threeDs.assets) {
        loader.load(asset.gym_three_d_asset.three_d_gltf_url, (gltf) => {
          const object = gltf.scene

          const treatedColors = []
          object.traverse((child) => {
            if (child.isMesh) {
              // Add Edges
              if (asset.gym_three_d_asset.three_d_parameters.highlight_edges) {
                const edges = new THREE.EdgesGeometry(child.geometry)
                const line = new THREE.LineSegments(edges, edgeLine)
                child.add(line)
              }

              // color correction
              if (asset.gym_three_d_asset.three_d_parameters.color_correction_sketchup_exports && !treatedColors.includes(child.material.uuid)) {
                const color = child.material.color
                const rgbColor = `rgb(${Math.round(255 * color.r)}, ${Math.round(255 * color.g)}, ${Math.round(255 * color.b)})`
                child.material.color = new THREE.Color(rgbColor)
                treatedColors.push(child.material.uuid)
              }

              // Add user data for highlight
              child.userData = {
                space: { id: asset.id },
                material: child.material
              }
            }
          })

          object.position.y = asset.three_d_position?.y || 0
          object.position.x = asset.three_d_position?.x || 0
          object.position.z = asset.three_d_position?.z || 0

          object.rotation.y = (asset.three_d_rotation?.y || 0) * (Math.PI / 180)
          object.rotation.x = (asset.three_d_rotation?.x || 0) * (Math.PI / 180)
          object.rotation.z = (asset.three_d_rotation?.z || 0) * (Math.PI / 180)

          object.scale.setScalar(asset.three_d_scale || 1)
          object.userData = { asset }

          this.assets.push(object)
          this.scene.add(object)

          this.renderScene()
        })
      }

      this.TDArea.innerHTML = null
      this.TDArea.appendChild(this.renderer.domElement)

      // Orbit controller
      this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
      this.orbitControls.minDistance = 5
      this.orbitControls.maxDistance = 150
      this.orbitControls.maxPolarAngle = Math.PI / 2
      this.orbitControls.addEventListener('change', this.renderScene)

      // Raycaster and mouse setup
      this.raycaster = new THREE.Raycaster()
      this.pointer = new THREE.Vector2()

      this.TDArea.addEventListener('mousemove', this.highlightSpace, false)
      this.TDArea.addEventListener('mousemove', this.disableClickOnDragging, false)
      this.TDArea.addEventListener('mouseup', this.goToSpace, false)
      this.TDArea.addEventListener('mousedown', this.onMouseDown)
      this.orbitControls.addEventListener('start', this.startDragging)
      this.orbitControls.addEventListener('start', this.startHighlightSpace)
      this.orbitControls.addEventListener('end', this.endDragging)
      this.orbitControls.addEventListener('end', this.endHighlightSpace)

      // Active label position update
      this.labelPositionUpdatable = true

      // Turns the scene on its head
      this.initTDAResizer()
      this.initLabelInsensitiveEvent()
      this.renderScene()
    },

    highlightSpace (event) {
      this.calculatePointerPosition(event)

      // Render all line box transparent
      this.unGlossySpace()

      // Check intersections on bounding boxes
      let intersects = this.raycaster.intersectObjects(this.spaces)
      intersects = intersects.filter(intersect => intersect.object.isMesh)
      if (intersects.length > 0) {
        const spaceId = intersects[0].object.userData.space.id
        this.glossySpace(spaceId)
      }
      this.renderScene()
    },

    unGlossySpace () {
      this.activeSpaceId = null
      this.spaces.forEach((space) => {
        space.traverse((child) => { if (child.isMesh) { child.material = child.userData.material } })
      })
    },

    glossySpace (spaceId) {
      this.unGlossySpace()
      const space = this.spaces.find(space => space.userData.space.id === spaceId)
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
      this.activeSpaceId = spaceId
      this.renderScene()
    },

    goToSpace (event) {
      if (this.disableClick) {
        return
      }
      event.preventDefault()
      this.calculatePointerPosition(event)

      // Check intersections on bounding boxes
      let intersects = this.raycaster.intersectObjects(this.spaces)
      intersects = intersects.filter(intersect => intersect.object.isMesh)
      if (intersects.length > 0) {
        let gymSpace = this.gym.gym_spaces.find(space => space.id === intersects[0].object.userData.space.id)
        gymSpace = new GymSpace({ attributes: gymSpace })
        this.$router.push(gymSpace.path)
        this.renderScene()
      }
    },

    startHighlightSpace () {
      this.TDArea.removeEventListener('mousemove', this.highlightSpace)
    },

    endHighlightSpace () {
      this.TDArea.addEventListener('mousemove', this.highlightSpace, false)
    },

    updateLabelsPosition () {
      const tempV = new THREE.Vector3()
      this.spaces.forEach((space) => {
        const box = new THREE.Box3().setFromObject(space)
        const size = new THREE.Vector3()
        const center = new THREE.Vector3()
        box.getSize(size)
        box.getCenter(center)
        tempV.copy(center)
        tempV.project(this.camera)

        // convert the normalized position to CSS coordinates
        const x = (tempV.x * 0.5 + 0.5) * this.TDArea.offsetWidth
        const y = (tempV.y * -0.5 + 0.5) * this.TDArea.offsetHeight

        if (!space.userData.space.domElement) {
          space.userData.space.domElement = document.querySelector(`#space-label-${space.userData.space.id}`)
        }

        space.userData.space.domElement.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`
        space.userData.space.domElement.style.zIndex = (-tempV.z * 0.5 + 0.5) | 0
      })
    },

    spaceToObject (space) {
      return new GymSpace({ attributes: space })
    }
  }
}
</script>

<style lang="scss" scoped>
.spaces-list {
  position: absolute;
  top: 0;
  left: 0;
  will-change: opacity;
  transition: opacity 0.2s;
  opacity: 1;
  .sector-label-in-spaces {
    position: absolute;
    top: 0;
    left: 0;
    white-space: nowrap;
    padding: 1px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.8);
    font-size: 0.6em;
    transition: background-color 0.2s;
  }
  &.--in-dragging-scene {
    opacity: 0.3;
    .sector-label-in-spaces {
      background-color: rgba(255, 255, 255, 0);
    }
  }
}
</style>
