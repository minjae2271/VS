<template>
  <div class="main">
    <main-carousel></main-carousel>
    <p>{{topPosts}}</p>
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
  },
  fetch({store}){
    return store.dispatch('posts/loadTopPosts', {reset: true});
  },
  computed: {
    topPosts(){
      return this.$store.state.posts.topPosts;
    }
  }
};
</script>

<style scoped>
.main {
  margin: 0;
  padding: 0;
}
</style>
