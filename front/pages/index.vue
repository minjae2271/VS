<template>
  <div class="main">
    <!-- {{mainBanner}} -->
    <main-carousel :mainBanner='mainBanner'></main-carousel>
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
    // store.dispatch('posts/loadTopPosts', {reset: true});
    return store.dispatch('home/loadMainBanner');
  },
  computed: {
    topPosts(){
      return this.$store.state.posts.topPosts;
    },
    mainBanner(){
      return this.$store.state.home.mainBanner;
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
