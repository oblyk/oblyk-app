<template>
  <v-menu>
    <template #activator="{ on, attrs }">
      <div
        class="rounded-pill pb-1 pt-2 px-1 font-weight-medium"
        v-bind="attrs"
        v-on="on"
      >
        {{ $t(`components.sprayWallRoute.sorts.${column}`) }}
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
          :class="column === 'opened_at' ? 'v-list-item--active' : null"
          @click="sorting('opened_at')"
        >
          <v-list-item-icon class="mr-1">
            <v-icon>
              {{ sortIcon.opened_at }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item>
            {{ $t('components.sprayWallRoute.sorts.opened_at') }}
          </v-list-item>
        </v-list-item>
        <v-list-item
          :class="column === 'difficulty' ? 'v-list-item--active' : null"
          @click="sorting('difficulty')"
        >
          <v-list-item-icon class="mr-1">
            <v-icon>
              {{ sortIcon.difficulty }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item>
            {{ $t('components.sprayWallRoute.sorts.difficulty') }}
          </v-list-item>
        </v-list-item>

        <v-list-item
          :class="column === 'ascents_count' ? 'v-list-item--active' : null"
          @click="sorting('ascents_count')"
        >
          <v-list-item-icon class="mr-1">
            <v-icon>
              {{ sortIcon.ascents_count }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item>
            {{ $t('components.sprayWallRoute.sorts.ascents_count') }}
          </v-list-item>
        </v-list-item>

        <v-list-item
          :class="column === 'likes_count' ? 'v-list-item--active' : null"
          @click="sorting('likes_count')"
        >
          <v-list-item-icon class="mr-1">
            <v-icon>
              {{ sortIcon.likes_count }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item>
            {{ $t('components.sprayWallRoute.sorts.likes_count') }}
          </v-list-item>
        </v-list-item>

        <v-list-item
          :class="column === 'comments_count' ? 'v-list-item--active' : null"
          @click="sorting('comments_count')"
        >
          <v-list-item-icon class="mr-1">
            <v-icon>
              {{ sortIcon.comments_count }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item>
            {{ $t('components.sprayWallRoute.sorts.comments_count') }}
          </v-list-item>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-menu>
</template>

<script>
import {
  mdiCalendar,
  mdiArrowDown,
  mdiArrowUp,
  mdiSortNumericAscending,
  mdiMenuDown,
  mdiCheckAll,
  mdiHeart,
  mdiComment
} from '@mdi/js'

export default {
  name: 'SprayWallRouteSort',
  props: {
    value: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      column: this.value.column,
      direction: this.value.direction,
      dismounted: false,

      sortIcon: {
        opened_at: mdiCalendar,
        difficulty: mdiSortNumericAscending,
        ascents_count: mdiCheckAll,
        likes_count: mdiHeart,
        comments_count: mdiComment
      },

      mdiArrowDown,
      mdiArrowUp,
      mdiMenuDown
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
      localStorage.setItem('spray_wall_route_sort_column', this.column)
      localStorage.setItem('spray_wall_route_sort_direction', this.direction)
      this.$emit('input', { column: this.column, direction: this.direction, dismounted: this.dismounted })
    },

    switchDirection () {
      this.direction = this.direction === 'asc' ? 'desc' : 'asc'
      this.$emit('input', { column: this.column, direction: this.direction, dismounted: this.dismounted })
    }
  }
}
</script>
