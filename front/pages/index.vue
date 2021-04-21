<template>
  <div class="main">
    <main-carousel></main-carousel>
    <!-- <item-list :posts="mainPosts"/> -->
    <v-spacer />
  </div>
</template>

<script>
import MainCarousel from '~/components/MainCarousel';
import ItemList from '~/components/ItemList';

export default {
  components: {
    MainCarousel,
    ItemList
  }
};
</script>

<style scoped>
.main {
  margin: 0;
  padding: 0;
}
</style>
