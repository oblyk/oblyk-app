<template>
  <div>
    <p>
      {{ $t('components.markdown.explain.whatIsIt') }}
    </p>
    <p>
      {{ $t('components.markdown.explain.list') }}
    </p>

    <!-- Italic -->
    <p class="mb-1">
      <strong>{{ $t('components.markdown.explain.italic') }} :</strong>
    </p>
    <v-alert
      dense
      text
    >
      <v-icon x-small left>
        {{ mdiConsoleLine }}
      </v-icon>
      {{ $t('components.markdown.explain.neverTooMuch') }} <strong class="red--text">_</strong>(cf : {{ $t('components.markdown.explain.aBrute') }} )<strong class="red--text">_</strong><br>
      <v-divider class="mt-2 mb-2" />
      <v-icon x-small left>
        {{ mdiArrowRight }}
      </v-icon>
      {{ $t('components.markdown.explain.neverTooMuch') }} <cite>(cf: {{ $t('components.markdown.explain.aBrute') }})</cite>
    </v-alert>

    <!-- Bold -->
    <p class="mb-1">
      <strong>{{ $t('components.markdown.explain.bold') }} :</strong>
    </p>
    <v-alert
      dense
      text
    >
      <v-icon x-small left>
        {{ mdiConsoleLine }}
      </v-icon>
      {{ $t('components.markdown.explain.thisIs') }} <strong class="red--text">**</strong>{{ $t('components.markdown.explain.bold') }}<strong class="red--text">**</strong>, {{ $t('components.markdown.explain.butIsGood') }}<br>
      <v-divider class="mt-2 mb-2" />
      <v-icon x-small left>
        {{ mdiArrowRight }}
      </v-icon>
      {{ $t('components.markdown.explain.thisIs') }} <strong>{{ $t('components.markdown.explain.bold') }}</strong>, {{ $t('components.markdown.explain.butIsGood') }}
    </v-alert>

    <!-- Strikethrough text -->
    <p class="mb-1">
      <strong>{{ $t('components.markdown.explain.strikethroughText') }} :</strong>
    </p>
    <v-alert
      dense
      text
    >
      <v-icon x-small left>
        {{ mdiConsoleLine }}
      </v-icon>
      {{ $t('components.markdown.explain.thisIs') }} <strong class="red--text">~</strong>impossible<strong class="red--text">~</strong> {{ $t('components.markdown.explain.tooHard') }}<br>
      <v-divider class="mt-2 mb-2" />
      <v-icon x-small left>
        {{ mdiArrowRight }}
      </v-icon>
      {{ $t('components.markdown.explain.thisIs') }} <del>impossible</del> {{ $t('components.markdown.explain.tooHard') }}
    </v-alert>

    <!-- Link -->
    <p class="mb-1">
      <strong>{{ $t('components.markdown.explain.link') }} :</strong>
    </p>
    <v-alert
      dense
      text
    >
      <v-icon x-small left>
        {{ mdiConsoleLine }}
      </v-icon>
      <strong class="red--text">[</strong>Oblyk<strong class="red--text">]</strong><strong class="red--text">(</strong>https://oblyk.org<strong class="red--text">)</strong> {{ $t('components.markdown.explain.teachesMarkdown') }} !
      <v-divider class="mt-2 mb-2" />
      <v-icon x-small left>
        {{ mdiArrowRight }}
      </v-icon>
      <a href="https://oblyk.org">Oblyk</a> {{ $t('components.markdown.explain.teachesMarkdown') }} !
    </v-alert>

    <!-- Table -->
    <p class="mb-1">
      <strong>{{ $t('components.markdown.explain.table') }} :</strong>
    </p>
    <v-alert
      dense
      text
    >
      <pre>
| {{ $t('components.markdown.explain.this') }}        |   {{ $t('components.markdown.explain.is') }}    | {{ $t('components.markdown.explain.complicated') }} |
| :-------- | :--------: | --------: |
| {{ $t('components.markdown.explain.column') }}   |  {{ $t('components.markdown.explain.column') }}   |   {{ $t('components.markdown.explain.column') }} |
| {{ $t('components.markdown.explain.alignedTo') }} | {{ $t('components.markdown.explain.alignedIn') }} | {{ $t('components.markdown.explain.alignedTo') }} |
| {{ $t('components.markdown.explain.left') }}    |   {{ $t('components.markdown.explain.center') }}   |    {{ $t('components.markdown.explain.right') }} |
      </pre>
      <v-divider class="mt-2 mb-2" />
      <table class="table-full-width">
        <thead>
          <tr>
            <th class="text-left">
              {{ $t('components.markdown.explain.this') }}
            </th>
            <th class="text-center">
              {{ $t('components.markdown.explain.is') }}
            </th>
            <th class="text-right">
              {{ $t('components.markdown.explain.complicated') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ $t('components.markdown.explain.column') }}</td>
            <td class="text-center">
              {{ $t('components.markdown.explain.column') }}
            </td>
            <td class="text-right">
              {{ $t('components.markdown.explain.column') }}
            </td>
          </tr>
          <tr>
            <td>{{ $t('components.markdown.explain.alignedTo') }}</td>
            <td class="text-center">
              {{ $t('components.markdown.explain.alignedIn') }}
            </td>
            <td class="text-right">
              {{ $t('components.markdown.explain.alignedTo') }}
            </td>
          </tr>
          <tr>
            <td>{{ $t('components.markdown.explain.left') }}</td>
            <td class="text-center">
              {{ $t('components.markdown.explain.center') }}
            </td>
            <td class="text-right">
              {{ $t('components.markdown.explain.right') }}
            </td>
          </tr>
        </tbody>
      </table>
    </v-alert>
  </div>
</template>

<script>
import { mdiConsoleLine, mdiArrowRight } from '@mdi/js'

export default {
  name: 'MarkdownExplain',

  data () {
    return {
      mdiConsoleLine,
      mdiArrowRight
    }
  }
}
</script>

<style scoped>
.table-full-width {
  width: 100%;
}
</style>
