<template>
  <v-list>
    <template v-if="post">
      <v-list-item v-for="c in post.Comments" :key="c.id">
        <comment-unit :post="post" :comment="c" />
      </v-list-item>
    </template>
    <template v-else>
      <v-list-item v-for="c in comments" :key="c.id">
        <comment-unit :post="null" :comment="c" />
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
      required: false
    },
    comments: {
      type: Array,
      required: false
    },
  },
  data() {
    return {};
  }
};
</script>

<style></style>
