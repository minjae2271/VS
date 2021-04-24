<template>
  <div>
    <v-row justify="center">
      <v-col>
        <!-- <v-chip-group
          v-model="selection"
          active-class="primary--text text--accent-4"
        > -->
          <v-chip
            v-for="(hashtag, i) in mainHashtags"
            :key="i"
            class="ma-2"
            large
            @click="onselectHashtag(hashtag.name)"
          >
            {{ hashtag.name }}
          </v-chip>
        <!-- </v-chip-group> -->
      </v-col>
    </v-row>
    <v-container class="post-card-box grey lighten-5">
      <v-row no-gutters>
        <v-col class="post-card" v-for="(post, i) in mainPosts" :key="i" sm="12" md="3">
            <post-card elevation="4" :post="post" />
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
    return {
      
    };
  },
  async fetch({ store }) {
    await store.dispatch('posts/loadPosts', { reset: true });
    return store.dispatch('posts/loadHashtags');
  },

  computed: {
    mainPosts() {
      return this.$store.state.posts.mainPosts.filter(post => post != null);
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
    },
    onselectHashtag(hashtag) {
      console.log(hashtag);
      // this.$store.dispatch('posts/searchPost', hashtag);
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

<style scoped>
.post-card
{
  margin:0 15px 20px 0;
}
</style>
