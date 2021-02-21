<template>
  <div class="main">
    <main-carousel></main-carousel>
    <item-list />
    <item-list />
  </div>
</template>

<script>
import MainCarousel from "~/components/MainCarousel";
import ItemList from "~/components/ItemList";

export default {
  components: {
    MainCarousel,
    ItemList,
  },
  data() {
    return {};
  },
  mounted() {
    console.log(window.location.origin);
  }
};
</script>

<style scoped>
.main
{
    margin: 0;
    padding: 0;
}
</style>