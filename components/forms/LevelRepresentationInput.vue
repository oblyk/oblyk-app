<template>
  <v-input :prepend-icon="prependIcon">
    <fieldset class="full-width custom-fieldset border rounded mt-n1 pb-1 px-1">
      <legend class="v-label custom-fieldset-label">
        Quelle représentation correspond le mieux ?
      </legend>
      <div>
        <v-sheet
          class="activable-v-sheet pa-1 rounded d-flex"
          :class="levelRepresentation === 'hold' ? '--active' : null"
          @click="selectRepresentation('hold')"
        >
          <div class="pr-4 d-flex flex-column align-content-center">
            <v-img
              contain
              src="/svg/level_representations/hold.svg"
              height="48"
              width="48"
            />
          </div>
          <div>
            <p class="font-weight-bold mb-1">
              Prises
            </p>
            <p class="mb-0 subtitle-2 font-weight-regular">
              <cite>Exemple :</cite> Il faut prendre les prises violette, la difficulté est donnée par la cotation ou par la couleur des prises.
            </p>
          </div>
        </v-sheet>
        <v-sheet
          class="activable-v-sheet pa-1 rounded d-flex"
          :class="levelRepresentation === 'tag' ? '--active' : null"
          @click="selectRepresentation('tag')"
        >
          <div class="pr-4 d-flex flex-column align-content-center">
            <v-img
              contain
              src="/svg/level_representations/tag.svg"
              height="48"
              width="48"
            />
          </div>
          <div>
            <p class="font-weight-bold mb-1">
              Étiquettes
            </p>
            <p class="mb-0 subtitle-2 font-weight-regular">
              <cite>Exemple :</cite> J'ai un pan avec des prises de toutes les couleurs, il faut suivre les étiquettes rouges pour faire le circuit.
            </p>
          </div>
        </v-sheet>
        <v-sheet
          class="activable-v-sheet pa-1 rounded d-flex"
          :class="levelRepresentation === 'hold_and_tag' ? '--active' : null"
          @click="selectRepresentation('hold_and_tag')"
        >
          <div class="pr-4 d-flex flex-column align-content-center">
            <v-img
              contain
              src="/svg/level_representations/hold_and_tag.svg"
              height="48"
              width="48"
            />
          </div>
          <div>
            <p class="font-weight-bold mb-1">
              Prises + étiquettes
            </p>
            <p class="mb-0 subtitle-2 font-weight-regular">
              <cite>Exemple :</cite> Il faut prendre les prises violettes, mais le bloc est d'un niveau rouge.
            </p>
          </div>
        </v-sheet>
      </div>
    </fieldset>
  </v-input>
</template>

<script>

export default {
  name: 'LevelRepresentationInput',
  props: {
    value: {
      type: String,
      default: null
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    prependIcon: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      levelRepresentation: this.value
    }
  },

  watch: {
    value () {
      this.levelRepresentation = this.value
    }
  },

  methods: {
    selectRepresentation (representation) {
      this.levelRepresentation = representation
      this.$emit('input', this.levelRepresentation)
    }
  }
}
</script>
