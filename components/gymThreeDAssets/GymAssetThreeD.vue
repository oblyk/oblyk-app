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
      v-if="loadingAsset"
      class="full-height d-flex flex-column justify-center"
    >
      <div class="text-center">
        <animate-oblyk-logo
          :animate="loadingAsset"
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
      v-show="!loadingAsset"
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
import AnimateOblykLogo from '~/components/layouts/AnimateOblykLogo.vue'

export default {
  name: 'GymAssetThreeD',
  components: { AnimateOblykLogo },
  mixins: [ThreeJsMixin, AppConcern],
  props: {
    gymThreeDAsset: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingCapture: false,
      loadingAsset: true,

      mdiCamera
    }
  },

  mounted () {
    this.TDArea = document.getElementById('three-d-area')
    this.initThreeJs()
  },

  methods: {
    initThreeJs () {
      // Camera
      this.camera = new THREE.PerspectiveCamera(45, this.TDArea.offsetWidth / this.TDArea.offsetHeight, 1, 200)
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
      this.renderer.shadowMap.enabled = true
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(this.TDArea.offsetWidth, this.TDArea.offsetHeight)

      // Load files
      const loader = new GLTFLoader()

      const edgeLine = new THREE.LineBasicMaterial({ color: this.edgeColor })
      loader.load(this.gymThreeDAsset.three_d_gltf_url, (gltf) => {
        const object = gltf.scene
        this.spaceObject = object

        const treatedColors = []
        object.traverse((child) => {
          if (child.isMesh) {
            // Add Edges
            if (this.gymThreeDAsset.three_d_parameters?.highlight_edges) {
              const edges = new THREE.EdgesGeometry(child.geometry)
              const line = new THREE.LineSegments(edges, edgeLine)
              child.add(line)
            }

            // color correction
            if (this.gymThreeDAsset.three_d_parameters?.color_correction_sketchup_exports && !treatedColors.includes(child.material.uuid)) {
              const color = child.material.color
              const rgbColor = `rgb(${Math.round(255 * color.r)}, ${Math.round(255 * color.g)}, ${Math.round(255 * color.b)})`
              child.material.color = new THREE.Color(rgbColor)
              treatedColors.push(child.material.uuid)
            }
          }
        })

        this.scene.add(object)

        // Center space on center of scene
        const box = new THREE.Box3().setFromObject(object)
        const center = new THREE.Vector3()
        box.getCenter(center)
        this.orbitControls.target.copy(center)
        this.orbitControls.update()
        this.loadingAsset = false
        setTimeout(() => {
          this.fitCameraToObjects([object], 2)
        }, 100)
        this.renderScene()
      })

      this.TDArea.innerHTML = null
      this.TDArea.appendChild(this.renderer.domElement)

      // Orbit controller
      this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
      this.orbitControls.minDistance = 1
      this.orbitControls.maxDistance = 100
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
      const file = await this.canvasToFile(this.gymThreeDAsset.name)

      formData.append('gym_three_d_asset[picture]', file)

      this.$axios({
        method: 'POST',
        url: `${this.baseUrl}/gyms/${this.$route.params.gymId}/gym_three_d_assets/${this.gymThreeDAsset.id}/add_picture.json`,
        headers: {
          Authorization: this.$auth.$storage.getUniversal('_token.local'),
          HttpApiAccessToken: this.apiAccessToken,
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      })
        .then((resp) => {
          console.log(resp)
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
