<template>
  <div :class="activable ? 'parts-activable' : ''">
    <div
      v-if="type === 'rectangular_horizontal'"
      class="d-flex border --border-bold"
    >
      <div
        class="px-1 text-center label-activable-part"
        :class="part === 'visual' ? '--active' : null"
        style="padding-top: 18px; width: 43px"
        @click="activePart('visual')"
      >
        <v-icon
          large
          :color="part === 'visual' ? 'white' : null"
        >
          {{ mdiBookmark }}
        </v-icon>
      </div>
      <div
        class="label-activable-part px-1 text-center border-left --border-bold"
        :class="part === 'grade' ? '--active' : null"
        style="padding-top: 24px; width: 40px"
        @click="activePart('grade')"
      >
        6x
      </div>
      <div
        class="label-activable-part border-x --border-bold flex-grow-1 px-1"
        :class="part === 'information' ? '--active' : null"
        @click="activePart('information')"
      >
        Nom<br>
        Date d'ouverture, ouvreurs·euses<br>
        styles, etc.
      </div>
      <div
        class="label-activable-part text-center"
        :class="part === 'qr_code' ? '--active' : null"
        style="padding-top: 6px; width: 72px"
        @click="activePart('qr_code')"
      >
        <v-icon
          :size="60"
          :color="part === 'qr_code' ? 'white' : null"
        >
          {{ mdiQrcode }}
        </v-icon>
      </div>
    </div>
    <div
      v-if="type === 'rectangular_vertical'"
      class="d-flex flex-column border --border-bold"
    >
      <div
        class="label-activable-part border-bottom --border-bold flex-grow-1 px-1"
        :class="part === 'information' ? '--active' : null"
        @click="activePart('information')"
      >
        Nom<br>
        Date d'ouverture, ouvreurs·euses<br>
        styles, etc.
      </div>
      <div class="d-flex">
        <div class="d-flex">
          <div
            class="label-activable-part text-center"
            :class="part === 'visual' ? '--active' : null"
            style="padding-top: 12px; width: 43px"
            @click="activePart('visual')"
          >
            <v-icon
              large
              :color="part === 'visual' ? 'white' : null"
            >
              {{ mdiBookmark }}
            </v-icon>
          </div>
          <div
            class="label-activable-part text-center border-left --border-bold"
            :class="part === 'grade' ? '--active' : null"
            style="padding-top: 19px; width: 40px"
            @click="activePart('grade')"
          >
            6x
          </div>
        </div>
        <div class="flex-grow-1 border-x --border-bold" />
        <div
          class="label-activable-part text-center"
          :class="part === 'qr_code' ? '--active' : null"
          style="padding-top: 2px; width: 67px"
          @click="activePart('qr_code')"
        >
          <v-icon
            :size="60"
            :color="part === 'qr_code' ? 'white' : null"
          >
            {{ mdiQrcode }}
          </v-icon>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mdiBookmark, mdiQrcode } from '@mdi/js'

export default {
  name: 'LabelTagModel',
  props: {
    type: {
      type: String,
      required: true
    },
    activable: {
      type: Boolean,
      default: false
    },
    callback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      part: null,

      mdiBookmark,
      mdiQrcode
    }
  },

  methods: {
    activePart (part) {
      if (this.activable) {
        this.part = part === this.part ? null : part
        this.callback(this.part)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.parts-activable {
  .label-activable-part {
    cursor: pointer;
    &:hover {
      background-color: rgba(150, 150, 150, 0.3);
    }
    &.--active {
      background-color: #31994e;
      color: white;
      font-weight: bold;
    }
  }
}
</style>
