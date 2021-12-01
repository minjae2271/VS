<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
      style="position: relative"
      @submit.prevent="onSubmitForm"
    >
      <v-textarea
        v-model="content"
        filled
        auto-grow
        label="댓글 수정"
        :hide-details="hideDetails"
        :success="success"
        :success-messages="successMessages"
        @input="onChangeTextarea"
      />
      <v-btn absolute top right type="submit">수정</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      valid: false,
      content: this.comment.content,
      success: false,
      successMessages: '',
      hideDetails: true
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    }
  },
  methods: {
    onChangeTextarea(value) {
      if (value.length) {
        this.hideDetails = true;
        this.success = false;
        this.successMessages = '';
      }
    },
    async onSubmitForm() {
      try {
        if (this.$refs.form.validate()) {
          if (this.type === 'add') {
            await this.$store.dispatch('posts/addComment', {
              postId: this.postId,
              content: this.content
            });
          } else if (this.type === 'edit') {
            await this.$store.dispatch('posts/editComment', {
              postId: this.comment.PostId,
              commentId: this.comment.id,
              content: this.content
            });
            this.$emit('toggleEditForm');
          }
          this.content = '';
          this.success = true;
          this.successmessages = `댓글이 ${
            this.type === 'add' ? '작성' : '수정'
          }되었습니다.`;
          this.hideDetails = false;
        }
      } catch (err) {
        console.error(err);
      }
    },
    setContent() {
      if (this.type === 'add') return '';
      else {
        const index = this.$store.state.posts.mainPosts.findIndex(
          v => v.id === this.postId
        );
        const commentIndex = this.$store.state.posts.mainPosts[
          index
        ].Comments.findIndex(v => v.id === this.commentId);
        return this.$store.state.posts.mainPosts[index].Comments[commentIndex]
          .content;
      }
    }
  }
};
</script>

<style></style>
