<template>
  <v-footer dark padless app absolute>
    <v-card
      flat
      tile
      class="grey darken-1 white--text text-center"
      width="100%"
    >
      <v-card-text>
        <!-- <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn> -->
      <v-spacer></v-spacer>
      {{ new Date().getFullYear() }} — <strong>Murpick</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>

<style>
</style>