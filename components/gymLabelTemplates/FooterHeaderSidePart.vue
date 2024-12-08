<template>
  <div>
    <div
      v-if="type === 'QrCode'"
      v-html="qrCode"
    />
    <img
      v-if="type === 'logo'"
      alt="logo"
      class="logo"
      :style="`height: ${logoHeight}; width: ${logoHeight};`"
      :src="gym.logo_thumbnail_url"
    >
    <div
      v-if="type === 'logo_oblyk'"
      :style="`display: flex; flex-direction: column; justify-content: center; height: ${logoHeight}`"
    >
      <img
        alt="logo"
        style="width: 100%; height: 100%"
        src="/svg/logo-black.svg"
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'FooterHeaderSidePart',
  props: {
    type: {
      type: String,
      required: true
    },
    gym: {
      type: Object,
      required: true
    },
    qrCode: {
      type: String,
      default: null
    },
    logoHeight: {
      type: String,
      required: true
    }
  }
}
</script>
