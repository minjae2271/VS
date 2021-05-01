<template>
  <v-list>
    <template>
      <v-list-item v-for="c in comments" :key="c.id">
        <user-comment-unit :comment="c" />
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
import UserCommentUnit from '~/components/UserCommentUnit';
export default {
  components: {
    UserCommentUnit
  },
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>

<style></style>
