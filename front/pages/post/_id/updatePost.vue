<template>
<div>
  <update-form :updatePost="updatePost"></update-form>
</div>
  
</template>

<script>
import updateForm from "~/components/updateForm";

export default {
  components: {
    updateForm
  },
  async fetch({ store, params }) {
    return await store.dispatch('posts/loadPost', params.id);
  },
  computed: {
    updatePost() {
      return this.$store.state.posts.updatePost;
    }
  }
}
</script>

<style></style>
