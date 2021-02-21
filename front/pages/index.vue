<template>
  <div class="main">
    <main-carousel></main-carousel>
    <item-list />
    <item-list />
    <v-spacer />

    <login-test />
  </div>
</template>

<script>
import MainCarousel from "~/components/MainCarousel";
import ItemList from "~/components/ItemList";
import LoginTest from "~/components/LoginTest.vue";

export default {
  components: {
    MainCarousel,
    ItemList,
    LoginTest
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
