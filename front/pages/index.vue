<template>
  <div class="main">
    <!-- {{mainBanner}} -->
    <main-carousel :mainBanner='mainBanner'></main-carousel>
    <div id="top-posts">
      <h1>최다조회수</h1>
      <home-post :posts="topPosts"></home-post>
    </div>
    <div id="top-posts" class="mt-5">
      <h1>황금밸런스</h1>
      <item-list :posts="topPosts"></item-list>
    </div>
  </div>
</template>

<script>
import MainCarousel from '~/components/home/MainCarousel';
import HomePost from  '~/components/home/HomePost';
import ItemList from '~/components/ItemList';

export default {
  components: {
    MainCarousel,
    HomePost,
    ItemList
  },
  async fetch({store}){
    await store.dispatch('home/loadTopPosts');
    return await store.dispatch('home/loadMainBanner');
  },
  computed: {
    topPosts(){
      return this.$store.state.home.topPosts;
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
