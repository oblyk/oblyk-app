<template>
  <v-menu>
    <template #activator="{ on, attrs }">
      <div
        class="rounded-pill pb-1 pt-2 px-1 font-weight-medium"
        v-bind="attrs"
        v-on="on"
      >
        {{ dismounted ? $t(`components.gymRoute.sorts.opened_at_dismounted`) : $t(`components.gymRoute.sorts.${column}`) }}
        <v-icon color="primary" class="ml-1 vertical-align-bottom">
          {{ mdiMenuDown }}
        </v-icon>
      </div>
    </template>
    <v-sheet class="rounded">
      <div class="px-2 pt-2">
        <v-chip
          small
          @click="switchDirection()"
        >
          <v-icon small left>
            {{ direction === 'asc' ? mdiArrowDown : mdiArrowUp }}
          </v-icon>
          {{ direction === 'asc' ? $t('common.ascSort') : $t('common.descSort') }}
        </v-chip>
      </div>
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
          :class="column === 'ascents_count' && !dismounted ? 'v-list-item--active' : null"
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
          :class="column === 'likes_count' && !dismounted ? 'v-list-item--active' : null"
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
          :class="column === 'comments_count' && !dismounted ? 'v-list-item--active' : null"
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
