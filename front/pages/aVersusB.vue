<template>
  <div>
    <div class="hashtags text-center">
            <v-chip
      class="ma-2"
      large
    >
    음식
    </v-chip>
        <v-chip
      class="ma-2"
      large
    >
    상황
    </v-chip>
        <v-chip
      class="ma-2"
      large
    >
    19금
    </v-chip>
        <v-chip
      class="ma-2"
      large
    >
    철학
    </v-chip>
    </div>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col
        v-for="(post, i) in mainPosts"
        :key="i"
        cols="12"
        sm="4"
      >
        <post-card
          class="ma-3"
          elevation="4"
          :post="post"
        >
        </post-card>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
import PostCard from "~/components/PostCard";

export default {
  components: {
    PostCard,
  },
  data() {
    return {};
  },
  async fetch({ store }) {
    const result = await store.dispatch('posts/loadPosts');
    return result;
  },
  computed: {
    mainPosts() {
      return this.$store.state.posts.mainPosts;
    },
    hasMorePost(){
        return this.$store.state.posts.hasMorePost;
    }
  }, 
  methods: {
      onScroll(){
          if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
              if(this.hasMorePost){
                  this.$store.dispatch('posts/loadPosts');
              }
          }
      }
  },
  mounted(){
      window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy(){
      window.removeEventListener('scroll', this.onScroll);
  }
}
</script>

<style>

</style>