<template>
  <div>
    <v-list>
      <template>
        <v-list-item v-for="c in post.Comments" :key="c.id">
          <comment-unit :post="post" :comment="c" :page="page" />
        </v-list-item>
      </template>
    </v-list>
  </div>
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
    page: {
      type: Number,
      required: false
    },
    comments: {
      type: Array,
      required: false
    }
  },
  data() {
    return {};
  }
};
</script>

<style></style>
