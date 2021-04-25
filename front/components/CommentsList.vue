<template>
  <v-list>
    <template>
      <v-list-item v-for="c in post.Comments" :key="c.id">
        <comment-unit :post="post" :comment="c" />
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
import CommentUnit from '~/components/CommentUnit';
export default {
  components: {
    CommentUnit
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>

<style></style>
