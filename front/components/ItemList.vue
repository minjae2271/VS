<template>
    <v-row>
        <v-col
          class="post-card-col"
          v-for="(post, i) in posts"
          :key="i"
          cols="3"
        >
        <post-card elevation="4" :post="post" />
        </v-col>
    </v-row>
</template>

<script>
import PostCard from "~/components/PostCard";

export default {
  props: {
    posts: {
      type: Array,
      required: true,
    }
  },
  components: {
    PostCard,
  },
};
</script>

<style></style>
