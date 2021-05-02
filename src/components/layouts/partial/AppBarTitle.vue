<template>
  <div class="global-app-title">
    <router-link
      :to="url"
      v-if="url"
    >
      <v-avatar
        :size="isMobile ? 32 : 48"
        v-if="avatar && showAvatar"
        :class="isMobile ? 'mr-1' : 'mr-3'"
      >
        <v-img
          :src="avatar"
          :alt="`avatar ${title}`"
        />
      </v-avatar>
      <span v-if="(showTitle && hasTitle) || showAvatar">
        {{ title }}
      </span>
    </router-link>

    <div v-else>
      <v-avatar
        :size="isMobile ? 32 : 48"
        v-if="avatar && showAvatar"
        :class="isMobile ? 'mr-1' : 'mr-3'"
      >
        <v-img
          :src="avatar"
          :alt="`avatar ${title}`"
        />
      </v-avatar>
      <span v-if="(showTitle && hasTitle) || showAvatar">
        {{ title }}
      </span>
    </div>
  </div>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import Word from '@/models/Word'
import Gym from '@/models/Gym'
import Crag from '@/models/Crag'
import Article from '@/models/Article'
import Area from '@/models/Area'
import GuideBookPaper from '@/models/GuideBookPaper'
import Newsletter from '@/models/Newsletter'

export default {
  name: 'AppBarTitle',
  mixins: [SessionConcern],

  data () {
    return {
      hasTitle: true,
      justTitle: true,
      objectName: null,
      objectId: null,
      showTitle: true,
      showAvatar: false,
      title: null,
      avatar: null,
      url: null,
      isMobile: false
    }
  },

  watch: {
    $route: function () {
      this.getRouteInformation()
    },

    title: function () {
      document.title = this.title || 'Oblyk'
    }
  },

  mounted () {
    this.getRouteInformation()
    this.onResize()

    window.addEventListener('resize', this.onResize, { passive: true })
  },

  methods: {
    onResize: function () {
      this.isMobile = window.innerWidth < 600
    },

    getRouteInformation: function () {
      this.hasTitle = !this.$route.meta.noPaddingTop
      this.justTitle = this.$route.meta.title
      this.showTitle = this.justTitle || this.$route.meta.showTitle
      this.showAvatar = this.$route.meta.showAvatar

      if (this.$route.meta.objectName) {
        const routeObjectName = this.$route.meta.objectName
        const routeObjectId = this.$route.params[`${routeObjectName}Id`]
        if (
          routeObjectId !== this.objectId ||
          routeObjectName !== this.objectName
        ) {
          this.objectId = routeObjectId
          this.objectName = routeObjectName
          this.getObject()
        }
      } else {
        this.url = null
        this.objectId = null
        this.objectName = null
        this.avatar = null
        this.getTitle()
      }
    },

    getTitle: function () {
      if (this.justTitle) {
        this.title = this.$t(`meta.${this.$route.meta.title}.title`)
      } else {
        this.title = null
      }
    },

    getObject: function () {
      if (this.objectName === 'word') {
        new Word().find(this.objectId).then(object => { this.title = object.name })
      } else if (this.objectName === 'gym') {
        new Gym().find(this.objectId).then(object => { this.title = object.name; this.avatar = object.logoUrl(); this.url = object.path() })
      } else if (this.objectName === 'crag') {
        new Crag().find(this.objectId).then(object => { this.title = object.name; this.url = object.path() })
      } else if (this.objectName === 'article') {
        new Article().find(this.objectId).then(object => { this.title = object.name; this.url = object.path() })
      } else if (this.objectName === 'newsletter') {
        new Newsletter().find(this.objectId).then(object => { this.title = object.name; this.url = object.path() })
      } else if (this.objectName === 'guideBookPaper') {
        new GuideBookPaper().find(this.objectId).then(object => { this.title = object.name; this.url = object.path() })
      } else if (this.objectName === 'area') {
        new Area().find(this.objectId).then(object => { this.title = object.name; this.url = object.path() })
      } else if (this.objectName === 'me') {
        this.getCurrentUser().then(user => { this.title = user.first_name; this.avatar = user.avatarUrl(); this.url = user.path() })
      }
      document.title = this.title || 'Oblyk'
    }
  }
}
</script>

<style lang="scss" scoped>
.global-app-title {
  a {
    color: inherit !important;
    text-decoration: none;
  }
}
</style>
