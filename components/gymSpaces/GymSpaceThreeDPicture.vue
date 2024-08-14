<template>
  <div style="position: relative; height: 100%; width: 100%;">
    <v-btn
      style="position: absolute; right: 0; bottom: 0;"
      icon
      x-large
      :loading="loadingCapture"
      @click="takeCapture"
    >
      <v-icon>
        {{ mdiCamera }}
      </v-icon>
    </v-btn>
    <div
      id="three-d-area"
      style="height: 100%; width: 100%;"
    >
      <p class="text-center mt-10">
        {{ $t('common.loading') }}
      </p>
    </div>
  </div>
</template>

<script>
import { mdiCamera } from '@mdi/js'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ThreeJsMixin } from '~/mixins/ThreeJsMixin'
import { AppConcern } from '~/concerns/AppConcern'
import GymSpace from '~/models/GymSpace'

export default {
  name: 'GymSpaceThreeDPicture',
  mixins: [ThreeJsMixin, AppConcern],
  props: {
    gymSpace: {
      type: Object,
      required: true
    },
    captureCallback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      loadingCapture: false,

      mdiCamera
    }
  },

  mounted () {
    this.TDArea = document.getElementById('three-d-area')
    this.initThreeJs()
  },

  methods: {
    initThreeJs () {
      if (this.gymSpace.three_d_mtl_url === null) {
        return
      }

      // Camera
      this.camera = new THREE.PerspectiveCamera(45, this.TDArea.offsetWidth / this.TDArea.offsetHeight, 1, 200)
      this.camera.position.z = 25
      this.camera.position.y = 25
      this.camera.position.x = 25

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

        this.renderScene()
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

      this.initTDAResizer()
      this.renderScene()
    },

    async takeCapture () {
      this.loadingCapture = true
      const formData = new FormData()
      const file = await this.canvasToFile(this.gymSpace.name)

      formData.append('gym_space[three_d_picture]', file)
      formData.append('gym_space[three_d_camera_position][x]', this.camera.position.x)
      formData.append('gym_space[three_d_camera_position][y]', this.camera.position.y)
      formData.append('gym_space[three_d_camera_position][z]', this.camera.position.z)

      this.$axios({
        method: 'POST',
        url: `${this.baseUrl}/gyms/${this.$route.params.gymId}/gym_spaces/${this.gymSpace.id}/add_three_d_capture.json`,
        headers: {
          Authorization: this.$auth.$storage.getUniversal('_token.local'),
          HttpApiAccessToken: this.apiAccessToken,
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      })
        .then((resp) => {
          this.captureCallback(new GymSpace({ attributes: resp.data }))
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymRoute')
        })
        .then(() => {
          this.loadingCapture = false
        })
    }
  }
}
</script>
