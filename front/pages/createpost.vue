<template>
<div>
  <post-form></post-form>
</div>
  
</template>

<script>
import PostForm from "~/components/PostForm";

export default {
  components: {
    PostForm
  },
  computed: {
    updatePost() {
      return this.$store.state.posts.updatePost;
    },
    //category(){}
  }
}
</script>

<style></style>
