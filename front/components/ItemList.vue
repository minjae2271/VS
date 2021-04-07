<template>
  <div>
    <post-Card v-for="(post, i) in posts" :key="i" :post="post"/>
  </div>
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
