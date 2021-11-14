<template>
  <div>
    <v-card>{{ commentId }}</v-card>

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
        label="답글 달기"
        :hide-details="hideDetails"
        :success="success"
        :success-messages="successMessages"
        @input="onChangeTextarea"
      />
      <v-btn dark absolute top right type="submit">답글 등록</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  props: {
    postId: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      required: true
    },
    commentId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      valid: false,
      content: '',
      success: false,
      successMessages: '',
      hideDetails: true,
      type: 0
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
          await this.$store.dispatch('posts/addComment', {
            postId: this.postId,
            content: this.content,
            // group_id: Date().now + ,
            parent_id: this.commentId
          });
          this.content = '';
          this.success = true;
          this.successmessages = `댓글이 ${
            this.type === 'add' ? '작성' : '수정'
          }되었습니다.`;
          this.hideDetails = false;
        }
        await this.$store.dispatch('posts/loadComments', {
          postId: this.postId,
          page: this.page
        });
        await this.$store.dispatch('posts/countComments', {
          postId: this.postId
        });
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
