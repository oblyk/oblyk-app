<template>
  <v-input
    :prepend-icon="prependIcon"
    :hide-details="hideDetails"
  >
    <fieldset class="full-width custom-fieldset border rounded mt-n1 pb-1 px-1">
      <legend class="v-label custom-fieldset-label">
        Dans quel ordre sont vos couleurs ? (optionnel)
      </legend>
      <v-list>
        <v-list-item
          v-for="(level, levelIndex) in levels"
          :key="`level-index-${levelIndex}`"
          class="px-0"
        >
          <v-list-item-content class="py-0">
            <v-list-item-title class="d-flex">
              <color-input
                v-model="level.color"
                input-style="button"
                :multiple="false"
                @input="change"
              />
              <div class="pt-2 pl-2">
                {{ hexColorToName(level.color) }}
              </div>
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action
            class="flex-row my-0 pb-2 ml-0"
          >
            <v-btn
              icon
              :disabled="disableUp(levelIndex)"
              @click="levelUp(levelIndex)"
            >
              <v-icon small>
                {{ mdiArrowUp }}
              </v-icon>
            </v-btn>
            <v-btn
              icon
              :disabled="disableDown(levelIndex)"
              @click="levelDown(levelIndex)"
            >
              <v-icon small>
                {{ mdiArrowDown }}
              </v-icon>
            </v-btn>
            <v-btn
              icon
              @click="deleteLevel(levelIndex)"
            >
              <v-icon small>
                {{ mdiClose }}
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <div class="text-right">
        <v-dialog
          v-if="levels.length === 0"
          v-model="suggestModal"
          width="450"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              outlined
              text
              v-bind="attrs"
              v-on="on"
            >
              Suggestions ?
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              Quelques ordres de couleur connue
            </v-card-title>
            <v-card-text>
              <div
                v-for="(suggestion, suggestionIndex) in suggestions"
                :key="`suggestion-${suggestionIndex}`"
                class="mb-2"
              >
                <v-btn
                  outlined
                  text
                  @click="suggest(suggestionIndex)"
                >
                  <v-icon
                    v-for="(level, levelIndex) in suggestion"
                    :key="`suggestion-${levelIndex}`"
                    :color="level.color"
                  >
                    {{ mdiCircle }}
                  </v-icon>
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-btn
          outlined
          text
          @click="add()"
        >
          {{ $t('actions.add') }}
          <v-icon right>
            {{ mdiPlus }}
          </v-icon>
        </v-btn>
      </div>
    </fieldset>
  </v-input>
</template>

<script>
import { mdiArrowUp, mdiArrowDown, mdiPlus, mdiClose, mdiCircle } from '@mdi/js'
import ColorInput from '~/components/forms/ColorInput'
import { HoldColorsHelpers } from '~/mixins/HoldColorsHelpers'

export default {
  name: 'ColorOrderInput',
  components: { ColorInput },
  mixins: [HoldColorsHelpers],
  props: {
    value: {
      type: Array,
      default: null
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    prependIcon: {
      type: String,
      default: null
    },
    gymLevel: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      levels: this.value || [],
      suggestModal: false,
      suggestions: [
        [
          { order: 0, color: '#ffcc00' },
          { order: 1, color: '#2ca02c' },
          { order: 2, color: '#0055d4' },
          { order: 3, color: '#ab37c8' },
          { order: 4, color: '#ff0000' },
          { order: 5, color: '#1a1a1a' }
        ],
        [
          { order: 0, color: '#ffcc00' },
          { order: 1, color: '#2ca02c' },
          { order: 2, color: '#0055d4' },
          { order: 3, color: '#ff0000' },
          { order: 4, color: '#1a1a1a' },
          { order: 5, color: '#ab37c8' }
        ],
        [
          { order: 0, color: '#ffcc00' },
          { order: 1, color: '#2ca02c' },
          { order: 2, color: '#0055d4' },
          { order: 3, color: '#ab37c8' },
          { order: 4, color: '#ff0000' },
          { order: 5, color: '#f2f2f2' },
          { order: 6, color: '#1a1a1a' }
        ],
        [
          { order: 0, color: '#f2f2f2' },
          { order: 1, color: '#ffcc00' },
          { order: 2, color: '#0055d4' },
          { order: 3, color: '#ab37c8' },
          { order: 4, color: '#ff0000' },
          { order: 5, color: '#1a1a1a' },
          { order: 6, color: '#2ca02c' }
        ],
        [
          { order: 0, color: '#f2f2f2' },
          { order: 1, color: '#ff6600' },
          { order: 2, color: '#2ca02c' },
          { order: 3, color: '#0055d4' },
          { order: 4, color: '#ff0000' },
          { order: 5, color: '#1a1a1a' },
          { order: 6, color: '#ab37c8' }
        ],
        [
          { order: 0, color: '#f2f2f2' },
          { order: 1, color: '#2ca02c' },
          { order: 2, color: '#ffcc00' },
          { order: 3, color: '#ff6600' },
          { order: 4, color: '#ff0000' },
          { order: 5, color: '#ab37c8' },
          { order: 6, color: '#0055d4' },
          { order: 7, color: '#1a1a1a' }
        ]
      ],

      mdiArrowUp,
      mdiArrowDown,
      mdiPlus,
      mdiClose,
      mdiCircle
    }
  },

  watch: {
    value () {
      this.levels = this.value
    }
  },

  methods: {
    change () {
      this.$emit('input', this.levels)
    },

    suggest (suggestionIndex) {
      this.levels = this.suggestions[suggestionIndex]
      this.suggestModal = false
      this.change()
    },

    add () {
      this.levels.push({ order: this.levels.length, color: '#f2f2f2', name: 'Blanc' })
      this.change()
    },

    deleteLevel (index) {
      this.levels.splice(index, 1)
      this.reorder()
      this.change()
    },

    levelUp (index) {
      this.levels[index].order = this.levels[index].order - 1.5
      this.reorder()
      this.change()
    },

    levelDown (index) {
      this.levels[index].order = this.levels[index].order + 1.5
      this.reorder()
      this.change()
    },

    disableDown (index) {
      return index === this.levels.length - 1
    },

    disableUp (index) {
      return index === 0
    },

    reorder () {
      this.levels = this.levels.sort((a, b) => a.order - b.order)
      for (let i = 0; i < this.levels.length; i++) {
        this.levels[i].order = i
      }
    }
  }
}
</script>
