import * as THREE from 'three'

export const ThreeJsMixin = {
  data () {
    return {
      TDArea: null,
      camera: null,
      scene: null,
      renderer: null,
      orbitControls: null,
      raycaster: null,
      pointer: null,
      stats: null,
      isDraggingScene: false,
      disableClick: false,
      animationId: null,
      TDAreaResizeObserver: null,
      edgeColor: 'rgb(120, 120, 120)',
      labelPositionUpdatable: false,
      labelDisableEvent: false,
      labelDisableTimeout: null,
      objectsSceneSize: null
    }
  },

  beforeDestroy () {
    if (this.orbitControls) {
      this.orbitControls.removeEventListener('start', this.startDragging)
      this.orbitControls.removeEventListener('end', this.endDragging)
      this.orbitControls.removeEventListener('end', this.saveCameraPosition)
    }
    if (this.TDAreaResizeObserver && this.TDArea) {
      this.TDAreaResizeObserver.unobserve(this.TDArea)
      this.TDAreaResizeObserver = null
    }
    if (this.TDArea) {
      this.TDArea.removeEventListener('mousemove', this.highlightSpace)
      this.TDArea.removeEventListener('mousemove', this.disableClickOnDragging)
      this.TDArea.removeEventListener('mousedown', this.onMouseDown)
      this.cleanupThreeJS()
    }
    document.removeEventListener('wheel', this.addPointerInsensitiveClass)
  },

  methods: {
    resizeThreeJsContainer () {
      const aspect = this.TDArea.offsetWidth / this.TDArea.offsetHeight
      if (this.camera.type === 'OrthographicCamera') {
        this.camera.left = -aspect * 5
        this.camera.right = aspect * 5
        this.camera.top = 5
        this.camera.bottom = -5
      } else {
        this.camera.aspect = aspect
      }
      this.camera.updateProjectionMatrix()

      this.renderer.setSize(this.TDArea.offsetWidth, this.TDArea.offsetHeight)
      this.renderScene()
    },

    initTDAResizer () {
      this.TDAreaResizeObserver = new ResizeObserver(this.resizeThreeJsContainer)
      this.TDAreaResizeObserver.observe(this.TDArea)
    },

    disableClickOnDragging () {
      this.disableClick = this.isDraggingScene
    },

    onMouseDown () {
      this.disableClick = false
    },

    startDragging () {
      this.isDraggingScene = true
      this.orbitControls.autoRotate = false
    },

    endDragging () {
      this.isDraggingScene = false
    },

    renderScene () {
      this.renderer.render(this.scene, this.camera)
      if (this.labelPositionUpdatable) {
        this.updateLabelsPosition()
      }
    },

    calculatePointerPosition (event) {
      if (!this.renderer) { return }

      // Convert mouse position to normalized device coordinates (-1 to +1)
      const canvasBounds = this.renderer.domElement.getBoundingClientRect()
      this.pointer.x = ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1
      this.pointer.y = -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1
      this.raycaster.setFromCamera(this.pointer, this.camera)
    },

    removeObject (object) {
      this.scene.remove(object)

      object.traverse((child) => {
        if (child.geometry) {
          child.geometry.dispose()
        }
        if (child.material) {
          if (child.material instanceof Array) {
            child.material.forEach(mat => mat.dispose())
          } else {
            child.material.dispose()
          }
        }
      })

      object = null
    },

    cleanupThreeJS () {
      cancelAnimationFrame(this.animationId)

      if (this.orbitControls !== null) {
        this.orbitControls.dispose()
        this.orbitControls = null
      }

      if (this.scene !== null) {
        this.scene.traverse((object) => {
          if (!object.isMesh) {
            return
          }
          object.geometry.dispose()
          if (object.material.isMaterial) {
            this.cleanMaterial(object.material)
          } else {
            for (const material of object.material) {
              this.cleanMaterial(material)
            }
          }
        })
      }

      if (this.renderer !== null) {
        this.renderer.dispose()
        this.renderer.domElement = null
      }

      this.scene = null
      this.camera = null
      this.orbitControls = null
      this.renderer = null
      this.raycaster = null
      this.pointer = null
      this.disableClick = false
      this.isDraggingScene = false
      this.labelPositionUpdatable = false
      this.labelDisableEvent = false
      this.objectsSceneSize = null
      if (this.labelDisableTimeout) {
        clearTimeout(this.labelDisableTimeout)
      }
    },

    cleanMaterial (material) {
      material.dispose()
      for (const key of Object.keys(material)) {
        const value = material[key]
        if (value && typeof value === 'object' && 'minFilter' in value) {
          value.dispose()
        }
      }
    },

    canvasToPng (fileName) {
      this.renderScene()
      const a = document.createElement('a')
      document.body.appendChild(a)
      a.style.display = 'none'
      this.TDArea.querySelector('canvas').toBlob((blob) => {
        a.href = window.URL.createObjectURL(blob)
        a.download = `${fileName}.png`
        a.click()
      })
    },

    canvasToFile (fileName) {
      this.renderScene()
      return new Promise((resolve, reject) => {
        this.TDArea.querySelector('canvas').toBlob((blob) => {
          const file = new File([blob], `${fileName}.png`, { type: 'image/png' })
          resolve(file)
        }, 'image/png', 1)
      })
    },

    saveCameraPosition () {
      const cameraParams = {
        position: this.camera.position.clone(),
        target: this.orbitControls.target.clone(),
        zoom: this.camera.zoom
      }
      localStorage.setItem(`cameraPosition-${this.threeDEnvironment}`, JSON.stringify(cameraParams))
    },

    fitCameraToObjects (objects, offset = 1.2) {
      const size = new THREE.Vector3()
      const center = new THREE.Vector3()
      const box = new THREE.Box3()
      for (const object of objects) {
        box.expandByObject(object)
      }

      box.getSize(size)
      box.getCenter(center)

      const maxSize = Math.max(size.x, size.y, size.z)
      const fitHeightDistance = maxSize / (2 * Math.atan(Math.PI * this.camera.fov / 360))
      const fitWidthDistance = fitHeightDistance / this.camera.aspect
      const distance = offset * Math.max(fitHeightDistance, fitWidthDistance)

      const direction = this.orbitControls.target.clone()
        .sub(this.camera.position)
        .normalize()
        .multiplyScalar(distance)

      this.orbitControls.maxDistance = distance * offset * 1.5
      this.orbitControls.target.copy(center)

      this.camera.near = distance / 100
      this.camera.far = distance * 100
      this.camera.updateProjectionMatrix()

      this.camera.position.copy(this.orbitControls.target).sub(direction)
      this.orbitControls.update()
      this.renderScene()
    },

    setView (view) {
      const target = this.orbitControls.target.clone()
      if (view === 'top') {
        const max = Math.max(this.objectsSceneSize.x, this.objectsSceneSize.y, this.objectsSceneSize.z)
        this.orbitControls.target.y = 0

        this.camera.position.set(target.x, target.y + max, target.z)
      }
      if (view === 'bottom') {
        const max = Math.max(this.objectsSceneSize.x, this.objectsSceneSize.y, this.objectsSceneSize.z)
        this.orbitControls.target.y = 0

        this.camera.position.set(target.x, (target.y + max) * -1, target.z)
      }
      this.orbitControls.update()
      this.renderScene()
    },

    initLabelInsensitiveEvent () {
      document.addEventListener('scroll', this.addPointerInsensitiveClass)
      document.addEventListener('wheel', this.addPointerInsensitiveClass)
    },

    addPointerInsensitiveClass () {
      if (this.labelDisableTimeout) {
        clearTimeout(this.labelDisableTimeout)
      }
      this.labelDisableEvent = true
      this.labelDisableTimeout = setTimeout(() => {
        this.labelDisableEvent = false
        this.labelDisableTimeout = null
      }, 300)
    }
  }
}
