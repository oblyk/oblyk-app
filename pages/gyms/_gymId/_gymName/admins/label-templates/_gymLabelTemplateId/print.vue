<template>
  <div
    class="page"
    :class="preview ? 'preview' : ''"
  >
    <div class="label-row">
      <gym-label-route
        v-for="(gymRoute, gymRouteIndex) in gymRoutes"
        :key="`gym-route-index-${gymRouteIndex}`"
        class="label-column"
        :class="gymLabelTemplate.label_direction"
        :gym="gym"
        :gym-route="gymRoute"
        :gym-label-template="gymLabelTemplate"
      />
    </div>
    <div
      v-if="gymLabelTemplate && gymLabelTemplate.qr_code_position === 'footer'"
      class="footer"
    >
      <div>
        <p>
          Suis ta progression et découvre le topo<br>de <b>{{ gym.name }}</b> sur Oblyk.org !
        </p>
        <div v-if="reference">
          <small>
            {{ reference }}
          </small>
        </div>
      </div>
      <div
        class="footer-qr-code"
        v-html="footerQrcode"
      />
    </div>
    <div
      v-if="gymLabelTemplate && gymLabelTemplate.qr_code_position !== 'footer' && reference"
      class="footer-reference-only"
    >
      <small>
        {{ reference }}
      </small>
    </div>
  </div>
</template>

<script>
import GymLabelTemplateApi from '~/services/oblyk-api/GymLabelTemplateApi'
import GymLabelTemplate from '~/models/GymLabelTemplate'
import GymRoute from '~/models/GymRoute'
import GymLabelRoute from '~/components/gymLabelTemplates/GymLabelRoute'
import Gym from '~/models/Gym'

export default {
  components: { GymLabelRoute },
  meta: { orphanRoute: true },
  layout: 'print',

  data () {
    return {
      gymLabelTemplate: null,
      loadingLabelTemplate: true,
      footerQrcode: null,
      reference: 'Réference',
      sectorId: null,
      routeIds: null,
      previewRoutesSet: null,

      gymRoutes: [],
      gym: [],
      preview: false
    }
  },

  head () {
    const date = new Date()
    return {
      title: `Étiquette ${this.reference ? `- ${this.reference} ` : ''}- ${date.toISOString().split('T')[0]}`
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.preview = urlParams.get('preview') === 'true'
    this.reference = urlParams.get('reference')
    this.sectorId = urlParams.get('sector_id')
    this.routeIds = [...urlParams.getAll('route_ids[]')]
    this.previewRoutesSet = urlParams.get('preview_routes_set')

    this.getLabelTemplate()
  },

  methods: {
    getLabelTemplate () {
      this.loadingLabelTemplate = true
      const params = {}
      if (this.routeIds.length > 0) { params.route_ids = this.routeIds }
      if (this.sectorId) { params.sector_id = this.sectorId }
      if (this.previewRoutesSet) { params.preview_routes_set = this.previewRoutesSet }

      new GymLabelTemplateApi(this.$axios, this.$auth)
        .print(
          this.$route.params.gymId,
          this.$route.params.gymLabelTemplateId,
          params
        )
        .then((resp) => {
          this.gymLabelTemplate = new GymLabelTemplate({ attributes: resp.data.gym_label_template })
          this.gym = new Gym({ attributes: resp.data.gym })
          this.gymRoutes = []
          this.footerQrcode = resp.data.footer_qrcode
          for (const route of resp.data.gym_routes) {
            this.gymRoutes.push(new GymRoute({ attributes: route }))
          }
          this.initCss()
          if (!this.preview) {
            this.print()
          }
        })
        .finally(() => {
          this.loadingLabelTemplate = false
        })
    },

    initCss () {
      // Add font
      const newLink = document.createElement('link')
      newLink.href = `https://fonts.googleapis.com/css2?family=${this.gymLabelTemplate.font.query}`
      newLink.rel = 'stylesheet'
      document.head.appendChild(newLink)

      // Add style
      const newStyle = document.createElement('style')
      newStyle.textContent = `
      body {
        font-family: ${this.gymLabelTemplate.font.name};
        font-size: ${this.gymLabelTemplate.font.size};
        line-height: ${this.gymLabelTemplate.font.line_height};
      }
      .footer {
        border-top-width: ${this.gymLabelTemplate.border_style['border-width']};
        border-top-color: ${this.gymLabelTemplate.border_style['border-color']};
      }
      @page {
        size: ${this.gymLabelTemplate.page_format} ${this.gymLabelTemplate.page_direction};
        margin: ${this.gymLabelTemplate.layout_options['page-margin']};
      }`
      document.head.appendChild(newStyle)
    },

    print () {
      setTimeout(() => {
        window.print()
      }, 500)
    }
  }
}
</script>

<style lang="scss">
.preview {
  padding: 3mm;
}
.no-break {
  page-break-inside: avoid;
  &:before {
    clear: both;
  }
}
.label-row {
  display: flex;
  flex-wrap: wrap;
  row-gap: 3mm;
  column-gap: 3mm;
  .one_by_row {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .two_by_row {
    width: calc(1 / 2 * 100% - (1 - 1 / 2) * 3mm);
  }
  .three_by_row {
    width: calc(1 / 3 * 100% - (1 - 1 / 3) * 3mm);
  }
  .four_by_row {
    width: calc(1 / 4 * 100% - (1 - 1 / 4) * 3mm);
  }
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: right;
  border-top-style: solid;
  padding-top: 1.5mm;
  display: flex;
  flex-direction: row;
  justify-content: right;
  .footer-qr-code {
    height: 2.3cm;
    width: 2.3cm;
    padding-left: 5mm;
    svg {
      height: 100%;
      width: 100%;
    }
  }
}
.footer-reference-only {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: right;
}
</style>
