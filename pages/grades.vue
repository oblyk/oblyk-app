<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="mt-5">
        {{ $t('common.pages.grade.title') }}
      </h1>
      <p>
        {{ $t('common.pages.grade.intro') }}
      </p>
      <p>
        {{ $t('common.pages.grade.weighting') }}
      </p>
      <ul>
        <li><strong>+</strong> : {{ $t('common.pages.grade.list.strongGrade') }} <span class="text--disabled">({{ $t('common.example') }} : 6a+)</span></li>
        <li><strong>-</strong> : {{ $t('common.pages.grade.list.weakGrade') }} <span class="text--disabled">({{ $t('common.example') }} : 6a-)</span></li>
        <li><strong>/+</strong> : {{ $t('common.pages.grade.list.almostStrongGrade') }} <span class="text--disabled">({{ $t('common.example') }} : 6a/+)</span></li>
        <li><strong>/-</strong> : {{ $t('common.pages.grade.list.almostWeakGrade') }} <span class="text--disabled">({{ $t('common.example') }} : 6a/-)</span></li>
        <li><strong>?</strong> : {{ $t('common.pages.grade.list.gradeToConfirmed') }} <span class="text--disabled">({{ $t('common.example') }} : 8b?)</span></li>
        <li><strong>+/b</strong> : {{ $t('common.pages.grade.list.gradeBetweenAAndB') }} <span class="text--disabled">({{ $t('common.example') }} : 6a+/b)</span></li>
        <li><strong>+/c</strong> : {{ $t('common.pages.grade.list.gradeBetweenBAndC') }} <span class="text--disabled">({{ $t('common.example') }} : 6b+/c)</span></li>
      </ul>

      <v-simple-table
        class="mt-5 mb-5"
        fixed-header
        height="calc(100vh - 200px)"
      >
        <template #default>
          <thead>
            <tr>
              <th class="text-center">
                n°
              </th>
              <th>
                {{ $t('common.pages.grade.grade_names.fr') }}
              </th>
              <th>
                {{ $t('common.pages.grade.grade_names.en') }}
              </th>
              <th>
                {{ $t('common.pages.grade.grade_names.usa_r') }}
              </th>
              <th>
                {{ $t('common.pages.grade.grade_names.usa_b') }}
              </th>
              <th>
                {{ $t('common.pages.grade.grade_names.de_r') }}
              </th>
              <th>
                {{ $t('common.pages.grade.grade_names.pd') }}
              </th>
              <th>
                {{ $t('common.pages.grade.grade_names.mp') }}
              </th>
              <th>
                {{ $t('common.pages.grade.grade_names.trad') }}
              </th>
              <th>
                {{ $t('common.pages.grade.grade_names.rgb') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(grade, index) in grades"
              :key="index"
            >
              <td
                class="text-center"
                :style="`background-color: ${grade.rgb}`"
              >
                {{ grade.value }}
              </td>
              <td>{{ grade.fr }}</td>
              <td>{{ grade.en }}</td>
              <td>{{ grade.usa_r }}</td>
              <td>{{ grade.usa_b }}</td>
              <td>{{ grade.de_r }}</td>
              <td>{{ grade.pd }}</td>
              <td>{{ grade.mp }}</td>
              <td>{{ grade.trad }}</td>
              <td :style="`color: ${grade.rgb}`">
                {{ grade.rgb }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <p class="text-decoration-underline">
        {{ $t('common.pages.grade.developerBonus') }}
      </p>
      <p>
        {{ $t('common.pages.grade.regexpExplain') }}
      </p>
      <code>^((([1-9][abc]?)|(B[0-9]|B1[0-6])|(E[0-9]|E1[0-1])|(PD|AD|D|TD|ED|ABO)|([I]{1,3}|IV|V[III]{0,3}|IX|X[III]{0,3})|(M|D|VD|S|HS|VS|HVS)|(VB|V[0-9]|V1[0-9]|V20)|(A[0-6])|(5\.[0-9]|5\.1[0-5][abcd]))(\+|\-|\/\-|\/\+|\?|\+\/\?|\-\/\?|\+\/b|\+\/c)?|\?)$</code>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppFooter from '@/components/layouts/AppFooter'

export default {
  components: { AppFooter },

  data () {
    return {
      grades: [
        { value: 1, fr: '1a', en: 'M', usa_r: '5.1', usa_b: null, de_r: null, pd: null, mp: null, trad: null, rgb: 'rgb(255,85,220)' },
        { value: 2, fr: '1a+', en: null, usa_r: null, usa_b: null, de_r: null, pd: null, mp: null, trad: null, rgb: 'rgb(246,68,211)' },
        { value: 3, fr: '1b', en: null, usa_r: null, usa_b: null, de_r: null, pd: null, mp: null, trad: null, rgb: 'rgb(238,51,201)' },
        { value: 4, fr: '1b+', en: null, usa_r: null, usa_b: null, de_r: null, pd: null, mp: null, trad: null, rgb: 'rgb(229,34,190)' },
        { value: 5, fr: '1c', en: null, usa_r: null, usa_b: null, de_r: null, pd: null, mp: null, trad: null, rgb: 'rgb(221,17,180)' },
        { value: 6, fr: '1c+', en: null, usa_r: null, usa_b: null, de_r: null, pd: null, mp: null, trad: null, rgb: 'rgb(212,0,170)' },

        { value: 7, fr: '2a', en: null, usa_r: '5.2', usa_b: null, de_r: 'III-', pd: null, mp: null, trad: null, rgb: 'rgb(134,205,222)' },
        { value: 8, fr: '2a+', en: null, usa_r: null, usa_b: null, de_r: null, pd: null, mp: null, trad: null, rgb: 'rgb(119,198,218)' },
        { value: 9, fr: '2b', en: 'D', usa_r: '5.3', usa_b: null, de_r: 'III', pd: null, mp: null, trad: null, rgb: 'rgb(103,191,213)' },
        { value: 10, fr: '2b+', en: null, usa_r: null, usa_b: null, de_r: null, pd: null, mp: null, trad: null, rgb: 'rgb(87,184,209)' },
        { value: 11, fr: '2c', en: null, usa_r: null, usa_b: null, de_r: null, pd: null, mp: null, trad: null, rgb: 'rgb(71,178,204)' },
        { value: 12, fr: '2c+', en: null, usa_r: null, usa_b: null, de_r: null, pd: null, mp: null, trad: null, rgb: 'rgb(55,170,200)' },

        { value: 13, fr: '3a', en: null, usa_r: '5.4', usa_b: 'VB', de_r: 'III+', pd: 'B0', mp: 'PD', trad: null, rgb: 'rgb(255,221,84)' },
        { value: 14, fr: '3a+', en: null, usa_r: null, usa_b: 'V0-', de_r: null, pd: null, mp: null, trad: null, rgb: 'rgb(252,215,68)' },
        { value: 15, fr: '3b', en: null, usa_r: '5.5', usa_b: 'V0', de_r: 'IV-', pd: 'B1', mp: null, trad: null, rgb: 'rgb(249,208,51)' },
        { value: 16, fr: '3b+', en: null, usa_r: null, usa_b: null, de_r: null, pd: null, mp: null, trad: 'A0', rgb: 'rgb(246,202,34)' },
        { value: 17, fr: '3c', en: null, usa_r: null, usa_b: 'V0+', de_r: null, pd: 'B2', mp: null, trad: null, rgb: 'rgb(243,195,17)' },
        { value: 18, fr: '3c+', en: null, usa_r: null, usa_b: null, de_r: null, pd: null, mp: null, trad: null, rgb: 'rgb(240,189,0)' },

        { value: 19, fr: '4a', en: 'VD', usa_r: '5.6', usa_b: null, de_r: 'IV', pd: null, mp: 'AD-', trad: null, rgb: 'rgb(255,127,42)' },
        { value: 20, fr: '4a+', en: null, usa_r: null, usa_b: null, de_r: null, pd: null, mp: null, trad: null, rgb: 'rgb(246,119,34)' },
        { value: 21, fr: '4b', en: 'S', usa_r: '5.7', usa_b: 'V1', de_r: 'IV+', pd: null, mp: 'AD', trad: null, rgb: 'rgb(238,110,25)' },
        { value: 22, fr: '4b+', en: null, usa_r: null, usa_b: null, de_r: null, pd: null, mp: null, trad: 'A1', rgb: 'rgb(229,102,17)' },
        { value: 23, fr: '4c', en: 'HS', usa_r: null, usa_b: 'V2', de_r: 'V-', pd: 'B3', mp: 'AD+', trad: null, rgb: 'rgb(221,93,8)' },
        { value: 24, fr: '4c+', en: null, usa_r: null, usa_b: null, de_r: 'V', pd: null, mp: null, trad: null, rgb: 'rgb(212,85,0)' },

        { value: 25, fr: '5a', en: 'VS', usa_r: '5.8', usa_b: null, de_r: 'V+', pd: null, mp: 'D-', trad: null, rgb: 'rgb(170,212,0)' },
        { value: 26, fr: '5a+', en: null, usa_r: null, usa_b: null, de_r: null, pd: null, mp: null, trad: null, rgb: 'rgb(156,195,0)' },
        { value: 27, fr: '5b', en: 'HVS', usa_r: '5.9', usa_b: 'V3', de_r: 'VI-', pd: null, mp: 'D', trad: null, rgb: 'rgb(143,178,0)' },
        { value: 28, fr: '5b+', en: null, usa_r: null, usa_b: null, de_r: null, pd: null, mp: null, trad: 'A2', rgb: 'rgb(129,161,0)' },
        { value: 29, fr: '5c', en: null, usa_r: '5.10a', usa_b: null, de_r: 'VI', pd: null, mp: 'D+', trad: null, rgb: 'rgb(115,144,0)' },
        { value: 30, fr: '5c+', en: null, usa_r: null, usa_b: null, de_r: null, pd: null, mp: null, trad: null, rgb: 'rgb(102,128,0)' },

        { value: 31, fr: '6a', en: 'E1', usa_r: '5.10b', usa_b: null, de_r: 'VI+', pd: null, mp: 'TD-', trad: null, rgb: 'rgb(0,85,212)' },
        { value: 32, fr: '6a+', en: null, usa_r: '5.10c', usa_b: null, de_r: 'VII-', pd: 'B4', mp: null, trad: null, rgb: 'rgb(0,75,186)' },
        { value: 33, fr: '6b', en: 'E2', usa_r: '5.10d', usa_b: null, de_r: 'VII', pd: null, mp: 'TD', trad: 'A3', rgb: 'rgb(0,64,161)' },
        { value: 34, fr: '6b+', en: null, usa_r: '5.11a', usa_b: 'V4', de_r: 'VII+', pd: 'B5', mp: null, trad: null, rgb: 'rgb(0,55,136)' },
        { value: 35, fr: '6c', en: 'E3', usa_r: '5.11b', usa_b: null, de_r: 'VIII-', pd: null, mp: 'TD+', trad: null, rgb: 'rgb(0,44,110)' },
        { value: 36, fr: '6c+', en: null, usa_r: '5.11c', usa_b: 'V5', de_r: 'VIII', pd: 'B6', mp: null, trad: null, rgb: 'rgb(0,34,85)' },

        { value: 37, fr: '7a', en: 'E4', usa_r: '5.11d', usa_b: 'V6', de_r: 'VIII+', pd: 'B7', mp: 'ED-', trad: null, rgb: 'rgb(171,55,200)' },
        { value: 38, fr: '7a+', en: 'E5', usa_r: '5.12a', usa_b: 'V7', de_r: 'IX-', pd: 'B8', mp: null, trad: null, rgb: 'rgb(157,51,184)' },
        { value: 39, fr: '7b', en: null, usa_r: '5.12b', usa_b: null, de_r: null, pd: 'B9', mp: 'ED', trad: null, rgb: 'rgb(144,46,168)' },
        { value: 40, fr: '7b+', en: 'E6', usa_r: '5.12c', usa_b: 'V8', de_r: 'IX', pd: 'B10', mp: null, trad: 'A4', rgb: 'rgb(130,42,152)' },
        { value: 41, fr: '7c', en: null, usa_r: '5.12d', usa_b: 'V9', de_r: 'IX+', pd: 'B11', mp: 'ED+', trad: null, rgb: 'rgb(117,37,136)' },
        { value: 42, fr: '7c+', en: 'E7', usa_r: '5.13a', usa_b: 'V10', de_r: null, pd: 'B12', mp: null, trad: null, rgb: 'rgb(103,33,120)' },

        { value: 43, fr: '8a', en: null, usa_r: '5.13b', usa_b: 'V11', de_r: null, pd: 'B13', mp: 'ABO-', trad: null, rgb: 'rgb(255,59,59)' },
        { value: 44, fr: '8a+', en: 'E8', usa_r: '5.13c', usa_b: 'V12', de_r: 'X-', pd: 'B14', mp: null, trad: null, rgb: 'rgb(255,42,42)' },
        { value: 45, fr: '8b', en: 'E9', usa_r: '5.13d', usa_b: 'V13', de_r: 'X', pd: 'B15', mp: 'ABO', trad: null, rgb: 'rgb(221,25,25)' },
        { value: 46, fr: '8b+', en: 'E10', usa_r: '5.14a', usa_b: 'V14', de_r: 'X+', pd: 'B16', mp: null, trad: 'A5', rgb: 'rgb(204,17,17)' },
        { value: 47, fr: '8c', en: null, usa_r: '5.14b', usa_b: 'V15', de_r: null, pd: 'B17', mp: 'ABO+', trad: null, rgb: 'rgb(187,8,8)' },
        { value: 48, fr: '8c+', en: 'E11', usa_r: '5.14c', usa_b: 'V16', de_r: 'XI-', pd: 'B18', mp: null, trad: null, rgb: 'rgb(170,0,0)' },

        { value: 49, fr: '9a', en: null, usa_r: '5.14d', usa_b: null, de_r: 'XI', pd: 'B19', mp: null, trad: null, rgb: 'rgb(128,128,128)' },
        { value: 50, fr: '9a+', en: null, usa_r: '5.15a', usa_b: null, de_r: 'XI+', pd: 'B20', mp: null, trad: null, rgb: 'rgb(102,102,102)' },
        { value: 51, fr: '9b', en: null, usa_r: '5.15b', usa_b: null, de_r: 'XII-', pd: null, mp: null, trad: null, rgb: 'rgb(77,77,77)' },
        { value: 52, fr: '9b+', en: null, usa_r: '5.15c', usa_b: null, de_r: 'XII', pd: null, mp: null, trad: 'A6', rgb: 'rgb(51,51,51)' },
        { value: 53, fr: '9c', en: null, usa_r: '5.15d', usa_b: null, de_r: 'XII+', pd: null, mp: null, trad: null, rgb: 'rgb(25,25,25)' },
        { value: 54, fr: '9c+', en: null, usa_r: '5.16a', usa_b: null, de_r: null, pd: null, mp: null, trad: null, rgb: 'rgb(0,0,0)' }
      ]
    }
  },

  head () {
    return {
      title: this.$t('meta.grade.title'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('meta.grade.description') },
        { hid: 'og:title', property: 'og:title', content: this.$t('meta.grade.title') },
        { hid: 'og:description', property: 'og:description', content: this.$t('meta.grade.description') },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/img/images/oblyk-og-image.jpg` }
      ]
    }
  }
}
</script>
