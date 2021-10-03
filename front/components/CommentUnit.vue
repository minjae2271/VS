<template>
  <div class="comment-box">
    <!-- {{ comment }} -->
    <!-- <v-list-item-avatar color="teal">
      <span>{{ comment.User.nickname[0] }}</span>
    </v-list-item-avatar> -->
    <v-list-item-content>
      <v-list-item-title>{{ comment.User.nickname }}</v-list-item-title>
      <span>{{ contents[comment.commentType] }}</span>
      <v-list-item-subtitle
        ><pre>{{ comment.content }}</pre></v-list-item-subtitle
      >
    </v-list-item-content>
    <v-list-item-action>
      <div>
        <v-icon
          v-if="me != null && me.id === comment.User.id"
          @click="removeComment(post.id, comment.id)"
          >mdi-delete
        </v-icon>
        <v-icon
          v-if="me != null && me.id === comment.User.id"
          @click="toggleEditForm"
          >mdi-square-edit-outline</v-icon
        >
      </div>
    </v-list-item-action>
    <comment-form-update
      v-if="editForm"
      :comment="comment"
      :type="'edit'"
      @toggleEditForm="toggleEditForm"
    />
  </div>
</template>

<script>
import CommentFormUpdate from './CommentFormUpdate.vue';
export default {
  components: {
    CommentFormUpdate
  },
  props: {
    post: {
      type: Object,
      required: false
    },
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      contents: [this.post.content1, this.post.content2, this.post.content3],
      editForm: false
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    }
  },
  methods: {
    toggleEditForm() {
      this.editForm = !this.editForm;
    },
    async removeComment(postId, commentId) {
      await this.$store.dispatch('posts/removeComment', { postId, commentId });
    }
  }
};
</script>

<style scoped>
.comment-box{
  display: flex;
}
</style>
