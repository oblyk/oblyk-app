<template>
  <v-container>
    <v-sheet
      class="pa-10 mt-5 d-inline-block"
      rounded
    >
      <h1 class="mb-5">
        Oblyk est en maintenance !
      </h1>

      <p>
        Nous procédons à des changements pour améliorer Oblyk.<br>
        Revenez un peu plus tard 🙂
      </p>

      <p>
        À très vite, et bonne grimpe !<br>
        <cite>La team d'Oblyk</cite>
      </p>

      <div class="text-center mt-8 mb-2">
        <v-img
          contain
          style="width: 500px; max-width: calc(100vw - 100px)"
          src="/svg/maintenance.svg"
          alt="des grimpeurs et grimpeuse qui clean un bloc"
        />
      </div>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  layout: 'blank'
}
</script>
