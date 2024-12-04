<template>
  <div class="d-flex">
    <div class="flex-grow-1">
      <v-menu>
        <template #activator="{ on, attrs }">
          <div
            class="d-flex border rounded-pill py-1 pr-2 pl-3"
            v-bind="attrs"
            v-on="on"
          >
            <div>
              {{ dismounted ? $t(`components.gymRoute.sorts.opened_at_dismounted`) : $t(`components.gymRoute.sorts.${column}`) }}
            </div>
            <div class="ml-auto">
              <v-icon>
                {{ mdiMenuDown }}
              </v-icon>
            </div>
          </div>
        </template>
        <v-sheet class="rounded">
          <v-list>
            <v-list-item
              :class="column === 'opened_at' && !dismounted ? 'v-list-item--active' : null"
              @click="sorting('opened_at')"
            >
              <v-list-item-icon class="mr-1">
                <v-icon>
                  {{ sortIcon.opened_at }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item>
                {{ $t('components.gymRoute.sorts.opened_at') }}
              </v-list-item>
            </v-list-item>
            <v-list-item
              :class="column === 'sector' && !dismounted ? 'v-list-item--active' : null"
              @click="sorting('sector')"
            >
              <v-list-item-icon class="mr-1">
                <v-icon>
                  {{ sortIcon.sector }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item>
                {{ $t('components.gymRoute.sorts.sector') }}
              </v-list-item>
            </v-list-item>
            <v-list-item
              v-if="sortsAvailable.difficulty_by_level"
              :class="column === 'level' && !dismounted ? 'v-list-item--active' : null"
              @click="sorting('level')"
            >
              <v-list-item-icon class="mr-1">
                <v-icon>
                  {{ sortIcon.level }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item>
                {{ $t('components.gymRoute.sorts.level') }}
              </v-list-item>
            </v-list-item>
            <v-list-item
              v-if="sortsAvailable.difficulty_by_grade"
              :class="column === 'grade' && !dismounted ? 'v-list-item--active' : null"
              @click="sorting('grade')"
            >
              <v-list-item-icon class="mr-1">
                <v-icon>
                  {{ sortIcon.grade }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item>
                {{ $t('components.gymRoute.sorts.grade') }}
              </v-list-item>
            </v-list-item>

            <v-divider v-if="sortsAvailable.ascents_count || sortsAvailable.likes_count || sortsAvailable.comments_count" />

            <v-list-item
              v-if="sortsAvailable.ascents_count"
              :class="column === 'grade' && !dismounted ? 'v-list-item--active' : null"
              @click="sorting('ascents_count')"
            >
              <v-list-item-icon class="mr-1">
                <v-icon>
                  {{ sortIcon.ascents_count }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item>
                {{ $t('components.gymRoute.sorts.ascents_count') }}
              </v-list-item>
            </v-list-item>

            <v-list-item
              v-if="sortsAvailable.likes_count"
              :class="column === 'grade' && !dismounted ? 'v-list-item--active' : null"
              @click="sorting('likes_count')"
            >
              <v-list-item-icon class="mr-1">
                <v-icon>
                  {{ sortIcon.likes_count }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item>
                {{ $t('components.gymRoute.sorts.likes_count') }}
              </v-list-item>
            </v-list-item>

            <v-list-item
              v-if="sortsAvailable.comments_count"
              :class="column === 'grade' && !dismounted ? 'v-list-item--active' : null"
              @click="sorting('comments_count')"
            >
              <v-list-item-icon class="mr-1">
                <v-icon>
                  {{ sortIcon.comments_count }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item>
                {{ $t('components.gymRoute.sorts.comments_count') }}
              </v-list-item>
            </v-list-item>

            <v-divider />

            <v-list-item
              :class="column === 'opened_at' && dismounted ? 'v-list-item--active' : null"
              @click="sorting('opened_at', true)"
            >
              <v-list-item-icon class="mr-1">
                <v-icon>
                  {{ sortIcon.opened_at_dismounted }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item>
                {{ $t('components.gymRoute.sorts.opened_at_dismounted') }}
              </v-list-item>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-menu>
    </div>
    <v-btn
      outlined
      icon
      text
      class="ml-2"
      @click="switchDirection()"
    >
      <v-icon>
        {{ direction === 'asc' ? mdiArrowDown : mdiArrowUp }}
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import {
  mdiSortAscending,
  mdiCalendar,
  mdiArrowDown,
  mdiArrowUp,
  mdiTag,
  mdiTextureBox,
  mdiSortNumericAscending,
  mdiMenuDown,
  mdiEyeOff,
  mdiCheckAll,
  mdiHeart,
  mdiComment
} from '@mdi/js'

export default {
  name: 'GymSpaceRouteSort',
  props: {
    value: {
      type: Object,
      required: true
    },
    gym: {
      type: Object,
      default: null
    },
    gymSpace: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      column: this.value.column,
      direction: this.value.direction,
      dismounted: false,

      sortIcon: {
        sector: mdiTextureBox,
        opened_at: mdiCalendar,
        grade: mdiSortNumericAscending,
        level: mdiTag,
        opened_at_dismounted: mdiEyeOff,
        ascents_count: mdiCheckAll,
        likes_count: mdiHeart,
        comments_count: mdiComment
      },

      mdiSortAscending,
      mdiArrowDown,
      mdiArrowUp,
      mdiMenuDown
    }
  },

  computed: {
    sortsAvailable () {
      return this.gymSpace ? this.gymSpace.sorts_available : this.gym.sorts_available
    }
  },

  watch: {
    value: {
      handler () {
        this.column = this.value.column
        this.direction = this.value.direction
      },
      deep: true
    }
  },

  methods: {
    sorting (column, dismounted = false) {
      if (this.column === column) {
        this.direction = this.direction === 'asc' ? 'desc' : 'asc'
      } else {
        this.direction = column === 'sector' ? 'asc' : 'desc'
      }
      this.column = column
      this.dismounted = dismounted
      localStorage.setItem('gym_route_sort_column', this.column)
      localStorage.setItem('gym_route_sort_direction', this.direction)
      this.$emit('input', { column: this.column, direction: this.direction, dismounted: this.dismounted })
    },

    switchDirection () {
      this.direction = this.direction === 'asc' ? 'desc' : 'asc'
      this.$emit('input', { column: this.column, direction: this.direction, dismounted: this.dismounted })
    }
  }
}
</script>
