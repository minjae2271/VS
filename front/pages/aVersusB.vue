<template>
  <div>
    <div class="hashtags text-center">
      <v-chip v-for="(hashtag, i) in mainHashtags" :key="i" class="ma-2" large>
        {{ hashtag.name }}
      </v-chip>
    </div>
    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col v-for="(post, i) in mainPosts" :key="i" cols="12" sm="4">
          <post-card class="ma-3" elevation="4" :post="post"> </post-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PostCard from '~/components/PostCard';

export default {
  components: {
    PostCard
  },
  data() {
    return {};
  },
  async fetch({ store }) {
    await store.dispatch('posts/loadPosts');
    console.log('loadPosts');
    // const result1 = await store.dispatch('posts/loadHashtags');
  },

  computed: {
    mainPosts() {
      return this.$store.state.posts.mainPosts;
    },
    mainHashtags() {
      return this.$store.state.posts.mainHashtags;
    },
    hasMorePost() {
      return this.$store.state.posts.hasMorePost;
    }
  },
  methods: {
    onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (this.hasMorePost) {
          this.$store.dispatch('posts/loadPosts');
        }
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  }
};
</script>

<style></style>
