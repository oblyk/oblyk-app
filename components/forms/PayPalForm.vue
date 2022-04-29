<template>
  <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" class="text-center">
    <input type="hidden" name="cmd" value="_s-xclick">
    <input type="hidden" name="hosted_button_id" value="Y5CMUM3UZ7TEQ">
    <input type="image" src="https://www.paypalobjects.com/fr_FR/FR/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal, le réflexe sécurité pour payer en ligne">
    <img alt="" border="0" src="https://www.paypalobjects.com/fr_FR/i/scr/pixel.gif" width="1" height="1">
  </form>
</template>

<script>
export default {
  name: 'PayPalForm'
}
</script>
