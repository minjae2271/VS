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
  fetch({ store }) {
    return store.dispatch('posts/loadPosts');
  },
  components: {
    PostCard,
  },
  data() {
    return {};
  },
  computed: {
    mainPosts() {
      return this.$store.state.posts.mainPosts;
    },
  }
}
</script>

<style>

</style>