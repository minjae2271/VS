<template>
  <div class="post-card-container">
    <div class="post-card-box grey lighten-5">
      <v-row class="post-card-row" no-gutters>
        <v-col
          class="post-card-col"
          v-for="(post, i) in mainPosts"
          :key="i"
          cols="12"
          sm="6"
          md="3"
        >
        <post-card elevation="4" :post="post" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import PostCard from '~/components/PostCard';

export default {
  components: {
    PostCard,
  },
  data() {
    return {};
  },
  async fetch({ store , params}) {
    return await store.dispatch('posts/loadPosts', { postTypeId: params.postType, reset: true });
  },

  computed: {
    mainPosts() {
      return this.$store.state.posts.mainPosts.filter(post => post != null);
    },
    hasMorePost() {
      return this.$store.state.posts.hasMorePost;
    },
  },
  methods: {
    onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (this.hasMorePost) {
          this.$store.dispatch('posts/loadPosts', { postTypeId: params.postType});
        }
      }
    },
  },                  
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  }
};
</script>

<style scoped>
.post-card-container
{

}
.post-card-row {
  display: flex;
  flex: 1 0 25%
  /* justify-content: center; */
}
.post-card-col {
  /* margin: 0 15px 20px 15px; */
  margin: 0 auto
}
</style>
