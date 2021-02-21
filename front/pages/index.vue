<template>
  <div class="main">
    <main-carousel></main-carousel>
    <item-list />
    <item-list />
    <v-spacer />
  </div>
</template>

<script>
import MainCarousel from "~/components/MainCarousel";
import ItemList from "~/components/ItemList";

export default {
  components: {
    MainCarousel,
    ItemList,
    Login
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.main {
  margin: 0;
  padding: 0;
}
</style>
