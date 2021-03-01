<template>
  <v-container v-if="post">
    <post-card :post="post" />
    <comment-form />
    <v-container>
      <v-row>
        <v-col>
          <comments-list />
        </v-col>
        <v-col>
          <comments-list />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
  <div v-else>
    해당 아이디의 게시글이 존재하지 않습니다.
  </div>
</template>

<script>
// post/_id.vue
// post/1   post/2    post
import PostCard from "~/components/PostCard";
import CommentForm from "~/components/CommentForm";
import CommentsList from "~/components/CommentsList";

export default {
  components: {
    PostCard,
    CommentsList,
    CommentForm
  },
  computed: {
    post() {
      return this.$store.state.posts.mainPosts.find(
        v => v.id === parseInt(this.$route.params.id, 10)
      );
    }
  }
};
</script>

<style></style>
