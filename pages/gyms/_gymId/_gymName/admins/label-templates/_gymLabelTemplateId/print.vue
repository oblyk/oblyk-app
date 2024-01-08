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
    <div
      class="print-modal"
      :class="orientationFormatDialog ? '--open' : '--close'"
    >
      <div class="dialog-card">
        <div>
          <p class="card-title">
            Orientation de la page :
          </p>
          <label :class="pageOrientation === 'portrait' ? '--active' : ''">
            <input v-model="pageOrientation" type="radio" value="portrait" />
            <span class="icon-orientation --portrait" />
            {{ $t('models.gymLabelTemplate.page_direction_list.portrait') }}
          </label>
          <label :class="pageOrientation === 'landscape' ? '--active' : ''">
            <input v-model="pageOrientation" type="radio" value="landscape" />
            <span class="icon-orientation --landscape" />
            {{ $t('models.gymLabelTemplate.page_direction_list.landscape') }}
          </label>
        </div>
        <div class="margin-top">
          <p class="card-title">
            Format de la page :
          </p>
          <label :class="pageFormat === 'A3' ? '--active' : ''">
            <input v-model="pageFormat" type="radio" value="A3" />
            {{ $t('models.gymLabelTemplate.page_format_list.A3') }}
          </label>
          <label :class="pageFormat === 'A4' ? '--active' : ''">
            <input v-model="pageFormat" type="radio" value="A4" />
            {{ $t('models.gymLabelTemplate.page_format_list.A4') }}
          </label>
          <label :class="pageFormat === 'A5' ? '--active' : ''">
            <input v-model="pageFormat" type="radio" value="A5" />
            {{ $t('models.gymLabelTemplate.page_format_list.A5') }}
          </label>
          <label :class="pageFormat === 'A6' ? '--active' : ''">
            <input v-model="pageFormat" type="radio" value="A6" />
            {{ $t('models.gymLabelTemplate.page_format_list.A6') }}
          </label>
        </div>
        <div class="card-actions">
          <button
            :disabled="pageFormat === null || pageOrientation === null"
            @click="closeDialogAndPrint()"
          >
            IMPRIMER
          </button>
        </div>
      </div>
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
      orientationFormatDialog: false,
      pageFormat: null,
      pageOrientation: null,

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
            if (this.gymLabelTemplate.page_direction === 'free' || this.gymLabelTemplate.page_format === 'free') {
              this.pageOrientation = this.gymLabelTemplate.page_direction !== 'free' ? this.gymLabelTemplate.page_direction : null
              this.pageFormat = this.gymLabelTemplate.page_format !== 'free' ? this.gymLabelTemplate.page_format : null
              this.orientationFormatDialog = true
            } else {
              this.pageOrientation = this.gymLabelTemplate.page_direction
              this.pageFormat = this.gymLabelTemplate.page_format
              this.initPageOrientation()
              this.print()
            }
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
        margin: ${this.gymLabelTemplate.layout_options['page-margin']};
      }`
      document.head.appendChild(newStyle)
    },

    initPageOrientation () {
      const newStyle = document.createElement('style')
      newStyle.textContent = `
      @page {
        size: ${this.pageFormat} ${this.pageOrientation};
      }
      `
      document.head.appendChild(newStyle)
    },

    closeDialogAndPrint () {
      this.orientationFormatDialog = false
      this.initPageOrientation()
      this.print()
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
.print-modal {
  font-family: sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  &.--close {
    display: none;
  }
  &.--open {
    display: flex;
    justify-content: center;
  }
  .dialog-card {
    align-self: center;
    background-color: white;
    border-radius: 15px;
    min-width: 400px;
    height: auto;
    max-height: calc(100% - 20px);
    padding: 15px;
    .margin-top {
      margin-top: 25px;
    }
    .card-title {
      font-weight: bold;
      margin-bottom: 15px;
    }
    label {
      border-style: solid;
      border-radius: 7px;
      border-width: 1px;
      margin-right: 10px;
      padding: 7px 15px;
      cursor: pointer;
      border-color: rgb(200, 200, 200);
      .icon-orientation {
        display: inline-block;
        border-style: solid;
        border-width: 3px;
        border-radius: 1px;
        margin-right: 7px;
        border-color: rgb(100, 100, 100);
        &.--portrait {
          vertical-align: sub;
          height: 18px;
          width: 14px;
        }
        &.--landscape {
          vertical-align: baseline;
          margin-bottom: -1px;
          height: 14px;
          width: 18px;
        }
      }
      input {
        display: none;
      }
      &.--active {
        background-color: #c5ecd0;
        border-color: #afd9bb;
      }
    }
    .card-actions {
      margin-top: 25px;
      text-align: center;
      button {
        padding: 7px 15px;
        border-radius: 5px;
        color: white;
        font-weight: 600;
        background-color: #31994e;
        &[disabled] {
          background-color: #cacaca;
        }
      }
    }
  }
}
</style>
